// eslint-disable-next-line
import PromptoWorkerThread from "worker-loader!./PromptoWorkerThread";
import Range from "../ace/Range";
import { print } from '../utils/Utils';

export default class PromptoWorkerClient extends window.ace.acequire("ace/worker/worker_client")
    .WorkerClient {

    constructor(editor, dialect) {
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
        this.$worker.onmessage = this.messageHook.bind(this);
        this.$editor = editor;
        this.addEventListeners(["errors", "annotate", "terminate", "value", "catalogUpdated", "inspected"]);
        this.attachToDocument(this.getSession().getDocument());
        this.send("setDialect", [ dialect ] );
    }

    messageHook(e) {
        if(e.data.type === "log")
            print(e.data.data);
        else
            this.onMessage(e);
    }

    getEditor() {
        return this.$editor.getEditor();
    }

    getSession() {
        return this.getEditor().getSession();
    }

    addEventListeners(types) {
        types.forEach(type=>{
            const methodName = "on" + type[0].toUpperCase() + type.substring(1);
            this[methodName] = this[methodName].bind(this);
            this.on(type, this[methodName]);
        }, this);
    }

    onErrors(e) {
        this.getSession().setAnnotations(e.data);
    }

    onAnnotate(e) {
        this.getSession().setAnnotations(e.data);
        this.clearMarkers();
        this.createMarkers(e.data);
    }

    clearMarkers() {
        const session = this.getSession();
        const markers = session.getMarkers(true);
        for(let marker in markers)
            session.removeMarker(marker);
    }

    createMarkers(data) {
        const ranges = this.computeRanges(data);
        const session = this.getSession();
        ranges.forEach(range => session.addMarker(range, "ace_error-word", "text", true));
    }

    computeRanges(data) {
        const ranges = [];
        // avoid overlapping markers which look ugly
        data.forEach( a => this.mergeRange(ranges, new Range(a.row, a.column, a.endRow, a.endColumn)), this);
        return ranges;
    }

    mergeRange(ranges, range) {
        const mergeable = ranges.filter( r => r.intersects(range) );
        if( mergeable.length === 0)
            ranges.push(range);
        else {
            // recursively merge first intersecting range
            const idx = ranges.indexOf(mergeable[0]);
            const old = ranges.splice(idx, 1)[0];
            const merged = old.extend(range.start.row, range.start.column).extend(range.end.row, range.end.column);
            this.mergeRange(ranges, merged);
        }
    }

    onTerminate() {
        this.getSession().clearAnnotations();
    }

    onValue(v) {
        this.getSession().setValue(v.data);
        this.getEditor().focus();
    }

    onCatalogUpdated(v) {
        this.getSession().getMode().onCatalogUpdated(v.data);
    }

    // a utility method to inspect worker data in Firefox/Safari
    onInspected(v) {
        console.log("onInspected");
        // parent.inspected(v.data);
    }
}