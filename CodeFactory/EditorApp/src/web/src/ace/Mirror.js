import Document from './Document';
import { delayedCall } from './lang';

export default class Mirror {
    
    constructor(sender) {
        this.sender = sender;
        this.$timeout = 500;
        var doc = this.doc = new Document("");

        var deferredUpdate = this.deferredUpdate = delayedCall(this.onUpdate.bind(this));

        var _self = this;
        sender.on("change", function(e) {
            var data = e.data;
            if (data[0].start) {
                doc.applyDeltas(data);
            } else {
                for (var i = 0; i < data.length; i += 2) {
                    if (Array.isArray(data[i+1])) {
                        var d = {action: "insert", start: data[i], lines: data[i+1]};
                    } else {
                        var d = {action: "remove", start: data[i], end: data[i+1]};
                    }
                    doc.applyDelta(d, true);
                }
            }
            if (_self.$timeout)
                return deferredUpdate.schedule(_self.$timeout);
            _self.onUpdate();
        });
    }


    setTimeout(timeout) {
        this.$timeout = timeout;
    }

    setValue(value) {
        this.doc.setValue(value);
        this.deferredUpdate.schedule(this.$timeout);
    }

    getValue(callbackId) {
        this.sender.callback(this.doc.getValue(), callbackId);
    }

    onUpdate() {
        // abstract method
    }

    isPending() {
        return this.deferredUpdate.isPending();
    }

}