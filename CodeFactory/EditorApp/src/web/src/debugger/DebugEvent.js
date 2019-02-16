export default class DebugEvent {

    static parse(message) {
        const type = DebugEvent[message.type];
        if(type)
            return new type(message);
        else
            throw "Unsupported " + message.type;
    }

    constructor(type) {
        this.type = type;
    }
}

DebugEvent.CONNECTED = class ServerConnectedEvent extends DebugEvent {

    constructor(message) {
        super(message.type);
    }

    execute(listener) {
        listener.processConnected(this);
    }

};

DebugEvent.SUSPENDED = class WorkerSuspendedEvent extends DebugEvent {

    constructor(message) {
        super(message.type);
        this.workerId = message.object.workerId;
        this.reason = message.object.reason;
    }

    execute(listener) {
        listener.workerSuspended(this);
    }
};


DebugEvent.RESUMED = class WorkerSuspendedEvent extends DebugEvent {

    constructor(message) {
        super(message.type);
        this.workerId = message.object.workerId;
        this.reason = message.object.reason;
    }

    execute(listener) {
        listener.workerResumed(this);
    }
};


DebugEvent.COMPLETED = class WorkerCompletedEvent extends DebugEvent {

    constructor(message) {
        super(message.type);
        this.workerId = message.object.workerId;
        this.reason = message.object.reason;
    }

    execute(listener) {
        listener.workerCompleted(this);
    }
};

