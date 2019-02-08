import axios from 'axios';
import DebugResponse from './DebugResponse';

export default class RemoteRequester {

    constructor(port) {
        this.url = window.location.protocol + "//" + window.location.hostname + ":" + port + "/ws/debug-request";
    }

    send(request, success, errored) {
        axios.post(this.url, { type: request.type, object: request } )
            .then(response => {
                const data = typeof(response.data)===typeof("") ? JSON.parse(response.data) : response.data;
                const debugResponse = DebugResponse.parse(data);
                success(debugResponse);
            })
            .catch(errored);

    }
}