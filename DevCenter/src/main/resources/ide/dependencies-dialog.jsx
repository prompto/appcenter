const { Modal, Button, ListGroup, ListGroupItem, Glyphicon, ControlLabel } = ReactBootstrap;


class Dependency extends React.Component {

    render() {
        const d = this.props.dependency;
        return <li className="list-group-item" style={{paddingTop: "15px"}}>
            <p>{d.label}<Glyphicon glyph="trash" onClick={()=>this.props.onDelete(d)}/></p>
        </li>
    }
}


class DependencyList extends React.Component {

    render() {
        return <ListGroup>
            { this.props.dependencies.map(d => <Dependency key={d.label} dependency={d} onDelete={this.props.onDelete}/>) }
        </ListGroup>;
    }

}


class Library extends React.Component {

    render() {
        const l = this.props.library;
        return <li className="list-group-item" style={{paddingTop: "15px"}}>
            <p>{l.label}<Glyphicon glyph="plus" onClick={()=>this.props.onAdd(l)}/></p>
        </li>
    }
}

class LibraryList extends React.Component {

    render() {
        return <ListGroup>
            { this.props.libraries.map(l => <Library key={l.label} library={l} onAdd={this.props.onAdd}/>) }
        </ListGroup>;
    }

}

class DependenciesDialog extends React.Component {

    constructor(props) {
        super(props);
        this.project = this.props.root.project.value;
        this.allLibraries = [];
        const deps = this.project.dependencies.value.map(d => { return { instance: d.value, label: d.value.name + " - " + d.value.version.value }; } )
        this.state = {show: true, dependencies: deps, libraries: []};
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.librariesReceived = this.librariesReceived.bind(this);
        this.filterLibraries = this.filterLibraries.bind(this);
        this.saveDependencies = this.saveDependencies.bind(this);
    }

    componentDidMount() {
        const params = { params: JSON.stringify([]) };
        axios.get('/ws/run/getAllLibraries',  { params: params }).then(resp => {
            this.librariesReceived(resp.data);
            this.filterLibraries();
        });

    }

    librariesReceived(response) {
        this.allLibraries = response.data.value.map(l => { return { instance: l.value, label: l.value.name + " - " + l.value.version.value }; });
    }


    filterLibraries() {
        const libraries = this.allLibraries.filter(lib => this.state.dependencies.findIndex(dep => dep.label===lib.label)<0);
        this.setState({libraries: libraries});
    }


    handleClose() {
        this.setState({show: false});
        this.props.onClose();
    }

    handleSave() {
        // load latest full description before updating
        const dbId = this.props.root.project.value.dbId.value.toString();
        const params = {
            params: JSON.stringify([{name: "dbId", value: dbId}, {
                name: "register",
                type: "Boolean",
                value: false
            }])
        };
        axios.get('/ws/run/getModuleDescription', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.saveDependencies(response.data);
        });

    }

    saveDependencies(project) {
        const dependencies = this.state.dependencies.map(dep=>{ return {type: "Dependency", value: dep.instance }});
        project.value.dependencies.value = dependencies;
        const formData = new FormData();
        const params = [ {name: "module", type: project.type, value: project.value} ];
        formData.append("params", JSON.stringify(params));
        axios.post("/ws/run/storeModule", formData).
        then(response=>{
            this.props.root.loadDescription();
            this.handleClose()
        }).catch(error=>alert(error));
    }

    handleAdd(library) {
        const dependency = { instance: { name: library.instance.name, version: library.instance.version }, label: library.label };
        const deps = this.state.dependencies;
        deps.push(dependency);
        this.setState({dependencies: deps}, this.filterLibraries);
    }


    handleDelete(dependency) {
        const deps = this.state.dependencies;
        const index = deps.findIndex(dep=>dep.label===dependency.label);
        deps.splice(index, 1);
        this.setState({dependencies: deps}, this.filterLibraries);
    }

    render() {
        return <Modal show={this.state.show} onHide={this.handleClose} >
            <Modal.Header closeButton={true}>
                <Modal.Title>Module dependencies</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { this.state.dependencies.length==0 && <ControlLabel>No dependency</ControlLabel> }
                { this.state.dependencies.length>0 &&
                    <div>
                        <ControlLabel>Current dependencies:</ControlLabel>
                        <DependencyList dependencies={this.state.dependencies} onDelete={this.handleDelete}/>
                    </div>
                }
                { this.state.libraries.length==0 && <ControlLabel>No available library</ControlLabel> }
                { this.state.libraries.length>0 &&
                    <div>
                        <ControlLabel>Available libraries:</ControlLabel>
                        <LibraryList libraries={this.state.libraries} onAdd={this.handleAdd}/>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>;
    }

}
