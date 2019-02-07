import React from 'react';
import Debugger from './Debugger';
import Activity from "../utils/Activity";

export default class DebuggerView extends React.Component {

    constructor(props) {
        super(props);
        this.debugger = new Debugger();
    }

    render() {
        const activity = this.props.activity;
        const style = { display: activity===Activity.Debugging ? "block" : "none", height: "200px"};
        return <div id="stuff" className="debugger" style={style}>
            debugger
        </div>;
    }
}