import AuthenticationSource from "./AuthenticationSource";

export default class PasswordIsLoginAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("TEST", "Password is login - test only", "Any login is valid, password is equal to login - for test only.");
    }

}
