import RemoteListener from './RemoteListener';
import RemoteRequester from './RemoteRequester';
import Activity from "../utils/Activity";
import { GetWorkersRequest, GetStackRequest, StepOverRequest } from './DebugRequest';
import fetcher from '../utils/Fetcher';

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

    start(projectId, content) {
        fetcher.fetchModulePort(projectId, true, port => this.connect(port), alert);
    }

    disconnect() {
        if(this.listener) {
            this.listener.disconnect();
            this.listener = null;
        }
        this.requester = null;
    }

    connect(port) {
        const sessionId = RemoteDebugger.generateSessionId();
        const listener = new RemoteListener(this);
        listener.connect(port, sessionId, () => {
            this.listener = listener;
            this.requester = new RemoteRequester(port);
            this.clientConnected();
        }, alert);
    }

    clientConnected() {
        this.rootView.setState({activity: Activity.Debugging});
    }

    processConnected(event) {
        this.fetchWorkers(workers=>{
            this.getDebuggerView().setWorkers(workers);
        });
    }

    workerSuspended(event) {
        this.getDebuggerView().workerSuspended(event);
    }

    workerResumed(event) {
        this.getDebuggerView().workerResumed(event);
    }

    workerCompleted(event) {
        this.getDebuggerView().workerCompleted(event);
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

    resume(workerId) {

    }

    pause(workerId) {

    }


    stop(workerId) {

    }


    stepOver(workerId, callback) {
        this.requester.send(new StepOverRequest(workerId), response => callback && callback(), alert);
    }


    stepInto(workerId) {

    }


    stepOut(workerId) {

    }


}