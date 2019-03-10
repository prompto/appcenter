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
        this.prototype = proto;
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

    toString() {
        return this.name + (this.proto ? "(" + this.proto + ")" : "") + " - line " + this.line;
    }

    toContent() {
        return { type: "Prompto", subType: this.type, name: this.name, proto: this.proto };
    }

    matchesContent(content) {
        return content.subType === this.type && content.name === this.name && content.proto === this.proto;
    }

    toStorable(projectId) {
        const storable = {
            type: "LineBreakpoint",
            value: {
                module: { type: "Module", value: { dbId: projectId.toString() } },
                active: { type: "Boolean", value: this.active },
                type: { type: "Text", value: this.type },
                name: { type: "Text", value: this.name },
                line: { type: "Integer", value: this.line }
            }
        }
        if(this.prototype)
            storable.value.prototype = { type: "Text", value: this.prototype };
        if(this.dbId)
            storable.value.dbId = this.dbId;
        return storable;
    }

    fromStored(stored) {
        this.dbId = stored.dbId;
        this.active = stored.active;
        this.type = stored.type;
        this.name = stored.name;
        this.prototype = stored.prototype;
        this.line = stored.line;
        return this;
    }

}

// server side attribute is 'prototype'
Object.defineProperty(LineBreakpoint.prototype, "proto", {
    get: function() {
        return this.prototype;
    },
    set: function(value) {
        this.prototype = value;
    },
});

export class Breakpoints {

    constructor(data) {
        this.breakpoints = data && data.value ? data.value.map(b=>{
            // eslint-disable-next-line
            const type = eval(b.type);
            const breakpoint = new type();
            return { status: "CLEAN", breakpoint: breakpoint.fromStored(b.value)};
        }) : [];
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

    toStorable(projectId) {
        return this.edited().map(b => {
            return {
                type: "EditedBreakpoint",
                value: {
                    editStatus: {type: "EditStatus", value: b.status},
                    breakpoint: b.breakpoint.toStorable(projectId)
                }
            };
        });
    }

    all() {
        return this.breakpoints.map(b => b.breakpoint);
    }

    living() {
        return this.breakpoints.filter(b => b.status!=="DELETED").map(b => b.breakpoint);
    }

    edited() {
        return this.breakpoints.filter(b => b.status!=="CLEAN");
    }

    matchingContent(content) {
        return this.living().filter(b => b.matchesContent(content));
    }
}
