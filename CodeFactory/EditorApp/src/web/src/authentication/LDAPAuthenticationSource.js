import AuthenticationSource from './AuthenticationSource';

export default class LDAPAuthenticationSource extends AuthenticationSource {

    constructor() {
        super("LDAPAuthenticationSource", "LDAP - not implemented yet", "Login and password are checked using LDAP.");
        this.disabled = true;
    }

}