import AuthenticationMethod from "./AuthenticationMethod";

export default class NoAuthenticationMethod extends AuthenticationMethod {

    constructor() {
        super("NONE", "No authentication");
    }

    renderItems(dialog) {
        // nothing to do
    }
};