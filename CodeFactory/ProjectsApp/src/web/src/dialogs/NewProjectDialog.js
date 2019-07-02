import axios from 'axios';
import React from 'react';
import { ALL_PROJECT_TYPES, WEB_PROJECT_TYPES, CODE_PROJECT_TYPES } from '../project-types/ProjectTypes';
import { Modal, FormGroup, FormControl, ControlLabel, ToggleButtonGroup, Button, Thumbnail } from 'react-bootstrap';
import { ModalDialog, closeModal} from "../components/ModalDialog";

class NewModuleTypeButton extends React.Component {

    render() {
        let style = { width: "120px", height: "130px", boxSizing: "content-box", textAlign: "center",
            marginTop: "0px", marginLeft: "2px", marginRight: "2px", marginBottom: "10px", float: "left",
            borderStyle: "solid",  borderRadius: "10%", borderColor: "white", borderWidth: "medium"
        };
        if(this.props.active)
            style = { ...style, borderColor: "lightsteelblue" };
        const projectType = this.props.projectType;
        return <Thumbnail src={projectType.image} onClick={()=>this.props.onClick(projectType)} style={style}>
            <p><strong>{projectType.title}</strong></p>
        </Thumbnail>;
    }
}

export default class NewProjectDialog extends React.Component {

    constructor(props) {
        super(props);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleType = this.handleType.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.checkValidName = this.checkValidName.bind(this);
        this.state = { page: 1, type: ALL_PROJECT_TYPES[0], name:"", description: "", validName: false };
    }

    handleCreate() {
        const formData = new FormData();
        this.state.type.appendFormParameters(formData);
        let params = [
            {name: "name", type: "Text", value: this.state.name},
            {name: "description", type: "Text", value: this.state.description} ];
        params = this.state.type.appendPromptoParameters(params);
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/" + this.state.type.createMethod, formData).then(response=>{
            closeModal();
            this.props.moduleCreated();
        }).catch(error=>alert(error));
    }


    handleType(type) {
        if(type.disabled)
            alert("Sorry, not supported yet!");
        else
            this.setState( { type: type } );
    }

    handleName(e) {
        const name = e.currentTarget.value;
        this.setState( { name: name }, this.checkValidName );
    }

    handleDescription(e) {
        const description = e.currentTarget.value;
        this.setState( { description: description } );
    }

    checkValidName() {
        this.setState({validName: this.state.name.length > 0});
    }

    render() {
        return <ModalDialog bsSize="large" dialogClassName="new-project-dialog">
            <Modal.Header closeButton={true}>
                <Modal.Title>New project</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{padding: "8px"}}>
                { this.state.page===1 &&
                <form style={{margin: "8px"}}>
                    <FormGroup style={{marginBottom: "0px"}}>
                        <ControlLabel>Select type:</ControlLabel><br/>
                        <ToggleButtonGroup name={"project-type"}>
                            {WEB_PROJECT_TYPES.map(type=><NewModuleTypeButton key={type.id} id={"button" + type.id} projectType={type} onClick={this.handleType} active={type===this.state.type}/>)}
                        </ToggleButtonGroup><br/>
                        <ToggleButtonGroup name={"project-type"}>
                            {CODE_PROJECT_TYPES.map(type=><NewModuleTypeButton key={type.id} id={"button" + type.id} projectType={type} onClick={this.handleType} active={type===this.state.type}/>)}
                        </ToggleButtonGroup>
                    </FormGroup>
                </form>
                }
                {this.state.page === 2 &&
                <form style={{margin: "8px"}}>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel><br/>
                        <FormControl type="text" id="name" placeholder="Enter project name"
                                     onChange={this.handleName}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description</ControlLabel><br/>
                        <FormControl type="text" id="description" placeholder="Enter project description"
                                     onChange={this.handleDescription}/>
                    </FormGroup>
                    {this.state.type.renderParameters(this)}
                </form>
                }
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModal}>Cancel</Button>
                { this.state.page===1 && <Button id="btnNext" bsStyle="primary" onClick={()=>this.setState({page: 2})}>Next</Button> }
                { this.state.page===2 && <Button onClick={()=>this.setState({page: 1})}>Previous</Button> }
                { this.state.page===2 && <Button id="btnCreate" bsStyle="primary" disabled={!this.state.validName} onClick={this.handleCreate}>Create</Button> }
            </Modal.Footer>
        </ModalDialog>;
    }

}