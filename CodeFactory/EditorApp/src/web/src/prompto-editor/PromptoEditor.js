import React from 'react';
import AceEditor from 'react-ace';

/*eslint-disable no-alert, no-console */
import 'brace/theme/eclipse';
import 'brace/mode/text';
import PromptoMode from "./PromptoMode";
import Activity from "../utils/Activity";
import {Breakpoints, LineBreakpoint} from "../debugger/Breakpoints";
import axios from "axios";

const EditSession = window.ace.EditSession;
EditSession.prototype.clearGutterDecorations = function() {
    this.$decorations = [];
    this._signal("changeBreakpoint",{});
};

export default class PromptoEditor extends React.Component {

    constructor(props) {
        super(props);
        this.content = null;
        this.getSession = this.getSession.bind(this);
        this.setContent = this.setContent.bind(this);
        this.codeEdited = this.codeEdited.bind(this);
        this.commitAndReset = this.commitAndReset.bind(this);
        this.toggleBreakpoint = this.toggleBreakpoint.bind(this);
        this.adjustBreakpoints = this.adjustBreakpoints.bind(this);
        this.breakpoints = null;
        this.state = {value: "", readOnly: false, display: true, debugMode: null};
    }


    getEditor() {
        return this.refs.AceEditor.editor;
    }


    getSession() {
        return this.getEditor().getSession();
    }

    componentDidMount() {
        const session = this.getSession();
        session.setMode(new PromptoMode(this));
        session.setUseWorker(true);
        session.getDocument().on("change", this.adjustBreakpoints);
        const editor = this.getEditor();
        editor.commands.addCommand({
            name: "commit",
            bindKey: { win: "Ctrl-S", mac: "Command-S" },
            exec: this.commitAndReset
        });
        editor.on("guttermousedown", this.toggleBreakpoint);
    }

    locateSection(breakpoint, callback) {
        this.getSession().getMode().locateSection(breakpoint, callback);
    }


    loadBreakpoints() {
        const params = {params: JSON.stringify([{name: "dbId", value: this.projectId}])};
        axios.get('/ws/run/fetchModuleBreakpoints', {params: params}).then(resp => {
            const response = resp.data;
            if (response.error)
                alert(response.error);
            else
                this.breakpointsLoaded(response.data);
        });

    }

    breakpointsLoaded(data) {
        this.breakpoints = new Breakpoints(data);
        this.props.breakpointsUpdated(this.breakpoints);
    }

    saveBreakpoints() {
        const edited = this.breakpoints.toStorable(this.projectId);
        if(!edited || !edited.length)
            return;
        const formData = new FormData();
        formData.append("params", JSON.stringify([{name: "edited", type: "EditedBreakpoint[]", value: edited}]));
        axios.post('/ws/run/storeBreakpoints', formData)
            .then(response=>this.loadBreakpoints()) // read dbIds
            .catch(error=>this.commitFailed(error));
    }

    toggleBreakpoint(click) {
        if(!this.content)
            return;
        const editor = this.getEditor();
        if (!editor.isFocused())
            return;
        const target = click.domEvent.target;
        if (target.className.indexOf("ace_gutter-cell") === -1)
            return;
        if (click.clientX > 25 + target.getBoundingClientRect().left)
            return;
        const session = this.getSession();
        const row = click.getDocumentPosition().row;
        const breakpoints = session.getBreakpoints();
        const hasBreakPoint = !!breakpoints[row];
        if(hasBreakPoint)
            this.clearBreakpoint(row);
        else
            this.setBreakpoint(row);
        click.stop();
    }

    setBreakpoint(row) {
        this.getSession().setBreakpoint(row);
        this.lineBreakpointUpdated(row, true, true);
    }

    clearBreakpoint(row) {
        this.getSession().clearBreakpoint(row);
        this.lineBreakpointUpdated(row, true, false);
    }

    adjustBreakpoints(delta) {
        // no edit allowed in debug mode, so no change can affect existing breakpoints
        if(this.props.activity===Activity.Debugging)
            return;
        if (delta.end.row === delta.start.row)
            return;
        const breakpoints = this.getSession().getBreakpoints();
        if(breakpoints.filter(a => !!a).length===0) // breakpoints has holes, length is irrelevant
            return;
        switch(delta.action) {
            case "insert":
                this.adjustBreakpointsOnInsert(delta, breakpoints.slice());
                break
            case "remove":
                this.adjustBreakpointsOnRemove(delta, breakpoints.slice());
                break
            default:
                console.log(delta.action + " not handled!");
        }
    }

    adjustBreakpointsOnInsert(delta, breakpoints) {
        const inserted = delta.end.row - delta.start.row;
        for(let key of breakpoints.keys()) {
            if(!breakpoints[key])
                continue;
            if(key <= delta.start.row)
                continue;
            this.clearBreakpoint(key);
            this.setBreakpoint(key + inserted);
        }
    }

    adjustBreakpointsOnRemove(delta, breakpoints) {
        const removed = delta.end.row - delta.start.row;
        for(let key of breakpoints.keys()) {
            if(!breakpoints[key])
                continue;
            if(key < delta.start.row)
                continue;
            this.clearBreakpoint(key);
            if(key <= delta.end.row)
                continue;
            this.setBreakpoint(key - removed);
        }
    }

    lineBreakpointUpdated(row, active, set) {
        const content = this.content;
        const breakpoint = new LineBreakpoint(content.subType, content.name, content.proto, row + 1, active); // ace rows start at 0, antlr lines start at 1
        this.breakpoints.register(breakpoint, set);
        this.props.breakpointsUpdated(this.breakpoints);
        if(this.props.activity===Activity.Debugging) {
            this.locateSection(breakpoint, section => {
                if (section) {
                    section.breakpoint = active && set;
                    this.props.root.getDebugger().installBreakpoint(section);
                } else
                    alert("Could not locate section!");
            });
        }
    }

    debuggerConnected(dbg) {
        this.breakpoints.living().forEach(b => {
            this.locateSection(b, section => {
                if (section) {
                    section.breakpoint = true; // for now
                    dbg.installBreakpoint(section);
                } else
                    alert("Could not locate section!");
            });
        }, this);
    }

    setDialect(dialect) {
        this.getSession().getMode().setDialect(dialect);
    }


    commitAndReset() {
        this.props.commitAndReset();
        return true;
    }

    setProject(dbId, loadDependencies) {
        this.projectId = dbId;
        this.getSession().getMode().setProject(dbId, loadDependencies);
        this.loadBreakpoints();
    }

    setDebugMode(mode, callback) {
        this.setState({debugMode: mode}, callback);
    }

    stopDebugging() {
        this.setState({debugMode: null});
        this.getSession().clearGutterDecorations();
        this.getEditor().setReadOnly(this.state.readOnly);
    }

    setContent(content, callback) {
        if(!this.updateContent(content, callback))
            return;
        const display = content && content.type.toLowerCase()==="prompto";
        const readOnly = content && content.core;
        this.setState({display: display, readOnly: readOnly}, () => {
            if(display) {
                this.getEditor().setReadOnly(this.props.activity===Activity.Debugging  || readOnly);
                const session = this.getSession();
                session.clearGutterDecorations(); // debugger-line
                session.clearBreakpoints();
                session.getMode().setContent(content, changed => {
                    if(changed)
                        session.setScrollTop(0);
                    this.breakpoints.matchingContent(content).forEach(b => {
                        session.setBreakpoint(b.line - 1);
                    });
                    if(callback)
                        callback();
                });
            } else if(callback)
                callback();
        });
   }

   updateContent(content, callback) {
       if(this.sameContent(content)) {
           if(callback)
               callback();
           return false;
       }
       this.content = content; // no state needed
       return true;
   }


   sameContent(content) {
        if(content===this.content)
            return true;
       if(!content || !this.content || typeof(content) !== typeof(this.content))
           return false;
       return Object.getOwnPropertyNames(content).every(name => content[name]===this.content[name]);
   }

   showStackFrame(stackFrame) {
        const session = this.getSession();
        session.getMode().locateContent(stackFrame, content => {
            this.setContent(content, () => {
                let line = stackFrame.statementLine;
                if(!stackFrame.categoryName || !stackFrame.categoryName.length)
                    line += 1 - stackFrame.methodLine;
                this.getEditor().gotoLine(line, 0, true);
                session.clearGutterDecorations();
                session.addGutterDecoration(line - 1, "debugger-line");
            });
        });
    }

    runTestOrMethod(content, runMode, callback) {
        this.getSession().getMode().runTestOrMethod(content, runMode, callback);
    }

    fetchRunnablePage(content, andThen) {
        this.getSession().getMode().fetchRunnablePage(content, andThen);
    }

    codeEdited(newValue) {
        this.setState({value: newValue});
    }

    catalogUpdated(catalog) {
        this.props.catalogUpdated(catalog);
    }

    contentUpdated(catalog) {
        this.props.contentUpdated(catalog);
    }


    destroy(content) {
        const session = this.getSession();
        session.getMode().destroy(content);
        session.setScrollTop(0);
    }

    prepareCommit(callback) {
        this.getSession().getMode().prepareCommit(callback);
    }

    commitFailed() {
        this.getSession().getMode().commitFailed();
    }

    commitSuccessful() {
        this.getSession().getMode().commitSuccessful();
        this.saveBreakpoints();
    }

    dependenciesUpdated() {
        this.getSession().getMode().dependenciesUpdated();
    }

    render() {
        return <React.Fragment>
                { this.renderEditor() }
                { this.renderProcessing() }
                { this.renderIdling() }
            </React.Fragment>;
    }

    renderEditor() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const hidden = this.state.debugMode && this.state.debugMode!=="STEPPING";
        const style = {display: (this.state.display && !hidden) ? "block" : "none" };
        return <div className={className} style={style}>
                <AceEditor ref="AceEditor" name="prompto-editor"
                       theme="eclipse" mode="text"
                       value={this.state.value} onChange={this.codeEdited}
                       width="100%" height="100%" editorProps={{ $blockScrolling: Infinity, enableLiveAutocompletion: true }} />
                </div>;
    }

    renderProcessing() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const style = { display: this.state.debugMode==="PROCESSING" ? "block" : "none"};
        return <div className={className} style={style}>
            <img id="processing" src="img/processing.gif" alt=""/>
        </div>;
    }

    renderIdling() {
        const className = "ace-editor-wrapper" + ( this.props.activity===Activity.Debugging ? " debug" : "");
        const style = { display: this.state.debugMode==="IDLING" ? "block" : "none"};
        return <div className={className} style={style}>
            <img id="idling" src="img/vortex.gif" alt=""/>
            <div id="idling-text">No code to execute<br/><i>(server is running)</i></div>
        </div>;
    }
}