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
    const wrapper = document.createElement("div");
    container.appendChild(wrapper);
    ReactDOM.render(ReactDOM.createPortal(modal, wrapper), wrapper);
}

export class ModalDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = { show: true };
        this.close = this.close.bind(this);
        theModal = this;
    }

    render() {
        const props = { ...this.props, show: this.state.show, onHide: this.close };
        return React.createElement(Modal, props);
    }

    close() {
        this.setState({show: false}, modalClosed);
    }

}