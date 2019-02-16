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

    setWorkers(workers) {
        this.workersView.setWorkers(workers);
    }

    workerSuspended(event) {
        this.workersView.workerSuspended(event, () => {
            this.debugger.fetchStack(event.workerId, stack => {
                this.workersView.setWorkerStack(event.workerId, stack);
            });
        });
    }


    render() {
        const activity = this.props.activity;
        const style = { display: activity===Activity.Debugging ? "block" : "none", height: "200px"};
        return <div className="debugger" style={style}>
            <div className="debugger-left">
                <WorkersView ref={ref=>this.workersView=ref} />
                <DebuggerControls ref={ref=>this.controlsView=ref} />
            </div>
            <div className="debugger-right">
                <VariablesView ref={ref=>this.variablesView=ref} />
            </div>
        </div>;
    }
}