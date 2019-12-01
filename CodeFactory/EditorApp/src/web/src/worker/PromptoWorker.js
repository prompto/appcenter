import Mirror from '../ace/Mirror';
import Repository from '../code/Repository';
import Defaults from '../code/Defaults';
import Runners from '../run/LocalRunners';
import fetcher from '../utils/Fetcher';

// eslint-disable-next-line
const globals = self || window;
const prompto = globals.prompto;

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
        this.loadCore();
    }

    loadCore() {
        this.markLoading("Core");
        fetcher.getTEXT("prompto/prompto.pec", null, text => {
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
                this.sender.emit("contentUpdated", catalog);
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
        this.loadProject(loadDependencies);
    }


    setContent(content) {
        const callbackId = arguments[arguments.length - 1]; // callbackId is added by ACE
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
        this.sender.callback(this.$value, callbackId);
    }

    locateContent(stackFrame) {
        const callbackId = arguments[arguments.length - 1]; // callbackId is added by ACE
        const content = this.$repo.locateContent(stackFrame);
        this.sender.callback(content, callbackId);
    }

    locateSection(breakpoint) {
        const callbackId = arguments[arguments.length - 1]; // callbackId is added by ACE
        const section = this.$repo.locateSection(breakpoint);
        this.sender.callback(section, callbackId);
    }

    destroy(content) {
        this.$value = "";
        const catalog = this.$repo.handleDestroyed(content);
        if(catalog)
            this.sender.emit("catalogUpdated", catalog);
        this.sender.emit("value", this.$value);
    }


    loadProject(loadDependencies) {
        this.fetchProjectDescription(this.$projectId, true, response => {
            if(response.error)
                ; // TODO something
            else {
                this.$project = response.data.value;
                if(loadDependencies)
                    this.loadDependencies();
                this.markLoaded("%Description%");
            }
        });
        this.fetchModuleDeclarations(this.$projectId, response => {
            if(response.error)
                ; // TODO something
            else {
                const declarations = response.data.value;
                this.$repo.registerProjectDeclarations(this.$projectId, declarations);
                this.markLoaded("Project");
            }
        });
    }

    loadDependencies() {
        if(this.$project.dependencies) {
            this.$project.dependencies.value
                .filter(dep => dep!=null)
                .map(dep=>this.loadDependency(dep.value || dep), this);
        }
    }


    loadDependency(dependency) {
        this.markLoading(dependency.name);
        this.fetchModuleDescription(dependency.name, dependency.version, response => {
            if(response.error)
                ; // TODO something
            else {
                const description = response.data.value;
                if(description.stubResource) {
                    // resource location is absolute
                    globals.importScripts("/" + description.stubResource);
                }
                this.fetchModuleDeclarations(description.dbId, response => {
                    if (response.error)
                        ; // TODO something
                    else {
                        const declarations = response.data.value;
                        this.$repo.registerLibraryDeclarations(declarations);
                        this.markLoaded(dependency.name);
                    }
                });
            }
        });
    }

    dependenciesUpdated() {
        this.$repo.clearLibrariesContext();
        this.markLoading("Project");
        // fake 'library' to ensure libraries are published only once dependencies are loaded
        this.markLoading("%Description%");
        this.loadCore();
        this.loadProject(true);
    }

    fetchProjectDescription(projectId, register, success) {
        const params = [ {name:"dbId", value:projectId.toString()}, {name:"register", type:"Boolean", value:register}];
        const url = '/ws/run/fetchModuleDescription';
        fetcher.getJSON(url, { params: JSON.stringify(params) }, success);
    }

    fetchModuleDescription(name, version, success) {
        const params = [ {name:"name", type:"Text", value:name}, {name:"version", type:version.type, value:version.value}, {name:"register", type:"Boolean", value:false} ];
        const url = '/ws/run/fetchModuleDescription';
        fetcher.getJSON(url, { params: JSON.stringify(params) }, success);
    }

    fetchModuleDeclarations(moduleId, success) {
        const params = [ {name:"dbId", value:moduleId.toString()}];
        const url = '/ws/run/fetchModuleDeclarations';
        fetcher.getJSON(url, { params: JSON.stringify(params) }, success);
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
        const callbackId = arguments[arguments.length - 1]; // callbackId is added by ACE
        const declarations = this.$repo.prepareCommit();
        this.sender.callback(declarations, callbackId);
    }

    commitFailed() {
        // keep state as is
    }

    commitSuccessful() {
        this.fetchModuleDeclarations(this.$projectId, response => {
            if (response.error)
                ; // TODO something
            else {
                const declarations = response.data.value;
                this.$repo.registerCommitted(declarations);
             }
        });
    }

    runTestOrMethod(content, mode) {
        const callbackId = arguments[arguments.length - 1]; // callbackId is added by ACE
        const runner = Runners.forMode(mode);
        if(runner)
            runner.runContent(this.$projectId, this.$repo, content, ()=>this.sender.callback(null, callbackId));
        else {
            console.log("Unsupported mode: " + mode);
            this.sender.callback(null, callbackId);
        }
    }


    fetchRunnablePage(content) {
        const callbackId = arguments[arguments.length - 1]; // callbackId is added by ACE
        var runnable = { valid: false, content: null };
        var decl = this.$repo.getDeclaration(content);
        if(decl!==null && decl.annotations && decl instanceof prompto.declaration.ConcreteWidgetDeclaration) {
            var annotations = decl.annotations.filter(function(a) { return a.id.name==="@PageWidgetOf" });
            if(annotations.length>0) {
                var expression = annotations[0].getDefaultArgument();
                if (expression instanceof prompto.literal.TextLiteral) {
                    runnable = {valid: true, content: {type: "page", name: expression.value.toString()}};
                }
            }
        }
        this.sender.callback(runnable, callbackId);
    }
}