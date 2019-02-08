import RemoteRunner from "./RemoteRunner";
import RemoteDebugger from '../debugger/RemoteDebugger';

export default class RemoteInterpreter extends RemoteRunner {

    runContent(projectId, repo, content, callback) {
        this.runRemotely(projectId, "interpret", content, callback);
    }

    startDebugContent(root, projectId, repo, content) {
        root.debuggerView.setDebugger(new RemoteDebugger(root));
        root.debuggerView.debugger.start(projectId, content);
    }

}


