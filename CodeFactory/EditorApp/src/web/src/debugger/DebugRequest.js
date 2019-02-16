class DebugRequest {

    constructor(type) {
        this.type = type;
    }
}

export class GetWorkersRequest extends DebugRequest {

    constructor() {
        super("GET_WORKERS");
    }
}

DebugRequest.GET_WORKERS = GetWorkersRequest;


export class GetStackRequest extends DebugRequest {

    constructor(workerId) {
        super("GET_STACK");
        this.workerId = workerId;
    }
}

DebugRequest.GET_STACK = GetStackRequest;
