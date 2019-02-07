import Listener from './Listener';

export default class Debugger {

    static generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    constructor() {
        this.remotePort = null;
        this.sessionId = null;
        this.listener = null;
    }

    disconnect() {
        if(this.listener)
            this.listener.disconnect();
        this.remotePort = null;
        this.sessionId = null;
    }

    connect(port, success, errored) {
        this.disconnect();
        this.remotePort = port;
        const sessionId = Debugger.generateSessionId();
        const listener = new Listener(this);
        listener.connect(sessionId, () => {
            this.sessionId = sessionId;
            this.listener = listener;
            success();
        }, errored);
    }

    debugEventReceived(event) {
        // TODO
    }


}