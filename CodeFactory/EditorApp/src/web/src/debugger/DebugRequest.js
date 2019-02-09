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