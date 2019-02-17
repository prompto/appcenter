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


export class StepOverRequest extends DebugRequest {

    constructor(workerId) {
        super("STEP_OVER");
        this.workerId = workerId;
    }
}

DebugRequest.STEP_OVER = StepOverRequest;


export class StepIntoRequest extends DebugRequest {

    constructor(workerId) {
        super("STEP_INTO");
        this.workerId = workerId;
    }
}

DebugRequest.STEP_INTO = StepIntoRequest;


export class StepOutRequest extends DebugRequest {

    constructor(workerId) {
        super("STEP_OUT");
        this.workerId = workerId;
    }
}

DebugRequest.STEP_OUT = StepOutRequest;

export class ResumeRequest extends DebugRequest {

    constructor(workerId) {
        super("RESUME");
        this.workerId = workerId;
    }
}

DebugRequest.RESUME = ResumeRequest;
