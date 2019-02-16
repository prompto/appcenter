import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';


class StackFrameRow extends React.Component {

    render() {
        const stackFrame = this.props.stackFrame;
        const className = "stack-frame-row" + (stackFrame===this.props.debuggerView.state.stackFrame ? " active" : "");
        return <tr className={className}><td/><td>{stackFrame.methodName}</td><td/></tr>;

    }
}

class WorkerRow  extends React.Component {

    constructor(props) {
        super(props);
        this.state = { expanded: true };
    }

    render() {
        const worker = this.props.worker;
        const key = "w-" + worker.workerId;
        if(worker.state==="STEPPING" && worker.stack && worker.stack.length>0) {
            let idx = 0;
            return <React.Fragment key={key + "-fragment"}>
                { this.renderWorker() }
                { this.state.expanded && worker.stack.map(frame => <StackFrameRow key={key + "-s-" + idx++} stackFrame={frame} debuggerView={this.props.debuggerView}/>, this) }
            </React.Fragment>;
        } else
            return this.renderWorker();
    }

    renderWorker() {
        const worker = this.props.worker;
        const expand_glyph = this.state.expanded ? "triangle-bottom" : "triangle-right";
        const state_glyph = worker.state==="STEPPING" ? "pause" : "refresh";
        return <tr className="worker-row">
            <td>{ worker.state==="STEPPING" && <Glyphicon glyph={expand_glyph} onClick={()=>this.setState({expanded: !this.state.expanded})}/> }</td>
            <td>{worker.name}</td>
            <td><Glyphicon glyph={state_glyph} /></td>
        </tr>

    }
}


export default class WorkersView extends React.Component {

    render() {
        const state = this.props.debuggerView.state;
        return <div className="workers">
                <Table size="sm">
                    <thead>
                        <tr><th key="h1" width="10px"/><th key="h2">Workers</th><th key="h3" width="10px"/></tr>
                    </thead>
                    <tbody>
                    { state.workers.map(w => <WorkerRow key={w.workerId} worker={w} debuggerView={this.props.debuggerView}/>, this) }
                    </tbody>
                </Table>
               </div>;
    }

}