import React from 'react';
import { ButtonGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const controlText = {
    RESUME: "Resume",
    SUSPEND: "Suspend",
    TERMINATE: "Terminate",
    STEP_OVER: "Step over",
    STEP_INTO: "Step into",
    STEP_OUT: "Step out"
};

const controlImage = {
    RESUME: "resume.png",
    SUSPEND: "suspend.png",
    TERMINATE: "terminate.png",
    STEP_OVER: "step-over.png",
    STEP_INTO: "step-into.png",
    STEP_OUT: "step-out.png"
};

const controlMethod = {
    RESUME: "resume",
    SUSPEND: "suspend",
    TERMINATE: "terminate",
    STEP_OVER: "stepOver",
    STEP_INTO: "stepInto",
    STEP_OUT: "stepOut"
};

class DebuggerControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = { enabled: true };
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        const worker = this.props.debuggerView.state.worker;
        const _debugger = this.props.debuggerView.getDebugger();
        const method = _debugger[controlMethod[this.props.id]];
        method.bind(_debugger)(worker.workerId);
    }

    render() {
        return <Button className="debugger-control" disabled={!this.state.enabled} onClick={this.onClick}>
                <OverlayTrigger overlay={this.renderTooltip()} trigger={["hover", "focus"]}>
                    <img src={'img/debug/' + controlImage[this.props.id] } alt=""/>
                </OverlayTrigger>
            </Button>;
    }

    renderTooltip() {
        return <Tooltip id="tooltip">{controlText[this.props.id]}</Tooltip>;
    }

    refreshState() {
        const worker = this.props.debuggerView.state.worker;
        const stackFrame = this.props.debuggerView.state.stackFrame;
        const method = this["refresh_" + this.props.id];
        method.bind(this)(worker, stackFrame);
    }

    refresh_RESUME(worker, stackFrame) {
        this.setState({enabled: worker && worker.state==="STEPPING"});
    }

    refresh_SUSPEND(worker, stackFrame) {
        this.setState({enabled: worker && worker.state!=="STEPPING"});
    }

    refresh_TERMINATE(worker, stackFrame) {
        this.setState({enabled: worker});
    }

    refresh_STEP_OVER(worker, stackFrame) {
        this.setState({enabled: !!stackFrame});
    }

    refresh_STEP_INTO(worker, stackFrame) {
        this.setState({enabled: !!stackFrame});
    }

    refresh_STEP_OUT(worker, stackFrame) {
        this.setState({enabled: !!stackFrame && worker.stack.length>1});
    }
}

const ALL_CONTROL_IDS = [ "RESUME", "SUSPEND", "TERMINATE", "STEP_OVER", "STEP_INTO", "STEP_OUT" ];

export default class DebuggerControls extends React.Component {

    refreshState() {
        ALL_CONTROL_IDS.forEach(id => this[id].refreshState());
    }
    
    
    render() {
        return <ButtonGroup className="debugger-controls">
            { ALL_CONTROL_IDS.map(id => <DebuggerControl key={id} ref={ref => this[id]=ref} id={id} debuggerView={this.props.debuggerView}/>, this) }
        </ButtonGroup>
    }
}