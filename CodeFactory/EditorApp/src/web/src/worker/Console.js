const log = function() {
    var e = Array.prototype.slice.call(arguments, 0);
    postMessage({
        type: "log",
        data: e
    });
};

console.error = console.warn = console.log = console.trace = log;
