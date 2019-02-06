import axios from "axios";

// eslint-disable-next-line
const globals = self || window;

export function fetchModuleURL(projectId, success, errored) {
    const params = { params: JSON.stringify([ {name:"dbId", value: projectId}]) };
    axios.get('/ws/run/getModulePort', { params: params })
        .then(resp=>{
            const response = resp.data;
            if (response.error)
                ; // TODO something
            else if(response.data === -1)
                alert("Server is not running!");
            else {
                const href = globals.location.protocol +
                    "//" + globals.location.hostname +
                    ":" + response.data + "/";
                success(href);
            }
        })
        .catch(error=>errored(error));
}
