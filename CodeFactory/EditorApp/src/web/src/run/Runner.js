import { fetchModuleURL } from './Utils';
import Fetcher from './Fetcher';

const fetcher = Fetcher.instance;

export default class Runner {

    static types = {};

    static forMode(mode) {
        const type = Runner.types[mode];
        return new type();
    }

    runContent(projectId, repo, content, callback) {
        throw new Error("Unsupported!");
    }

}

class LocalInterpreter extends Runner {

    runContent(projectId, repo, content, callback) {
        if (content.subType === "test")
            this.runTest(repo, content, callback);
        else
            this.runMethod(repo, content, callback);
    }

    runTest(repo, content, callback) {
        const store = prompto.store.DataStore.instance;
        prompto.store.DataStore.instance = new prompto.memstore.MemStore();
        try {
            prompto.runtime.Interpreter.interpretTest(repo.projectContext, content.name);
        } finally {
            prompto.store.DataStore.instance = store;
            callback();
        }
    }

    runMethod(repo, content, callback) {
        try {
            prompto.runtime.Interpreter.interpret(repo.projectContext, content.name, "");
            console.log("Finished running " + content.name);
        } finally {
            callback();
        }
    }
}
Runner.types.LI = LocalInterpreter;


class LocalExecutor extends Runner {

}
Runner.types.LE = LocalExecutor;


class RemoteRunner extends Runner {

    runRemotely(projectId, mode, content, callback) {
        fetchModuleURL(projectId, url => {
            var fullUrl = url + "ws/run/" + content.name +  "?mode=" + mode;
            if(content.subType==="method")
                fullUrl = fullUrl + "&main=true";
            fetcher.fetchJSON(fullUrl, response => {
                if (response.error)
                    console.log(response.error);
                else if(response.data instanceof Array)
                    response.data.map(console.log);
                else
                    console.log(response.data);
                callback();
            }, error => {
                console.log(error);
                callback();
            });
        }, error => {
            console.log(error);
            callback();
        });
    }
}


class RemoteInterpreter extends RemoteRunner {

    runContent(projectId, repo, content, callback) {
        this.runRemotely(projectId, "interpret", content, callback);
    }
}
Runner.types.SI = RemoteInterpreter;


class RemoteExecutor extends RemoteRunner {

    runContent(projectId, repo, content, callback) {
        this.runRemotely(projectId, "execute", content, callback);
    }
}
Runner.types.SE = RemoteExecutor;



