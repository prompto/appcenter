import Sender from '../ace/Sender';
import PromptoWorker from './PromptoWorker';

self.Honey = {'requirePath': ['..']}; // walk up to js folder
importScripts("/js/lib/require.js", "/js/lib/prompto.core.bundle.js", "js/AnnotatingErrorListener.js");

var sender = new Sender();
var worker = new PromptoWorker(sender);

onmessage = function(e) {
    var msg = e.data;
    if (msg.event && sender) {
        sender._signal(msg.event, msg.data);
    } else if (msg.command) {
        if (worker[msg.command])
            worker[msg.command].apply(worker, msg.args);
        else if (self[msg.command])
            self[msg.command].apply(window, msg.args);
        else
            throw new Error("Unknown command: " + msg.command);
    } else if (msg.init) {
        // console.log("init");
    }
};
