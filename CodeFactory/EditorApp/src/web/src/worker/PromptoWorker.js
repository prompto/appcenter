import Mirror from '../ace/Mirror';
import Repository from '../code/Repository';
import Defaults from '../code/Defaults';
import Runner from '../run/Runner';
import Fetcher from '../run/Fetcher';

// eslint-disable-next-line
const globals = self || window;
const prompto = globals.prompto;
const location = globals.location;
const fetcher = Fetcher.instance;

export default class PromptoWorker extends Mirror {

    constructor(sender) {
        super(sender);
        this.$projectId = null;
        this.$project = null;
        this.$dialect = Defaults.dialect;
        this.$value = this.doc.getValue();
        this.$core = false;
        this.$repo = new Repository();
        this.$loading = {};
        this.onInit();
    }

    onInit() {
        this.markLoading("Project");
        // fake 'library' to ensure libraries are published only once dependencies are loaded
        this.markLoading("%Description%");
        // load core
        this.markLoading("Core");
        fetcher.fetchText("prompto/prompto.pec", text => {
            this.$repo.registerLibraryCode(text, "E");
            this.markLoaded("Core");
        });
    }

    onUpdate() {
        var value = this.doc.getValue();
        var errorListener = new globals.AnnotatingErrorListener();
        if(value === this.$value && !this.$selectedContent)
            this.$repo.handleSetContent(value, this.$dialect, errorListener);
        else {
            const catalog = this.$repo.handleEditContent(value, this.$dialect, errorListener, this.$selectedContent);
            delete this.$selectedContent;
            if (catalog)
                this.sender.emit("catalogUpdated", catalog);
        }
        this.$value = value;
        this.sender.emit("annotate", errorListener.problems);
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

    setProject(projectId, loadDependencies) {
        this.$projectId = projectId;
        this.unpublishProject();
        this.loadProject(projectId, loadDependencies);
    }


    setContent(content) {
        // remember value if it does not result from an edit
        if(content.creating) {
            this.$value = "";
            this.$selectedContent = false;
            this.$core = false;
        } else if(content.name) {
            this.$value = this.$repo.getDeclarationBody(content, this.$dialect);
            this.$core = content.core || false;
        } else {
            this.$value = content.body || "";
            this.$selectedContent = (content.body || null) !== null;
            this.$core = false;
        }
        this.sender.emit("value", this.$value);
    }


    destroy(content) {
        this.$value = "";
        const catalog = this.$repo.handleDestroyed(content);
        if(catalog)
            this.sender.emit("catalogUpdated", catalog);
        this.sender.emit("value", this.$value);
    }


    loadProject(projectId, loadDependencies) {
        this.fetchModuleDescription(projectId, true, response => {
            if(response.error)
                ; // TODO something
            else {
                this.$project = response.data.value;
                if(loadDependencies && this.$project.dependencies) {
                    this.$project.dependencies.value
                        .filter(dep => dep!=null)
                        .map(dep=>this.loadDependency(dep.value || dep), this);
                }
                this.markLoaded("%Description%");
            }
        });
        this.fetchProjectDeclarations(projectId, response => {
            if(response.error)
                ; // TODO something
            else {
                const declarations = response.data.value;
                this.$repo.registerProjectDeclarations(projectId, declarations);
                this.markLoaded("Project");
            }
        });
    }

    loadDependency(dependency) {
        this.markLoading(dependency.name);
        this.fetchLibraryDeclarations(dependency.name, dependency.version, response => {
            if(response.error)
                ; // TODO something
            else {
                const declarations = response.data.value;
                this.$repo.registerLibraryDeclarations(declarations);
                this.markLoaded(dependency.name);
            }
        });
    }

    fetchModuleDescription(projectId, register, success) {
        var params = [ {name:"dbId", value:projectId.toString()}, {name:"register", type:"Boolean", value:register}];
        var url = '/ws/run/getModuleDescription?params=' + JSON.stringify(params);
        fetcher.fetchJSON(url, success);
    }

    fetchProjectDeclarations(projectId, success) {
        var params = [ {name:"dbId", value:projectId.toString()}];
        var url = '/ws/run/getModuleDeclarations?params=' + JSON.stringify(params);
        fetcher.fetchJSON(url, success);
    }


    fetchLibraryDeclarations(name, version, success) {
        var params = [ {name:"name", type:"Text", value:name}, {name:"version", type:version.type, value:version.value} ];
        var url = '/ws/run/getModuleDeclarations?params=' + JSON.stringify(params);
        fetcher.fetchJSON(url, success);
    }

    publishLibraries() {
        var catalog = this.$repo.publishLibraries();
        this.sender.emit("catalogUpdated", catalog);
    }

    publishProject() {
        var catalog = this.$repo.publishProject();
        this.sender.emit("catalogUpdated", catalog);
    }

    unpublishProject() {
        var catalog = this.$repo.unpublishProject();
        this.sender.emit("catalogUpdated", catalog);
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

    prepareCommit() {
        const declarations = this.$repo.prepareCommit();
        this.sender.callback(declarations, arguments[0]); // callbackId is added by ACE);
    }

    commitFailed() {
        // keep state as is
    }

    commitSuccessful() {
        this.fetchProjectDeclarations(this.$projectId, response => {
            if (response.error)
                ; // TODO something
            else {
                const declarations = response.data.value;
                this.$repo.registerCommitted(declarations);
             }
        });
    }

    runMethod(content, mode) {
        const runner = Runner.forMode(mode);
        runner.runContent(this.$projectId, this.$repo, content, ()=>this.sender.callback(arguments[2])); // callbackId is added by ACE
    }


    fetchRunnablePage(content) {
        var runnable = { valid: false, content: null };
        var decl = this.$repo.getDeclaration(content);
        if(decl!==null && decl.annotations && decl instanceof prompto.declaration.ConcreteWidgetDeclaration) {
            var annotations = decl.annotations.filter(function(a) { return a.id.name==="@PageWidgetOf" });
            if(annotations.length>0 && annotations[0].expression instanceof prompto.literal.TextLiteral)
                runnable = { valid: true, content: { type: "page", name: annotations[0].expression.value.toString() }};
        }
        this.sender.callback(runnable, arguments[1]); // callbackId is added by ACE
    }
}