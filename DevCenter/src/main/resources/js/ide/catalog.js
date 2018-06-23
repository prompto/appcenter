function makeValidId(name) {
    return name.replace(/[ /\.]/g, "_").replace(/[\"\'\(\),]/g,"");
}

function Catalog() {
    this.attributes = [];
    this.methods = [];
    this.categories = [];
    this.enumerations = [];
    this.tests = [];
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
            this.removeEnums(this.enumerations, delta.enumerations);
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
            this.enumerations = this.addEnumsByName(this.enumerations, delta.enumerations, core);
        if (delta.tests)
            this.tests = this.addStuffByName(this.tests, delta.tests, core);
        if (delta.resources)
            this.addResources(delta.resources);
    };
    this.removeStuffByName = function(current, removed) {
        removed.map(name => {
            const idx = current.findIndex(function(a) {
                return a.name === name;
            });
            if (idx >= 0)
                current.splice(idx, 1);
        });
    };
    this.addStuffByName = function(current, toAdd, core) {
        const added = toAdd.map(name => {
            return { name: name, core: core };
        });
        current = current.concat(added);
        return current.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    };
    this.removeEnums = function(current, removed) {
        removed.map(e => {
            const idx = current.findIndex(function(a) {
                return a.name === e.name;
            });
        if (idx >= 0)
            current.splice(idx, 1);
    });
    };
    this.addEnumsByName = function(current, toAdd, core) {
        toAdd.forEach(value => {
            value.core = core;
        });
        current = current.concat(toAdd);
        return current.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    };
    this.removeMethods = function(methods) {
        methods.map(method => {
            const idx1 = this.methods.findIndex(function(a) {
                return a.name === method.name;
            } );
            if (idx1 >= 0) {
                const map = this.methods[idx1];
                if (map.protos.length === method.protos.length)
                    this.methods.splice(idx1, 1);
                else
                    method.protos.map(proto => {
                        const idx2 = map.protos.findIndex(function(a) { return a.proto === proto.proto; });
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
        this.methods = added.sort(function(a,b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });
    };
    this.mapTextMimeTypeToList = function() {
        return {
            "text/page": this.resources.page,
            "text/html": this.resources.html,
            "text/javascript": this.resources.js,
            "text/babel": this.resources.jsx,
            "text/css": this.resources.css,
            "text/json": this.resources.json,
            "text/xml": this.resources.xml,
            "text/yaml": this.resources.yaml,
            "text/plain": this.resources.text
        };
    };
    this.listFromResource = function(res) {
        var mimeType = res.value.mimeType;
        if(mimeType.startsWith("text/")) {
            return this.textMimeTypeToList[mimeType];
        } else if(mimeType.startsWith("image/")) {
            return this.resources.image;
        } else if(mimeType.startsWith("audio/")) {
            return this.resources.audio;
        } else if(mimeType.startsWith("video/")) {
            return this.resources.video;
        } else {
            return this.resources.binary;
        }
    };
    this.clearResources = function() {
        this.resources = { page: [], html: [], js: [], jsx: [], css: [], json: [], xml: [], yaml: [], text: [], image: [], audio: [], video: [], binary: [], statuses: {}};
        // refresh mapping from mime -> instance
        this.textMimeTypeToList = this.mapTextMimeTypeToList();
    };
    this.removeResources = function(removed) {
        removed.map(res => {
            const list = this.listFromResource(res);
            const idx = list.findIndex( function(a) { return a.value.name === res.value.name; });
            if (idx >= 0)
                list.splice(idx, 1);
            const id = makeValidId(res.value.name);
            const status = this.resources.statuses[id];
            if(status && status.editStatus==="CREATED")
                delete this.resources.statuses[id];
            else
                this.resources.statuses[id] = {editStatus: "DELETED", stuff: res };
        });
    };
    this.renameResource = function(res, newName) {
        const oldName = res.value.name;
        const oldid = makeValidId(oldName);
        const oldstatus = this.resources.statuses[oldid];
        res.value.name = newName;
        const newid = makeValidId(newName);
        delete this.resources.statuses[oldid];
        if(oldstatus && oldstatus.editStatus==="CREATED")
            this.resources.statuses[newid] = {editStatus: "CREATED", stuff: res};
        else
            this.resources.statuses[newid] = {editStatus: "DIRTY", stuff: res };
        const list = this.listFromResource(res);
        list.sort(function(a,b) { return a.value.name < b.value.name ? -1 : a.value.name > b.value.name ? 1 : 0; });
        return res;
    };
    this.addResources = function(toAdd) {
        toAdd.forEach(res => {
            const list = this.listFromResource(res);
            list.push(res);
            list.sort(function(a,b) { return a.value.name < b.value.name ? -1 : a.value.name > b.value.name ? 1 : 0; });
            // create status
            var id = makeValidId(res.value.name);
            this.resources.statuses[id] = {editStatus: "CREATED", stuff: res };
        });
    };
    this.markResources = function(toMark, status) {
        toMark.forEach(res => {
            var id = makeValidId(res.value.name);
            this.resources.statuses[id].editStatus = status;
        });
    };
    this.resourceFromContent = function(content) {
        const list = this.resources[content.type.toLowerCase()];
        const item = list.findIndex(function(a) { return a.value.name === content.name; });
        return list[item];
    };
    this.loadResourceBody = function(content) {
        const res = this.resourceFromContent(content);
        content.body = res.value.body;
        if(res.value.dialect)
            content.dialect = res.value.dialect;
    };
    this.setResourceBody = function(content) {
        const res = this.resourceFromContent(content);
        if(res.value.body === content.body)
            return;
        res.value.body = content.body;
        // update status
        var id = makeValidId(res.value.name);
        let status = this.resources.statuses[id];
        if(!status)
            this.resources.statuses[id] = {editStatus: "DIRTY", stuff: res };
        else {
            if(status.editStatus!=="CREATED")
                status.editStatus = "DIRTY";
            status.stuff = res;
        }
    };
    this.prepareCommit = function() {
        var statuses = this.resources.statuses;
        var edited = [];
        for (var id in statuses) {
            if (statuses.hasOwnProperty(id) && statuses[id].editStatus !== "CLEAN")
                edited.push({type: "EditedStuff", value: statuses[id]});
        }
        if (edited.length)
            return edited;
        else
            return null;
    };

    // clear
    this.clearResources();
    return this;
}
