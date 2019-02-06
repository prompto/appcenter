import RemoteRunner from "./RemoteRunner";

export default class RemoteInterpreter extends RemoteRunner {

    runContent(projectId, repo, content, callback) {
        this.runRemotely(projectId, "interpret", content, callback);
    }
}


