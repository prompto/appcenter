import RemoteRunner from "./RemoteRunner";
import fetcher from '../utils/Fetcher';

export default class RemoteInterpreter extends RemoteRunner {

    runContent(projectId, repo, content, callback) {
        this.runRemotely(projectId, "interpret", content, callback);
    }

    startDebugContent(projectId, repo, content, callback) {
        fetcher.fetchModulePort(projectId, true, port => callback(port), alert);
    }

}


