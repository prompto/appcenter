import DebuggedWorker from './DebuggedWorker';

export default class DebugResponse {

    static parse(message) {
        const type = DebugResponse[message.type];
        return new type(message);
    }

    constructor(type) {
        this.type = type;
    }
}


DebugResponse.VOID = class VoidResponse extends DebugResponse {

    constructor(message) {
        super(message.type);
    }

};


DebugResponse.GET_WORKERS = class GetWorkersResponse extends DebugResponse {

    constructor(message) {
        super(message.type);
        this.workers = message.object.workers.map(w => new DebuggedWorker(w));
    }

};


DebugResponse.GET_STACK = class GetStackResponse extends DebugResponse {

    constructor(message) {
        super(message.type);
        this.stack = message.object.stack;
    }

};