import { identifierize } from '../utils';
import React from 'react';
import OptionalInput from '../components/OptionalInput';

export default class BatchParameters extends React.Component {

    constructor(props) {
        super(props);
        this.startMethodLabel = "Start method:";
        this.startMethodPrefix = "main_";
        this.handleCustomStart = this.handleCustomStart.bind(this);
        this.handleStartMethod = this.handleStartMethod.bind(this);
        this.state = { customStart: false, startMethod: ""}
    }

    handleCustomStart(custom) {
        this.setState( { customStart: custom } );
    }

    handleStartMethod(name) {
        this.setState( { startMethod: name } );
    }

    startMethod() {
        return this.state.customStart ? this.state.startMethod : this.startMethodPlaceHolder();
    }

    startMethodPlaceHolder() {
        return identifierize(this.startMethodPrefix, this.props.dialog.state.name)
    }


    render() {
        if(this.props.forRename)
            return null;
        else
            return <OptionalInput name="method" label={this.startMethodLabel} customize={this.state.customStart}
                                  placeHolder={this.startMethodPlaceHolder()} value={this.state.startMethod}
                                  handleCustom={this.handleCustomStart} handleName={this.handleStartMethod}/>;
    }

}


