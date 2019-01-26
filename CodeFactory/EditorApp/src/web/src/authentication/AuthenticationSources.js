import DataStoreAuthenticationSource from './DataStoreAuthenticationSource';
import LDAPAuthenticationSource from './LDAPAuthenticationSource';
import PasswordIsLoginAuthenticationSource from './PasswordIsLoginAuthenticationSource';


export const ALL_AUTH_SOURCES = [
    new DataStoreAuthenticationSource(),
    new LDAPAuthenticationSource(),
    new PasswordIsLoginAuthenticationSource()
];


export const ID_TO_AUTH_SOURCE_MAP = {};

ALL_AUTH_SOURCES.forEach(t => ID_TO_AUTH_SOURCE_MAP[t.id] = t);
