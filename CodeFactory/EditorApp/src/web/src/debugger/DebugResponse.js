import Thread from './Thread';

export default class DebugResponse {

    static parse(message) {
        const type = DebugResponse[message.type];
        return new type(message);
    }

    constructor(type) {
        this.type = type;
    }
}

DebugResponse.GET_THREADS = class GetThreads extends DebugResponse {

    constructor(message) {
        super(message.type);
        this.threads = message.object.threads.map(t => new Thread(t));
    }

};