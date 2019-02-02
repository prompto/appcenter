import Mirror from '../ace/Mirror';
import Repository from '../code/Repository';

export default class PromptoWorker extends Mirror {

    constructor(sender) {
        super(sender);
        this.$projectId = null;
        this.$project = null;
        this.$dialect = null;
        this.$value = this.doc.getValue();
        this.$core = false;
        this.$repo = new Repository();
        this.$loading = {};
        this.$authorization = null;
        this.onInit();
    }

    onInit() {
        this.markLoading("Project");
        // fake 'library' to ensure libraries are published only once dependencies are loaded
        this.markLoading("%Description%");
        // load core
        this.markLoading("Core");
        this.loadText("../prompto/prompto.pec", text => {
            this.$repo.registerLibraryCode(text, "E");
            this.markLoaded("Core");
        });
    }

    setDialect(dialect) {
        var old = this.$dialect;
        this.$dialect = dialect;
        if(old && dialect!==old) {
            var value = this.doc.getValue();
            if(value) {
                // remember value since it does not result from an edit
                this.$value = this.$repo.translate(value, old, dialect);
                this.sender.emit("value", this.$value);
            }
        }
    }

    markLoading(name) {
        this.$loading[name] = true;
    }

    markLoaded (name) {
        delete this.$loading[name];
        // is this the Project ?
        if(name==="Project")
            this.publishProject();
        // is this the last library ?
        else if (Object.keys(this.$loading).length === 1 && "Project" in this.$loading)
            this.publishLibraries();
        // is this the last loading
        else if (Object.keys(this.$loading).length === 0)
            this.publishLibraries();
    }

    loadText(url, success) {
        var worker = this;
        var xhr = new XMLHttpRequest();
        xhr.onerror = function(e) {
            self.console.log("Error " + e.target.status + " occurred while receiving the document.");
            return null;
        };
        xhr.onload = function(e) {
            if(url[0]=="/" || url[0]==".") {
                // can't read unsafe header
                worker.$authorization = xhr.getResponseHeader("X-Authorization") || null;
            }
            success(xhr.responseText);
        };
        xhr.open('GET', url);
        if(url[0]!="/" && url[0]!=".") {
            if(worker.$authorization!=null)
                xhr.setRequestHeader("X-Authorization", worker.$authorization);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.withCredentials = true;
        }
        xhr.send(null);
    }

}