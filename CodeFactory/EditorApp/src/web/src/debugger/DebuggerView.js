import React from 'react';
import Activity from "../utils/Activity";
import WorkersView from './WorkersView';
import VariablesView from './VariablesView';

export default class DebuggerView extends React.Component {

    constructor(props) {
        super(props);
        this.debugger = null;
        this.workersView = null;
        this.variablesView = null;
    }

    setDebugger(dbg) {
        this.debugger = dbg;
    }

    setWorkers(workers) {
        this.workersView.setWorkers(workers);
    }

    render() {
        const activity = this.props.activity;
        const style = { display: activity===Activity.Debugging ? "block" : "none", height: "200px"};
        return <div id="stuff" className="debugger" style={style}>
            <WorkersView ref={ref=>this.workersView=ref} />
            <VariablesView ref={ref=>this.variablesView=ref} />
        </div>;
    }
}