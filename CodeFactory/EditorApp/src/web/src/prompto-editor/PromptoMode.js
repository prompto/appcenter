/*eslint-disable no-alert, no-console */
import 'brace/mode/text';
import PromptoHighlightRules from './PromptoHighlightRules';
import PromptoWorkerClient from '../worker/PromptoWorkerClient';
import Defaults from "../code/Defaults";

export default class PromptoMode extends window.ace.acequire("ace/mode/text")
    .Mode {
        constructor(editor) {
            super();
            this.$id = "ace/mode/prompto";
            this.$editor = editor;
            this.HighlightRules = PromptoHighlightRules;
        }

        setDialect(dialect) {
            this.$worker && this.$worker.send("setDialect", [ dialect ] );
        }

        setContent(content, callback) {
            this.$worker && this.$worker.call("setContent", [ content ], value => {
                this.$worker.onValue({ data: value });
                if(callback)
                    callback();
            });
        }

        locateContent( stackFrame, callback) {
            this.$worker && this.$worker.call("locateContent", [ stackFrame ], callback);
        }


        locateSection( breakpoint, callback) {
            this.$worker && this.$worker.call("locateSection", [ breakpoint ], callback);
        }

        destroy(content) {
            this.$worker && this.$worker.send("destroy", [ content ] );
        }

        setProject(dbId, loadDependencies) {
            this.$worker && this.$worker.send("setProject", [ dbId, loadDependencies ] );
        }

        prepareCommit(callback) {
            this.$worker && this.$worker.call("prepareCommit", [], callback);
        }

        commitFailed(dbId) {
            this.$worker && this.$worker.send("commitFailed", [ dbId ] );
        }

        commitSuccessful(dbId) {
            this.$worker && this.$worker.send("commitSuccessful", [ dbId ] );
        };

        runTestOrMethod(id, mode, callback) {
            this.$worker && this.$worker.call("runTestOrMethod", [ id, mode ], callback );
        }

        debugMethod(id, mode) {
            this.$worker && this.$worker.send("debugMethod", [ id, mode ] );
        }

        fetchRunnablePage(content, callback) {
            this.$worker && this.$worker.call("fetchRunnablePage", [ content ], callback );
        }

        createWorker(session) {
            this.$worker = new PromptoWorkerClient(this.$editor, Defaults.dialect);
            return this.$worker;
        }

        // a utility method to inspect worker data in Firefox/Safari
        inspect = function(name) {
            this.$worker && this.$worker.send("inspect", [ name ] );
        }

        onCatalogUpdated(catalog) {
            this.$editor.catalogUpdated(catalog);
        }

    }