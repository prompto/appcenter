const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use("/ws", proxy('http://localhost:8888/ws'));
    app.use("/js", proxy('http://localhost:8888/js'));
};

