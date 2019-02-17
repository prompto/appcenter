import axios from "axios";

// eslint-disable-next-line
const globals = self || window;

class Fetcher {

    constructor() {
        this.$authorization = null;
        this.onSuccess = this.onSuccess.bind(this);
        this.prepareConfig = this.prepareConfig.bind(this);
        this.collectHeaders = this.collectHeaders.bind(this);
    }

    prepareConfig(url) {
        if (url[0] !== "/" && url[0] !== ".") {
            let headers = { "Access-Control-Allow-Origin": "*" };
            if(this.$authorization !== null)
                headers =  { ...headers, "X-Authorization": this.$authorization };
            return { withCredentials: true, headers: headers};
        } else
            return {};
    }

    fetchJSON(url, params, success, errored) {
        this.fetchText(url, params, text => {
            const json = typeof(text)===typeof('') ? JSON.parse(text) : text; // already transformed by axios
            success(json);
        }, errored);
    }

    fetchText(url, params, success, errored) {
        errored = errored || console.log;
        let config = this.prepareConfig(url);
        if(params)
            config = { ...config, params: params};
        axios.get(url, config)
           .then(resp => this.onSuccess(resp, url, success, errored))
           .catch(errored);
    }

    onSuccess(response, url, success, errored) {
        if (response.status === 200) {
            this.collectHeaders(response, url);
            success(response.data);
        } else
            errored("Failed to load " + url + ", error: " + response.status);
    }

    collectHeaders(response, url) {
        // only read headers from server
        if (url[0] === "/" || url[0] === ".")
            this.$authorization = response.headers["X-Authorization"] || null;
    }

    fetchModulePort(projectId, debug, success, errored) {
        const args = [ {name:"dbId", value: projectId}, {name:"debug", type: "Boolean", value: debug} ];
        const params = { params: JSON.stringify(args) };
        axios.get('/ws/run/getModulePort', { params: params })
            .then(resp => {
                const response = resp.data;
                if (response.error)
                    ; // TODO something
                else if(response.data === -1)
                    alert("Server is not running!");
                else
                    success(response.data);
            })
            .catch(error => errored(error));
    }

    fetchModuleURL(projectId, success, errored) {
        this.fetchModulePort(projectId, false, port => {
            const href = globals.location.protocol +
                "//" + globals.location.hostname +
                ":" + port + "/";
            success(href);
        }, errored);
    }

}

const fetcher = new Fetcher(); // singleton needed to register $authorization across calls

export default fetcher;