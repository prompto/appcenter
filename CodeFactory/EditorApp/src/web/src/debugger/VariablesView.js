import React from "react";

export default class VariablesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { variables: [] };
    }

    render() {
        return <div className="variables">
            <ul>
                { this.state.variables.map(v=><li key={v.name}>{v.name + " (" + v.text + ")"}</li>) }
            </ul>
        </div>;
    }
}