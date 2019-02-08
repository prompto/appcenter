class DebugRequest {

    constructor(type) {
        this.type = type;
    }
}

export class GetThreadsRequest extends DebugRequest {

    constructor() {
        super("GET_THREADS");
    }
}

DebugRequest.GET_THREADS = GetThreadsRequest;