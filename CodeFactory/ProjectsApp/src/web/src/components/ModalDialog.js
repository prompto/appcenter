import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

let theModal = null;

function modalClosed() {
    theModal = null;
    const container = document.getElementById("modal");
    while(container.children.length) {
        container.removeChild(container.children[0]);
    }
}

export function closeModal() {
    if(theModal)
        theModal.close();
}

export function displayModal(modal) {
    const container = document.getElementById("modal");
    const dialog = document.createElement("div");
    container.appendChild(dialog);
    ReactDOM.render(ReactDOM.createPortal(modal, dialog), container);
}

export default class ModalDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: true };
        this.close = this.close.bind(this);
        theModal = this;
    }

    render() {
        return <Modal show={this.state.show} onHide={this.close}>
            { this.props.children }
        </Modal>;
    }

    close() {
        this.setState({show: false}, modalClosed);
    }

}