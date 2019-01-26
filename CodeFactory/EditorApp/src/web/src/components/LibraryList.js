import React from 'react';
import { ListGroup, Glyphicon } from 'react-bootstrap';


class Library extends React.Component {

    render() {
        const l = this.props.library;
        return <li className="list-group-item" style={{paddingTop: "15px"}}>
            <p>{l.label}<Glyphicon glyph="plus" onClick={()=>this.props.onAdd(l)}/></p>
        </li>
    }
}

export default class LibraryList extends React.Component {

    render() {
        return <ListGroup>
            { this.props.libraries.map(l => <Library key={l.label} library={l} onAdd={this.props.onAdd}/>) }
        </ListGroup>;
    }

}