import RemoteRunner from "./RemoteRunner";

export default class RemoteExecutor extends RemoteRunner {

    runContent(projectId, repo, content, callback) {
        this.runRemotely(projectId, "execute", content, callback);
    }
}


