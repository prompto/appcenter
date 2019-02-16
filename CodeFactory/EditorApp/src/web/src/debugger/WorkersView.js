import React from 'react';
import { Table, Glyphicon } from 'react-bootstrap';


class StackRow extends React.Component {

    render() {
        const stack = this.props.stack;
        return <tr className="stack-row"><td/><td>{stack.methodName}</td><td/></tr>;

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
                { this.state.expanded && worker.stack.map(stack => <StackRow key={key + "-s-" + idx++} stack={stack} />, this) }
            </React.Fragment>;
        } else
            return this.renderWorker();
    }

    renderWorker() {
        const worker = this.props.worker;
        const expand_glyph = this.state.expanded ? "triangle-bottom" : "triangle-right";
        const state_glyph = worker.state==="STEPPING" ? "pause" : "play";
        return <tr className="worker-row">
            <td>{ worker.state==="STEPPING" && <Glyphicon glyph={expand_glyph} onClick={()=>this.setState({expanded: !this.state.expanded})}/> }</td>
            <td>{worker.name}</td>
            <td><Glyphicon glyph={state_glyph} /></td>
        </tr>

    }
}


export default class WorkersView extends React.Component {

    constructor(props) {
        super(props);
        // this.state = { workers: [ { workerId: 1, state: "STEPPING", name: "main", stack: [ { methodName: "start_test"}, { methodName: "other" } ] } ] };
        this.state = { workers: [] };
        this.eventQueue = [];
    }

    setWorkers(workers) {
        this.setState({workers: workers}, this.processEvents);
    }

    processEvents() {
        while(this.eventQueue.length) {
            const callback = this.eventQueue.shift();
            callback();
        }
    }

    workerSuspended(event, callback) {
        if (this.state.workers.length > 0)
            this.doWorkerSuspended(event, callback);
        else
            this.eventQueue.push(() => this.doWorkerSuspended(event, callback));
    }

    doWorkerSuspended(event, callback) {
        const workers = this.state.workers;
        const worker = workers.filter(w => w.workerId===event.workerId)[0];
        if(worker) {
            worker.state = event.reason;
            this.setState({ workers: workers }, callback);
        }
    }

    setWorkerStack(workerId, stack) {
        if (this.state.workers.length > 0)
            this.doSetWorkerStack(workerId, stack);
        else
            this.eventQueue.push(() => this.doSetWorkerStack(workerId, stack));
    }


    doSetWorkerStack(workerId, stack) {
        const workers = this.state.workers;
        const worker = workers.filter(w => w.workerId === workerId)[0];
        if (worker) {
            worker.stack = stack;
            this.setState({workers: workers});
        }
    }

    render() {
        return <div className="workers">
                <Table size="sm">
                    <thead>
                        <tr><th key="h1" width="10px"/><th key="h2">Workers</th><th key="h3" width="10px"/></tr>
                    </thead>
                    <tbody>
                    { this.state.workers.map(w => <WorkerRow key={w.workerId} worker={w} />, this) }
                    </tbody>
                </Table>
               </div>;
    }

}