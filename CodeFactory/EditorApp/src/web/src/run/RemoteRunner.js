import { fetchModuleURL } from './Utils';
import Fetcher from '../utils/Fetcher';
import Runner from "./Runner";

const fetcher = Fetcher.instance;

export default class RemoteRunner extends Runner {

    runRemotely(projectId, mode, content, callback) {
        fetchModuleURL(projectId, url => {
            const fullUrl = url + "ws/run/" + content.name;
            const params = { mode: mode };
            if(content.subType === "method")
                params.main = true;
            fetcher.fetchJSON(fullUrl, { params: params }, response => {
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

