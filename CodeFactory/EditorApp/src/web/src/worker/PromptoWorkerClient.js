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
        // done with the hacky stuff
        this.$session = session;
        this.$markers = [];
        this.addEventListeners(["errors", "annotate", "terminate", "value", "catalogUpdated", "done", "commitPrepared", "runnablePageFetched", "inspected"]);
        this.attachToDocument(session.getDocument());
        this.send("setDialect", [ dialect ] );
    }

    addEventListeners(types) {
        types.forEach(type=>{
            const methodName = "on" + type[0].toUpperCase() + type.substring(1);
            this[methodName] = this[methodName].bind(this);
            this.on(type, this[methodName]);
        }, this);
    }

    onErrors(e) {
        this.$session.setAnnotations(e.data);
    }

    onAnnotate(e) {
        this.$session.setAnnotations(e.data);
        while(this.$markers.length)
            this.$session.removeMarker(this.$markers.pop());
        e.data.forEach( a => {
            const range = new Range(a.row, a.column, a.endRow, a.endColumn);
            const marker = this.$session.addMarker(range, "ace_error-word", "text", true);
            this.markers.push(marker);
        });
    }

    onTerminate() {
        this.$session.clearAnnotations();
    }

    onValue(v) {
        this.$session.setValue(v.data);
        this.$session.$editor.focus();
    }

    onCatalogUpdated(v) {
        this.$session.getMode().onCatalogUpdated(v.data);
    }

    onDone(v) {
        console.log("onDone");
        // parent.done(v.data);
    }

    onCommitPrepared(v) {
        console.log("onDone");
        // parent.onCommitPrepared(v.data);
    }

    onRunnablePageFetched(v) {
        console.log("onRunnablePageFetched");
        // runnablePageFetched(v.data);
    }

    // a utility method to inspect worker data in Firefox/Safari
    onInspected(v) {
        console.log("onInspected");
        // parent.inspected(v.data);
    }
}