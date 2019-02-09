export default class DebugEvent {

    static parse(message) {
        const type = DebugEvent[message.type];
        return new type(message);
    }

    constructor(type) {
        this.type = type;
    }
}

DebugEvent.CONNECTED = class Connected extends DebugEvent {

    constructor(message) {
        super(message.type);
    }

    execute(listener) {
        listener.processConnected(this);
    }

};

DebugEvent.SUSPENDED = class Suspended extends DebugEvent {

    constructor(message) {
        super(message.type);
        this.reason = message.object.reason;
    }

    execute(listener) {
        listener.workerSuspended(this);
    }
};



