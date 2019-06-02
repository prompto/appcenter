import fetcher from '../utils/Fetcher';
import DebugResponse from './DebugResponse';

export default class RemoteRequester {

    constructor(port) {
        this.port = port;
        this.url = window.location.protocol + "//" + window.location.hostname + ":" + port + "/ws/debug-request";
    }

    send(request, success, errored) {
        fetcher.postJSON(this.url, { type: request.type, object: request }, data => {
            const debugResponse = DebugResponse.parse(data);
            success(debugResponse);
        }, errored);
    }
}