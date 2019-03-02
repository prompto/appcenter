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


DebugResponse.GET_VARIABLES = class GetVariablesResponse extends DebugResponse {

    constructor(message) {
        super(message.type);
        this.variables = message.object.variables;
    }

};


DebugResponse.GET_VARIABLE = class GetVariableResponse extends DebugResponse {

    constructor(message) {
        super(message.type);
        this.variable = message.object.variable;
    }

};