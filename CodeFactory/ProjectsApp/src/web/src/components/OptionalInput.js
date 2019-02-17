import React from 'react';
import { FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';

export default class OptionalInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleCustom = this.handleCustom.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    handleCustom(create) {
        this.props.handleCustom(create);
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.props.handleName(name);
    }


    render() {
        return <FormGroup>
            <ControlLabel>{this.props.label}</ControlLabel>
            <div style={{marginBottom: 5}}>
                <Radio inline name={this.props.name + "-radio"} checked={!this.props.customize} onChange={()=>this.handleCustom(false)}>Use default</Radio>
                <Radio inline name={this.props.name + "-radio"} checked={this.props.customize} onChange={()=>this.handleCustom(true)}>Customize</Radio>
            </div>
            <FormControl type="text" placeholder={this.props.placeHolder} readOnly={!this.props.customize} onChange={this.handleName} value={this.props.value || ""}/>
        </FormGroup>;
    }

}