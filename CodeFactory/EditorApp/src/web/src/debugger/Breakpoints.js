class Breakpoint {

    constructor(active) {
        this.active = !!active;
    }

    equals(breakpoint) {
        throw new Error("You must override Breakpoint.equals!");
    }

}

export class LineBreakpoint extends Breakpoint {

    constructor(type, name, proto, line, active) {
        super(active);
        this.type = type;
        this.name = name;
        this.proto = proto;
        this.line = line;
    }

    equals(breakpoint) {
        return (this===breakpoint) ||
            ((breakpoint instanceof LineBreakpoint) &&
                this.type === breakpoint.type &&
                this.name === breakpoint.name &&
                this.proto === breakpoint.proto &&
                this.line === breakpoint.line);
    }

}

export class Breakpoints {

    constructor() {
        this.breakpoints = [];
    }

    register(breakpoint, set) {
        const idx = this.breakpoints.findIndex(item => item.breakpoint.equals(breakpoint));
        if(idx>=0) {
            const existing = this.breakpoints[idx];
            if (set) {
                if(existing.status!=="CREATED")
                    existing.status = "DIRTY";
                existing.breakpoint = breakpoint;
            } else {
                if(existing.status==="CREATED")
                    this.breakpoints.splice(idx, 1);
                else
                    existing.status = "DELETED";
            }
        } else
            this.breakpoints.push({ status: "CREATED", breakpoint: breakpoint });
    }
}