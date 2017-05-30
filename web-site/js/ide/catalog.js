function makeValidId(name) {
    return name.replace(/[ ]/g, "_").replace(/[\"\'\(\),]/g,"");
}

function sortBy(a, f) {
    return a.sort(function(i1,i2) {
        return (i1[f]>i2[f]) ? 1 : ((i1[f]<i2[f]) ? -1 : 0);
    });
}

function findBy(a, f, v) {
    for(var i=0;i<a.length;i++) {
        if(a[i][f] === v)
            return i;
    }
    return -1;
}

function Catalog() {
    this.attributes = [];
    this.methods = [];
    this.categories = [];
    this.enumerations = [];
    this.tests = [];
    this.resources = { html: [], javascript: [], jsx: [], css: [], json: [], xml: [], text: [], media: [], bin: [], statuses: {}};
    this.showLibraries = false;
    // for performance reasons, we only receive a delta from the ace worker
    // so can't rely on just React virtual DOM
    this.applyDelta = function(delta) {
        if (delta.removed)
            this.applyRemoved(delta.removed);
        if (delta.added) {
            const core = eval(delta.core) || false;
            this.applyAdded(delta.added, core);
        }
    };
    this.applyRemoved = function(delta) {
        if (delta.attributes)
            this.removeStuffByName(this.attributes, delta.attributes);
        if (delta.methods)
            this.removeMethods(delta.methods);
        if (delta.categories)
            this.removeStuffByName(this.categories, delta.categories);
        if (delta.enumerations)
            this.removeStuffByName(this.enumerations, delta.enumerations);
        if (delta.tests)
            this.removeStuffByName(this.tests, delta.tests);
    };
    this.applyAdded = function(delta, core) {
        if (delta.attributes)
            this.attributes = this.addStuffByName(this.attributes, delta.attributes, core);
        if (delta.methods)
            this.addMethods(delta.methods, core);
        if (delta.categories)
            this.categories = this.addStuffByName(this.categories, delta.categories, core);
        if (delta.enumerations)
            this.enumerations = this.addStuffByName(this.enumerations, delta.enumerations, core);
        if (delta.tests)
            this.tests = this.addStuffByName(this.tests, delta.tests, core);
        if (delta.resources)
            this.addResources(delta.resources);
    };
    this.removeStuffByName = function(current, removed) {
        removed.map(name => {
            const idx = findBy(current, 'name', name);
            if (idx >= 0)
                current.splice(idx, 1);
        });
    };
    this.addStuffByName = function(current, toAdd, core) {
        const added = toAdd.map(name => {
            return { name: name, core: core };
        });
        return sortBy(current.concat(added), 'name');
    };
    this.removeMethods = function(methods) {
        methods.map(method => {
            const idx1 = findBy(this.methods, 'name', method.name);
            if (idx1 >= 0) {
                const map = this.methods[idx1];
                if (map.protos.length === method.protos.length)
                    this.methods.splice(idx1, 1);
                else
                    method.protos.map(proto => {
                        const idx2 = findBy(map.protos, 'proto', proto.proto);
                        if (idx2 >= 0)
                            map.protos.splice(idx2, 1);
                    });
            }
        }, this);
    };
    this.addMethods = function(toAdd, core) {
        toAdd.forEach(method => {
            method.core = core;
        });
        const added = this.methods.concat(toAdd);
        this.methods = sortBy(added, 'name');
    };
    this.removeResources = function(removed) {
        removed.map(res => {
            const list = this.resources[res.type.toLowerCase()] || this.resources.bin;
            const idx = findBy(list, 'path', res.path);
            if (idx >= 0)
                list.splice(idx, 1);
            var id = makeValidId(res.path);
            let status = this.resources.statuses[id];
            if(status && status.editStatus==="CREATED")
                delete this.resources.statuses[id];
            else
                this.resources.statuses[id] = {editStatus: "DELETED", stuff: res };
        });
    };
    this.addResources = function(toAdd) {
        toAdd.forEach(res => {
            const list = this.resources[res.type.toLowerCase()] || this.resources.bin;
            list.push(res);
            sortBy(list, 'path');
            // create status
            var id = makeValidId(res.path);
            this.resources.statuses[id] = {editStatus: "CREATED", stuff: res };
        });
    };
    this.getResourceBody = function(res) {
        const list = this.resources[res.type.toLowerCase()] || this.resources.bin;
        const item = findBy(list, 'path', res.path);
        return list[item].body;
    };
    this.setResourceBody = function(res) {
        const list = this.resources[res.type.toLowerCase()] || this.resources.bin;
        const item = findBy(list, 'path', res.path);
        list[item].body = res.body;
        // update status
        var id = makeValidId(res.path);
        let status = this.resources.statuses[id];
        if(!status)
            this.resources.statuses[id] = {editStatus: "DIRTY", stuff: res };
        else {
            if(status.editStatus!=="CREATED")
                status.editStatus = "DIRTY";
            status.stuff.value = res;
        }
    };
    this.prepareCommit = function() {
        var edited = [];
        for (var id in this.resources.statuses) {
            if (this.statuses.hasOwnProperty(id) && this.statuses[id].editStatus !== "CLEAN")
                edited.push({type: "EditedStuff", value: this.statuses[id]});
        }
        if (edited.length)
            return edited;
        else
            return null;
    };
    return this;
}
