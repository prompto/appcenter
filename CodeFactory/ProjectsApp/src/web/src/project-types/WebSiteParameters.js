import WebServiceParameters from "./WebServiceParameters";
import {identifierize} from "../utils";
import {ControlLabel, FormControl, FormGroup, Radio} from "react-bootstrap";
import DroppedFileWidget from "../components/DroppedFileWidget";
import React from "react";

const widgetStyle = {
    display: 'inline-flex',
    border: '1px solid lightgray',
    height: '160px',
    width: '160px',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center'
};

export default class WebSiteParameters extends WebServiceParameters {

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
