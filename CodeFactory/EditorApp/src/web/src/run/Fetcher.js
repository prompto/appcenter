export default class Fetcher {

    constructor() {
        this.$authorization = null;
    }


    fetchJSON(url, success, errored) {
        this.fetchText(url, text => success(JSON.parse(text)), errored);
    }

    fetchText(url, success, errored) {
        var loader = this;
        var xhr = new XMLHttpRequest();
        xhr.onerror = function (e) {
            if(!errored)
                errored = console.log;
            errored("Error " + e.target.status + " occurred while receiving the document.");
            return null;
        };
        xhr.onload = function (e) {
            if (xhr.status == 200) {
                if (url[0] === "/" || url[0] === ".") {
                    // can't read unsafe header
                    loader.$authorization = xhr.getResponseHeader("X-Authorization") || null;
                }
                success(xhr.responseText);
            } else {
                if(!errored)
                    errored = console.log;
                errored("Failed to load " + url + ", error: " + xhr.status);
            }
        };
        xhr.open('GET', url);
        if (url[0] !== "/" && url[0] !== ".") {
            if (this.$authorization != null)
                xhr.setRequestHeader("X-Authorization", this.$authorization);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.withCredentials = true;
        }
        xhr.send(null);
    }
}

Fetcher.instance = new Fetcher(); // singleton needed to register $authorization across calls

