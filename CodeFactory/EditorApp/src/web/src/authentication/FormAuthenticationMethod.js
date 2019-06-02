import { getParam } from '../utils/Utils';
import React from 'react';
import { FormGroup, FormControl, ControlLabel, InputGroup, HelpBlock } from 'react-bootstrap';
import AuthenticationMethod from './AuthenticationMethod';

export default class FormAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("FormAuthenticationMethod", "Developer provided form (FORM)");
    }

    handleLoginFolder(e, dialog) {
        dialog.setState({loginFolder: e.target.value});
    }

    handleLoginPage(e, dialog) {
        dialog.setState({loginPage: e.target.value});
    }

    handleErrorFolder(e, dialog) {
        dialog.setState({errorFolder: e.target.value});
    }

    handleErrorPage(e, dialog) {
        dialog.setState({errorPage: e.target.value});
    }

    createDefaults(dialog) {
        super.createDefaults(dialog);
        const cleanName = getParam("name").toLowerCase().replace(/ /g, "-");
        let { loginFolder, errorFolder } = dialog.state;
        loginFolder = loginFolder || cleanName;
        errorFolder = errorFolder || cleanName;
        dialog.setState({loginFolder: loginFolder, errorFolder: errorFolder});
    }

    renderItems(dialog) {
        const { loginFolder, loginPage, errorFolder, errorPage } = dialog.state;
        const extension = "html";
        return <div>
            <FormGroup>
                <ControlLabel>Login page:</ControlLabel><br/>
                <InputGroup>
                    <FormControl type="text" value={loginFolder || ""} onChange={(e)=>this.handleLoginFolder(e, dialog)} />
                    <InputGroup.Addon>/</InputGroup.Addon>
                    <FormControl type="text" value={loginPage || ""} style={{width:300}} onChange={(e)=>this.handleLoginPage(e, dialog)} placeholder={"loginPage"} />
                    <InputGroup.Addon>.</InputGroup.Addon>
                    <FormControl type="text" value={extension} style={{width:60}} readOnly={true}/>
                </InputGroup>
                <HelpBlock>This page will be displayed when the user connects to the web site.</HelpBlock>
            </FormGroup>
            <FormGroup>
                <ControlLabel>Error page:</ControlLabel><br/>
                <InputGroup>
                    <FormControl type="text" value={errorFolder || ""} onChange={(e)=>this.handleErrorFolder(e, dialog)} />
                    <InputGroup.Addon>/</InputGroup.Addon>
                    <FormControl type="text" value={errorPage || ""} style={{width:300}} onChange={(e)=>this.handleErrorPage(e, dialog)} placeholder={"errorPage"} />
                    <InputGroup.Addon>.</InputGroup.Addon>
                    <FormControl type="text" value={extension} style={{width:60}} readOnly={true}/>
                </InputGroup>
                <HelpBlock>This page will be displayed when the user connection fails.</HelpBlock>
            </FormGroup>
            {super.renderItems(dialog)}
        </div>;
    }

    setStateFromValue(value, state) {
        let parts = this.extractParts(value.loginPage);
        state.loginFolder = parts.folder;
        state.loginPage = parts.page;
        parts = this.extractParts(value.errorPage);
        state.errorFolder = parts.folder;
        state.errorPage = parts.page;
    }

    extractParts(path) {
        if(!path)
            return { folder: null, page: null };
        else {
            let idx = path.indexOf('/');
            let folder = idx < 0 ? null : path.substring(0, idx);
            if (folder && !folder.length)
                folder = null;
            if (idx > 0)
                path = path.substring(idx + 1);
            idx = path.indexOf('.');
            let page = idx < 0 ? (path.length) : path.substring(0, idx);
            if (page && !page.length)
                page = null;
            if (idx > 0)
                path = path.substring(idx + 1);
            let extension = path;
            if (extension && !extension.length)
                extension = null;
            return {folder: folder, page: page, extension: extension};
        }
    }

    setValueFromState(state, value) {
        value.loginPage = state.loginFolder + "/" + state.loginPage + ".html";
        value.errorPage = state.errorFolder + "/" + state.errorPage + ".html";
    }

};
