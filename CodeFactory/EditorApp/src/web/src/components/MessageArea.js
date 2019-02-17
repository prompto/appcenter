import React from 'react';
import { Overlay } from 'react-bootstrap';

class MessageContent extends React.Component {

    render() {
        return <div id="message-content">{this.props.message}</div>;
    }

}


export default class MessageArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false, message: "<init>"};
        this.setMessage = this.setMessage.bind(this);
    }

    setMessage(message) {
        this.setState({show: true, message: message});
        setTimeout(()=>this.setState({show: false}), 2000);
    }

    render() {
        return <Overlay show={this.state.show}>
            <MessageContent message={this.state.message} />
        </Overlay>;
    }
}
