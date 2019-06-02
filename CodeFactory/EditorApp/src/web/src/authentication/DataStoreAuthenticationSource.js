import React from 'react';
import { FormGroup, FormControl, ControlLabel, Checkbox, HelpBlock } from 'react-bootstrap';
import AuthenticationSource from './AuthenticationSource';

export default class DataStoreAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("DataStoreAuthenticationSource", "Data store", "Login and password are checked against an encrypted Prompto data store.");
        this.handleUseTestSourceInDev = this.handleUseTestSourceInDev.bind(this);
        this.handleStoreName = this.handleStoreName.bind(this);
    }

    handleUseTestSourceInDev(e, dialog) {
        dialog.setState({useTestSourceInDev: e.currentTarget.checked});
    }

    handleStoreName(e, dialog) {
        dialog.setState({storeName: e.target.value});
    }

    renderItems(dialog) {
        const storeName = dialog.state.storeName || ""; // must not be null otherwise React sees it as uncontrolled
        return <div><FormGroup>
            <ControlLabel>Data store name:</ControlLabel><br/>
            <FormControl type="text" value={storeName} onChange={(e)=>this.handleStoreName(e, dialog)} />
            <HelpBlock>You can create a login/password data store using the 'Data Stores' application.</HelpBlock>
        </FormGroup>
            {!dialog.state.skipAuthInDev &&
            <FormGroup>
                <Checkbox inline checked={dialog.state.useTestSourceInDev} onChange={(e) => this.handleUseTestSourceInDev(e, dialog)}>Use
                    'Password is login' for development</Checkbox>
            </FormGroup>
            }
        </div>;
    }

    setStateFromValue(value, state) {
        state.storeName = value.storeName;
    }

    setValueFromState(state, value) {
        value.storeName = state.storeName;
    }


}