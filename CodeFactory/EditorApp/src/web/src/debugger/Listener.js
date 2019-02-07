import DebugEvent from './DebugEvent';

export default class Listener {

    constructor(_debugger) {
        this.debugger = _debugger
        this.webSocket = null;
    }

    connect(sessionId, success, errored) {
        const protocol = window.location.protocol.replace("http", "ws");
        const url = protocol + window.location.hostname + ":" + this.debugger.remotePort + "/ws/debug-event?sessionId=" + sessionId;
        try {
            const webSocket = new WebSocket(url);
            webSocket.onopen = event => {
                this.sessionId = sessionId;
                this.webSocket = webSocket;
                webSocket.onclose = event => this.socketClosed(event);
                webSocket.onmessage = event => this.messageReceived(event);
                success();
            }
        } catch (error) {
            errored(error);
        }
    }

    disconnect() {
        if (this.webSocket) try {
            this.webSocket.close();
        } finally {
            this.webSocket = null;
        }
    }

    socketClosed(event) {
        this.webSocket = null;
        // TODO notify debugger
    }

    messageReceived(event) {
        if(event.type==="message" && event.data) {
            const data = typeof(event.data)===typeof("") ? JSON.parse(event.data) : event.data;
            const debugEvent = DebugEvent.parse(data);
            this.debugger.debugEventReceived(debugEvent);
        }
    }


}