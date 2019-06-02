import AuthenticationMethod from './AuthenticationMethod';

export default class ClientCertAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("ClientCertAuthenticationMethod", "Client certificate (CLIENT-CERT) - not implemented yet");
        this.disabled = true;
    }

};