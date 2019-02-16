import React from 'react';

export default class WorkersView extends React.Component {

    constructor(props) {
        super(props);
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
                <ul>
                    { this.state.workers.map(this.renderWorker, this) }
                </ul>
               </div>;
    }

    renderWorker(worker) {
        if(worker.state==="STEPPING" && worker.stack && worker.stack.length>0) {
            let idx = 0;
            return <li key={worker.workerId}>{worker.name + " (" + worker.state + ")"}
                <ul>
                    { worker.stack.map(s => <li key={idx++}>{s.methodName}</li>, this) }
                </ul>
            </li>;
        } else
            return <li key={worker.workerId}>{worker.name + " (" + worker.state + ")"}</li>;
    }
}