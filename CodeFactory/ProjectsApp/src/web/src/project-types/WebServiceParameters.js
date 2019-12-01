import BatchParameters from './BatchParameters';

export default class WebServiceParameters extends BatchParameters {

    constructor(props) {
        super(props);
        this.startMethodPrefix = "start_";
        this.startMethodLabel = "Server about to start method:";
    }

}
