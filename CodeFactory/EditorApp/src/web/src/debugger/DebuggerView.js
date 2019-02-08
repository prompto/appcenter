import React from 'react';
import Activity from "../utils/Activity";
import ThreadsView from './ThreadsView';
import VariablesView from './VariablesView';

export default class DebuggerView extends React.Component {

    constructor(props) {
        super(props);
        this.debugger = null;
        this.threadsView = null;
        this.variablesView = null;
    }

    setDebugger(_debugger) {
        this.debugger = _debugger;
        this.debugger.setDebuggerView(this);
    }

    setThreads(threads) {
        this.threadsView.setThreads(threads);
    }

    render() {
        const activity = this.props.activity;
        const style = { display: activity===Activity.Debugging ? "block" : "none", height: "200px"};
        return <div id="stuff" className="debugger" style={style}>
            <ThreadsView ref={ref=>this.threadsView=ref} />
            <VariablesView ref={ref=>this.variablesView=ref} />
        </div>;
    }
}