import React from 'react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const controlText = {
    RESUME: "Resume",
    PAUSE: "Pause",
    STOP: "Stop",
    STEP_OVER: "Step over",
    STEP_INTO: "Step into",
    STEP_OUT: "Step out"
};

const controlImage = {
    RESUME: "resume.png",
    PAUSE: "pause.png",
    STOP: "stop.png",
    STEP_OVER: "step-over.png",
    STEP_INTO: "step-into.png",
    STEP_OUT: "step-out.png"
};


class DebuggerControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = { disabled: false };
    }

    render() {
       return <OverlayTrigger overlay={this.renderTooltip()} trigger={["hover", "focus"]}>
            <Button className="debugger-control" disabled={this.state.disabled}>
                <img src={'img/' + controlImage[this.props.id] } alt=""/>
            </Button>
        </OverlayTrigger>;
    }

    renderTooltip() {
        return <Tooltip id="tooltip">{controlText[this.props.id]}</Tooltip>;
    }
}

export default class DebuggerControls extends React.Component {

    render() {
        return <ButtonGroup className="debugger-controls">
            <DebuggerControl id="RESUME" />
            <DebuggerControl id="PAUSE" />
            <DebuggerControl id="STOP" />
            <DebuggerControl id="STEP_OVER" />
            <DebuggerControl id="STEP_INTO" />
            <DebuggerControl id="STEP_OUT" />
        </ButtonGroup>
    }
}