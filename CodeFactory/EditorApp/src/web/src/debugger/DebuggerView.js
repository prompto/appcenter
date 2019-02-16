import React from 'react';
import Activity from "../utils/Activity";
import WorkersView from './WorkersView';
import DebuggerControls from './DebuggerControls';
import VariablesView from './VariablesView';

export default class DebuggerView extends React.Component {

    constructor(props) {
        super(props);
        this.debugger = null;
        this.workersView = null;
        this.controlsView = null;
        this.variablesView = null;
        this.state = { workers: [], worker: null, stackFrame: null };
        this.eventQueue = []; // events and request responses are not received in sequence, so need to rebuild sequence
    }

    setDebugger(dbg) {
        this.debugger = dbg;
    }

    getDebugger() {
        return this.debugger;
    }

    disconnect() {
        this.debugger.disconnect();
        this.debugger = null;
    }

    processEventQueue() {
        while(this.eventQueue.length) {
            const callback = this.eventQueue.shift();
            callback();
        }
    }

    setWorkers(workers) {
        this.setState({workers: workers}, this.processEventQueue);
    }

    workerSuspended(event) {
        if (this.state.workers.length > 0)
            this.doWorkerSuspended(event);
        else
            this.eventQueue.push(() => this.doWorkerSuspended(event));
    }

    doWorkerSuspended(event) {
        const workers = this.state.workers;
        const worker = workers.filter(w => w.workerId===event.workerId)[0];
        if(worker) {
            worker.state = event.reason;
            this.setState({ workers: workers }, () => {
                this.debugger.fetchStack(event.workerId, stack => {
                    this.setWorkerStack(event.workerId, stack, () => {
                        this.setStackFrame(event.workerId, 0, () => {
                            this.controlsView.refreshState();
                            this.variablesView.refreshState();
                            this.displaySuspendedCode();
                        });
                    });
                });
            });
        }
    }

    workerResumed(event) {
        const workers = this.state.workers;
        const worker = workers.filter(w => w.workerId === event.workerId)[0];
        if (worker) {
            worker.state = "RUNNING";
            worker.stack = null;
            this.setState({workers: workers}, () => {
                const callback = () => {
                    this.controlsView.refreshState();
                    this.variablesView.refreshState();
                    this.displayResumedCode();
                }
                if(worker===this.state.worker)
                    this.setState({worker: null, stackFrame: null}, callback);
                else
                    callback();
            });
        }
    }

    workerCompleted(event) {
        // TODO
    }

    displayResumedCode() {

    }

    displaySuspendedCode() {
        const stackFrame = this.state.stackFrame;
        if(stackFrame) {
            const promptoEditor = this.props.container.promptoEditor;
            const content = { type: "Prompto", subType: "method", name: stackFrame.methodName, proto: stackFrame.methodProto, core: true, main: true };
            promptoEditor.setContent(content, () => {
                promptoEditor.showStackFrame(stackFrame);
            });
        }
    }

    setWorkerStack(workerId, stack, callback) {
        if (this.state.workers.length > 0)
            this.doSetWorkerStack(workerId, stack, callback);
        else
            this.eventQueue.push(() => this.doSetWorkerStack(workerId, stack, callback));
    }


    doSetWorkerStack(workerId, stack, callback) {
        const workers = this.state.workers;
        const worker = workers.filter(w => w.workerId === workerId)[0];
        if (worker) {
            worker.stack = stack;
            this.setState({workers: workers}, callback);
        }
    }

    setStackFrame(workerId, index, callback) {
        const workers = this.state.workers;
        const worker = workers.filter(w => w.workerId === workerId)[0];
        if (worker && worker.stack && worker.stack.length > index) {
            this.setState({worker: worker, stackFrame: worker.stack[index]}, callback);
        }
    }


    render() {
        const activity = this.props.activity;
        const style = { display: activity===Activity.Debugging ? "block" : "none", height: "200px"};
        return <div className="debugger" style={style}>
            <div className="debugger-left">
                <WorkersView ref={ref=>this.workersView=ref} debuggerView={this}/>
                <DebuggerControls ref={ref=>this.controlsView=ref} debuggerView={this}/>
            </div>
            <div className="debugger-right">
                <VariablesView ref={ref=>this.variablesView=ref} debuggerView={this}/>
            </div>
        </div>;
    }
}