import { identifierize } from '../utils';
import React from 'react';
import { FormGroup, ControlLabel, FormControl, Radio } from 'react-bootstrap';
import ProjectType from './ProjectType';
import ServiceParameters from './ServiceParameters';
import DroppedFileWidget from '../components/DroppedFileWidget';
import WebSiteJpg from "../img/website.jpg";

const widgetStyle = {
    display: 'inline-flex',
    border: '1px solid lightgray',
    height: '160px',
    width: '160px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center'
};

class WebSiteParameters extends ServiceParameters {

    constructor(props) {
        super(props);
        this.handleDropIcon = this.handleDropIcon.bind(this);
        this.homePagePlaceHolder = this.homePagePlaceHolder.bind(this);
        this.image = this.props.forRename ? this.props.dialog.props.module.value.image : null;
        this.state = { ...this.state, iconFile: null, customHome: false, homePage: "" };
    }

    handleDropIcon(file) {
        this.setState( { iconFile: file } );
    }

    homePage() {
        return this.state.customHome ? this.state.homePage : this.homePagePlaceHolder();
    }

    homePagePlaceHolder() {
        return identifierize(null, this.props.dialog.state.name.toLowerCase()) + "/index.page";
    }

    render() {
        return <div>
            <FormGroup>
                <ControlLabel>Icon</ControlLabel><br/>
                <DroppedFileWidget onDrop={this.handleDropIcon} style={widgetStyle} image={this.image}/>
            </FormGroup>
            { super.render() }
            {!this.props.forRename && <FormGroup>
                <ControlLabel>Home page:</ControlLabel>
                <div style={{marginBottom: 5}}>
                    <Radio inline name="home-name-radio" checked={!this.state.customHome}
                           onChange={() => this.setState({customHome: false})}>Use default</Radio>
                    <Radio inline name="home-name-radio" checked={this.state.customHome}
                           onChange={() => this.setState({customHome: true})}>Customize</Radio>
                </div>
                <FormControl type="text" value={this.state.homePage}
                             placeholder={this.homePagePlaceHolder()}
                             onChange={e=>this.setState({homePage: e.currentTarget.value })}
                             readOnly={!this.state.customHome}/>
            </FormGroup>
            }
        </div>;
    }

}


export default class WebSiteType extends ProjectType {

    constructor() {
        super("WebSite", "Web site", WebSiteJpg, "createWebSite");
        this.renderParameters = this.renderParameters.bind(this);
        this.appendPromptoParameters = this.appendPromptoParameters.bind(this);
        this.appendFormParameters = this.appendFormParameters.bind(this);
    }

    renderParameters(dialog, forRename) {
        return <WebSiteParameters ref={ref=>this.params=ref} dialog={dialog} forRename={forRename || false}/>;
    }

    updateModule(module) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            module.value.image = { mimeType: state.iconFile.type, partName: partName };
        }
    }

    appendFormParameters(formData, forRename) {
        const state = this.params.state;
        if (state.iconFile) {
            const partName = "@" + state.iconFile.name;
            formData.append(partName, state.iconFile);
        }
    }

    appendPromptoParameters(list) {
        const state = this.params.state;
        let image = null;
        if(state.iconFile) {
            const partName = "@" + state.iconFile.name;
            image = { mimeType: state.iconFile.type, partName: partName };
        };
        const params = [
            {name: "image", type: "Image", value: image},
            {name: "serverAboutToStartMethod", type: "Text", value: this.params.startMethod()},
            {name: "homePage", type: "Text", value: this.params.homePage()}
        ];
        return list.concat(params);
    }
}
