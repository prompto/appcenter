import RemoteListener from './RemoteListener';
import RemoteRequester from './RemoteRequester';
import Activity from "../utils/Activity";
import { GetProcessStatusRequest, GetWorkersRequest, GetStackRequest, GetVariablesRequest, GetVariableRequest,
        StepOverRequest, StepIntoRequest, StepOutRequest, SuspendRequest, ResumeRequest, TerminateRequest,
        InstallBreakpointRequest } from './DebugRequest';
import fetcher from '../utils/Fetcher';
import {print} from "../utils/Utils";

export default class RemoteDebugger {

    static generateSessionId() {
        // a good enough UUID generator
        let uuid = "";
        while(uuid.length < 32)
            uuid += Math.random().toString(16).substring(2); // hex number, skip leading '0.'
        // format to 8-4-4-4-12
        return uuid.substring(0, 8) + '-' + uuid.substring(8, 12) + '-' + uuid.substring(12, 16) + '-' + uuid.substring(16, 20) + '-' + uuid.substring(20, 32);
    }

    constructor(root) {
        this.rootView = root;
        this.requester = null;
        this.listener = null;
    }

    start(projectId, content, callback) {
        if(content)
            this.onServerReadyEvent = event => this.doServerReadyEvent(event, projectId, content);
        else if(callback)
            this.onServerReadyEvent = event => callback();
        else
            this.onServerReadyEvent = event => {};
        fetcher.fetchModulePort(projectId, "DEBUG", port => this.connect(port), alert);
    }

    disconnect() {
        if(this.listener) {
            this.listener.disconnect();
            this.listener = null;
        }
        this.requester = null;
    }

    connect(port) {
        // browser is not always able to request authentication when opening a WebSocket
        // workaround is to call a neutral method to force authentication
        const requester = new RemoteRequester(port);
        requester.send(new GetProcessStatusRequest(), () => {
            const sessionId = RemoteDebugger.generateSessionId();
            const listener = new RemoteListener(this);
            listener.connect(port, sessionId, () => {
                this.listener = listener;
                this.requester = requester;
                this.clientConnected();
            }, alert);
        }, alert);
    }

    clientConnected() {
        this.rootView.setState({activity: Activity.Debugging});
        this.rootView.getContentEditor().getPromptoEditor().debuggerConnected(this);
    }

    serverConnectedEvent(event) {
        this.fetchWorkers(workers=>{
            this.getDebuggerView().setWorkers(workers);
        });
    }

    serverReadyEvent(event) {
        this.onServerReadyEvent(event);
    }

    doServerReadyEvent(event, projectId, content) {
        this.runRemotely(content);
    }

    runRemotely(content) {
        const url = window.location.protocol + "//" + window.location.hostname + ":" + this.requester.port + "/ws/run/" + content.name;
        const params = { mode: "interpret" };
        if(content.subType === "method")
            params.main = true;
        fetcher.getJSON(url, params, response => {
            if (response.error)
                print(response.error);
            else if(response.data instanceof Array)
                response.data.map(m => print(m));
            else
                print(response.data);
        }, error => {
            print(error);
        });
    }

    workerStartedEvent(event) {
        this.getDebuggerView().workerStartedEvent(event);
    }

    workerSuspendedEvent(event) {
        this.getDebuggerView().workerSuspendedEvent(event);
    }

    workerResumedEvent(event) {
        this.getDebuggerView().workerResumedEvent(event);
    }

    workerCompletedEvent(event) {
        this.getDebuggerView().workerCompletedEvent(event);
    }


    getDebuggerView() {
        return this.rootView.getDebuggerView();
    }

    fetchWorkers(callback) {
        this.requester.send(new GetWorkersRequest(), response => callback(response.workers), alert);
    }

    fetchStack(workerId, callback) {
        this.requester.send(new GetStackRequest(workerId), response => callback(response.stack), alert);
    }

    fetchVariables(workerId, stackFrame, callback) {
        this.requester.send(new GetVariablesRequest(workerId, stackFrame), response => callback(response.variables), alert);
    }

    fetchVariable(workerId, stackFrame, name, callback) {
        this.requester.send(new GetVariableRequest(workerId, stackFrame, name), response => callback(response.variable), alert);
    }

    resume(workerId, callback) {
        this.requester.send(new ResumeRequest(workerId), response => callback && callback(), alert);
    }

    suspend(workerId, callback) {
        this.requester.send(new SuspendRequest(workerId), response => callback && callback(), alert);
    }


    terminate(workerId, callback) {
        this.requester.send(new TerminateRequest(workerId), response => callback && callback(), alert);
    }


    stepOver(workerId, callback) {
        this.requester.send(new StepOverRequest(workerId), response => callback && callback(), alert);
    }


    stepInto(workerId, callback) {
        this.requester.send(new StepIntoRequest(workerId), response => callback && callback(), alert);
    }


    stepOut(workerId, callback) {
        this.requester.send(new StepOutRequest(workerId), response => callback && callback(), alert);
    }

    installBreakpoint(section, callback) {
        this.requester.send(new InstallBreakpointRequest(section), response => callback && callback(), alert);
    }


}