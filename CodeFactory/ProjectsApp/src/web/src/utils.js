exports.identifierize = function(prefix, name) {
    return ((prefix || "") + (name || "")).replace(/[^a-zA-Z0-9_]/g, "_");
}