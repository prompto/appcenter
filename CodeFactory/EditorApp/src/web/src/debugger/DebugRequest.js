class DebugRequest {

    constructor(type) {
        this.type = type;
    }
}

export class GetProcessStatusRequest extends DebugRequest {

    constructor() {
        super("GET_PROCESS_STATUS");
    }
}

DebugRequest.GET_PROCESS_STATUS = GetProcessStatusRequest;

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


export class GetVariablesRequest extends DebugRequest {

    constructor(workerId, stackFrame) {
        super("GET_VARIABLES");
        this.workerId = workerId;
        this.stackFrame = stackFrame;
    }
}

DebugRequest.GET_VARIABLES = GetVariablesRequest;


export class GetVariableRequest extends DebugRequest {

    constructor(workerId, stackFrame, variableName) {
        super("GET_VARIABLE");
        this.workerId = workerId;
        this.stackFrame = stackFrame;
        this.variableName = variableName;
    }
}

DebugRequest.GET_VARIABLE = GetVariableRequest;


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


export class SuspendRequest extends DebugRequest {

    constructor(workerId) {
        super("SUSPEND");
        this.workerId = workerId;
    }
}

DebugRequest.SUSPEND = SuspendRequest;


export class ResumeRequest extends DebugRequest {

    constructor(workerId) {
        super("RESUME");
        this.workerId = workerId;
    }
}

DebugRequest.RESUME = ResumeRequest;


export class TerminateRequest extends DebugRequest {

    constructor(workerId) {
        super("TERMINATE");
        this.workerId = workerId;
    }
}

DebugRequest.TERMINATE = TerminateRequest;


export class InstallBreakpointRequest extends DebugRequest {

    constructor(section) {
        super("INSTALL_BREAKPOINT");
        this.section = section;
    }
}

DebugRequest.INSTALL_BREAKPOINT = InstallBreakpointRequest;
