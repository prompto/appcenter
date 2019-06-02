import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { ALL_AUTH_SOURCES } from './AuthenticationSources';

export default class AuthenticationMethod {

    constructor(typeName, label) {
        this.typeName = typeName;
        this.label = label;
        this.disabled = false;
    }

    createDefaults(dialog) {
        // nothing to do
    }

    renderItems(dialog) {
        return <div>
            <FormGroup>
                <ControlLabel>Select the login/password data source for this application:</ControlLabel><br/>
                <FormControl componentClass="select" defaultValue={dialog.state.source.typeName} onChange={dialog.handleSource}>
                    { ALL_AUTH_SOURCES.map(m=><option key={m.typeName} value={m.typeName}
                                                      disabled={m.disabled} >{m.label}</option>) }
                </FormControl>
                <HelpBlock>{dialog.state.source.help}</HelpBlock>
            </FormGroup>
            {  dialog.state.source.renderItems(dialog) }
        </div>
    }

    setValueFromState(state, value) {
        // nothing to do
    }

    setStateFromValue(value, state) {
        // nothing to do
    }

};