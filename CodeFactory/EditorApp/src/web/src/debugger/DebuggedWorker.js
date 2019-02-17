export default class DebuggedWorker {

    constructor(data) {
        this.workerId = data.workerId;
        this.name = data.name;
        this.state = data.state;
    }
}