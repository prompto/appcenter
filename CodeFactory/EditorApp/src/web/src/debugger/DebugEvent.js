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
        console.log(this.type);
    }
};

DebugEvent.SUSPENDED = class Suspended extends DebugEvent {

    constructor(message) {
        super(message.type);
        this.reason = message.object.reason;
        console.log(this.type + ", reason:" + this.reason);
    }
};



