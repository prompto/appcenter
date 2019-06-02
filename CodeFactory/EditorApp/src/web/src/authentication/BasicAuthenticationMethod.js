import AuthenticationMethod from './AuthenticationMethod';

export default class BasicAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("BasicAuthenticationMethod", "Browser built-in method (BASIC)");
    }
};