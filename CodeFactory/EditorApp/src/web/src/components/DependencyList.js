import React from 'react';
import { ListGroup, Glyphicon } from 'react-bootstrap';

class Dependency extends React.Component {

    render() {
        const d = this.props.dependency;
        return <li className="list-group-item" style={{paddingTop: "15px"}}>
            <p>{d.label}<Glyphicon glyph="trash" onClick={()=>this.props.onDelete(d)}/></p>
        </li>
    }
}

export default class DependencyList extends React.Component {

    render() {
        return <ListGroup>
            { this.props.dependencies.map(d => <Dependency key={d.label} dependency={d} onDelete={this.props.onDelete}/>) }
        </ListGroup>;
    }

}