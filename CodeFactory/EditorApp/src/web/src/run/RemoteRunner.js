import { print } from "../utils/Utils";
import fetcher from '../utils/Fetcher';
import Runner from "./Runner";

export default class RemoteRunner extends Runner {

    runRemotely(projectId, mode, content, callback) {
        fetcher.fetchModuleURL(projectId, "RUN",  url => {
            const fullUrl = url + "ws/run/" + content.name;
            const params = { mode: mode };
            if(content.subType === "method")
                params.main = true;
            fetcher.getJSON(fullUrl, params, response => {
                if (response.error)
                    print(response.error);
                else if(response.data instanceof Array)
                    response.data.map(m => print(m));
                else
                    print(response.data);
                callback && callback();
            }, error => {
                print(error);
                callback && callback();
            });
        }, error => {
            print(error);
            callback && callback();
        });
    }
}

