import React from "react";
import {Glyphicon, Table} from "react-bootstrap";

class ScalarComponent extends React.Component {

    render() {
        return this.props.value.valueString || this.props.value.value;
    }
}


class AnyComponent extends ScalarComponent {

    render() {
        return null;
    }
}


class NullComponent extends ScalarComponent {

    render() {
        return "null";
    }
}

class CollectionComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expanded: false, items: null };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        if(this.state.expanded)
            this.setState({expanded: false});
        else
            this.fetchItems(()=>this.setState({expanded: true}));
    }

    fetchItems(callback) {
        if(this.props.value.value)
            this.setState({items: this.readItems(this.props.value.value)}, callback);
        else if(this.props.fetchVariable)
            this.props.fetchVariable(variable=>{
                const items = this.readItems(variable.value.valueData.value);
                this.setState({items: items}, callback);
            });
    }


    render() {
        const glyph = this.state.expanded ? "triangle-bottom" : "triangle-right";
        return <Table size="sm">
            <tbody>
                <tr className="variable-row">
                    <td className="variable-expand"><Glyphicon glyph={glyph} onClick={this.toggle}/></td>
                    <td className="variable-value">{this.renderTopItem()}</td>
                </tr>
            { this.state.expanded && this.renderValueItems() }
            </tbody>
        </Table>;
    }

    renderTopItem() {
        return this.props.value.valueString;
    }

    renderValueItems() {
        let idx = 0;
        return <React.Fragment>
            {
                this.state.items.map(v => <VariableRow key={idx++} variable={v}/>, this)
            }
        </React.Fragment>;
    }


}

class ListComponent extends CollectionComponent {

    renderTopItem() {
        if(this.state.expanded)
            return "count: " + this.state.items.length;
        else
            return this.props.value.valueString;
    }

    readItems(items) {
        const entryTypeName = this.props.typeName.substring(0, this.props.typeName.length - 2); // trim []
        let idx = 1;
        return items.map(value => {
            const entry = { name: "[" + idx + "]", typeName: entryTypeName, value: items[idx-1]};
            idx = idx + 1;
            return entry;
        }, this);
    }

}


class TupleComponent extends CollectionComponent {

    renderTopItem() {
        if(this.state.expanded)
            return "count: " + this.state.items.length;
        else
            return this.props.value.valueString;
    }

    readItems(items) {
        let idx = 1;
        return items.map(value => {
            const entry = { name: "[" + idx + "]", typeName: "Any", value: items[idx-1]};
            idx = idx + 1;
            return entry;
        }, this);
    }

}

class SetComponent extends CollectionComponent {

    renderTopItem() {
        if(this.state.expanded)
            return "count: " + this.state.items.length;
        else
            return this.props.value.valueString;
    }

    readItems(items) {
        const entryTypeName = this.props.typeName.substring(0, this.props.typeName.length - 2); // trim <>
        let idx = 0;
        return items.map(value => { return { name: "", typeName: entryTypeName, value: items[idx++]}; }, this);
    }


}

class DictionaryComponent extends CollectionComponent {

    renderTopItem() {
        if(this.state.expanded)
            return "entries: " + this.state.items.length;
        else
            return this.props.value.valueString;
    }

    readItems(items) {
        const entryTypeName = this.props.typeName.substring(0, this.props.typeName.length - 3); // trim <:>
        return Object.getOwnPropertyNames(items).map(name => { return { name: name, typeName: entryTypeName, value: items[name]}; }, this);
    }

}

class DocumentComponent extends CollectionComponent {

    renderTopItem() {
        if(this.state.expanded)
            return "entries: " + this.state.items.length;
        else
            return this.props.value.valueString;
    }

    readItems(items) {
        return Object.getOwnPropertyNames(items).map(name => { return { name: name, typeName: "Any", value: items[name]}; }, this);
    }

}

class CategoryComponent extends CollectionComponent {

    renderTopItem() {
        if(this.state.expanded)
            return "attributes: " + this.state.items.length;
        else
            return this.props.value.valueString;
    }

    readItems(items) {
        return Object.getOwnPropertyNames(items).map(name => { return { name: name, typeName: "Any", value: items[name]}; }, this);
    }

}


function renderType(typeName, value) {
    // display most accurate type
    return value && value.typeName && value.typeName!=="Null" ? value.typeName : typeName;
}

const SCALAR_TYPES = new Set(["Boolean", "Integer", "Decimal", "Character", "Text", "Date", "Time", "DateTime", "Period", "Uuid", "Version"]);
const SPECIAL_TYPES = {
    any: AnyComponent,
    Any: AnyComponent,
    Null: NullComponent,
    Tuple: TupleComponent,
    Document: DocumentComponent
};

function componentForTypeName(typeName, value) {
    const actualType = renderType(typeName, value);
    if(actualType.endsWith("[]"))
        return ListComponent;
    else if(actualType.endsWith("()"))
        return TupleComponent;
    else if(actualType.endsWith("<>"))
        return SetComponent;
    else if(actualType.endsWith("<:>"))
        return DictionaryComponent;
    else if(SPECIAL_TYPES[actualType])
        return SPECIAL_TYPES[actualType];
    else if(SCALAR_TYPES.has(actualType))
        return ScalarComponent;
    else
        return CategoryComponent;
}


function renderValue(typeName, value, fetchVariable) {
    const component = componentForTypeName(typeName, value);
    return React.createElement(component, {typeName: typeName, value: value, fetchVariable: fetchVariable});
}


class VariableRow extends React.Component {

    render() {
        const variable = this.props.variable;
        const key = "v-" + variable.name;
        return <tr key={key} className="variable-row">
            <td className="variable-expand"/>
            <td className="variable-name">{variable.name}</td>
            <td className="variable-type">{renderType(variable.typeName, variable.value)}</td>
            <td className="variable-value">{renderValue(variable.typeName, variable.value, this.props.fetchVariable)}</td>
        </tr>;
    }
}


export default class VariablesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { stackFrame: null, variables: [] };
    }

    refreshState() {
        const worker = this.props.debuggerView.state.worker;
        const stackFrame = this.props.debuggerView.state.stackFrame;
        if(worker && stackFrame && stackFrame!==this.state.stackFrame)
            this.props.debuggerView.debugger.fetchVariables(worker.workerId, stackFrame, variables => this.setState({stackFrame: stackFrame, variables: variables}));
        else
            this.setState({stackFrame: null, variables: []});
    }

    fetchVariable(name, callback) {
        const worker = this.props.debuggerView.state.worker;
        const stackFrame = this.props.debuggerView.state.stackFrame;
        this.props.debuggerView.debugger.fetchVariable(worker.workerId, stackFrame, name, callback);
    }

    render() {
        return <div className="variables">
            <Table size="sm">
                <thead>
                    <tr>
                        <th style={{width: "10px"}}/>
                        <th style={{width: "40px"}}>Variables</th>
                        <th style={{width: "40px"}}/>
                        <th/>
                    </tr>
                </thead>
                <tbody>
                    { this.state.variables.map(v => <VariableRow key={v.name} variable={v} fetchVariable={callback=>this.fetchVariable(v.name, callback)}/>, this) }
                    { this.renderNoVariable() }
                    { this.renderNoStackFrame() }
                </tbody>
            </Table>
        </div>;
    }

    renderNoVariable() {
        if(this.state.stackFrame && this.state.variables.length===0) {
            return <tr className="variable-row">
                    <td/>
                    <td className="variable-name"><i>No variable</i></td>
                    <td/>
                    <td/>
                </tr>;
        }
    }

    renderNoStackFrame() {
        if(!this.state.stackFrame) {
            return <tr className="variable-row">
                    <td/>
                    <td className="variable-name"><i>Worker is running</i></td>
                    <td/>
                    <td/>
                </tr>;
        }
    }
}