// eslint-disable-next-line
import PromptoWorkerThread from "worker-loader!./PromptoWorkerThread";

export default class PromptoWorkerClient extends window.ace.acequire("ace/worker/worker_client")
    .WorkerClient {

    constructor(session, dialect) {
        // need to patch Worker in order to call compile-time url
        // must be done inline due to call to super
        const savedWorker = window.Worker;
        try {
            window.Worker = function() {
                window.Worker = savedWorker;
                return new PromptoWorkerThread();
            }
            super(["ace"], "ace/worker/prompto", "PromptoWorker", "./PromptoWorkerThread"); // script will be ignored
        } finally {
            window.Worker = savedWorker;
        }
        this.send("setDialect", [ dialect ] );
        this.attachToDocument(session.getDocument());
        this.$markers = [];
        this.addEventListeners(["errors", "annotate", "terminate", "value", "catalogUpdated", "done", "commitPrepared", "runnablePageFetched", "inspected"]);
    }

    addEventListeners(types) {
        types.forEach(type=>{
            const methodName = "on" + type[0].toUpperCase() + type.substring(1);
            this[methodName] = this[methodName].bind(this);
            this.on(type, this[methodName]);
        }, this);
    }

    onErrors(e) {
        this.session.setAnnotations(e.data);
    }

    onAnnotate(e) {
        this.session.setAnnotations(e.data);
        while(this.$markers.length)
            this.session.removeMarker(this.$markers.pop());
        e.data.forEach( a => {
            const range = new Range(a.row, a.column, a.endRow, a.endColumn);
            const marker = this.session.addMarker(range, "ace_error-word", "text", true);
            this.markers.push(marker);
        });
    }

    onTerminate() {
        this.session.clearAnnotations();
    }

    onValue(v) {
        this.session.setValue(v.data);
        this.session.$editor.focus();
    }

    onCatalogUpdated(v) {
        // parent.catalogUpdated(v.data);
    }

    onDone(v) {
        // parent.done(v.data);
    }

    onCommitPrepared(v) {
        // parent.commitPrepared(v.data);
    }

    onRunnablePageFetched(v) {
        // runnablePageFetched(v.data);
    }

    // a utility method to inspect worker data in Firefox/Safari
    onInspected(v) {
        // parent.inspected(v.data);
    }
}