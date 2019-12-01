export default class Project {

    constructor(data) {
        Object.assign(this, data);
    }

    hasStartMethod() {
        return this.type==="Batch";
    }

    hasServerStartMethod() {
        return this.type === "Service" || this.type === "WebSite";
    }

    hasHomePage() {
        return this.type === "WebSite";
    }

    hasResources() {
        return this.type === "WebLibrary";
    }

}