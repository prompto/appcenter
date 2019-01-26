import AuthenticationMethod from './AuthenticationMethod';

export default class BasicAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("BASIC", "Browser built-in method (BASIC)");
    }
};