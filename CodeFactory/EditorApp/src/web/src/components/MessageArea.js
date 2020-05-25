import React from 'react';
import { Overlay } from 'react-bootstrap';

class MessageContent extends React.Component {

    render() {
        const style = {color: this.props.color};
        return <div id="message-content" style={style}>{this.props.message}</div>;
    }

}


export default class MessageArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {show: false, message: "<init>", error: false};
        this.setMessage = this.setMessage.bind(this);
    }

    setMessage(message, error) {
        this.setState({show: true, message: message, error: error});
        setTimeout(()=>this.setState({show: false}), 2000);
    }

    render() {
        return <Overlay show={this.state.show}>
            <MessageContent message={this.state.message} color={this.state.error ? "red" : "black"}/>
        </Overlay>;
    }
}
