import NoAuthenticationMethod from './NoAuthenticationMethod';
import BasicAuthenticationMethod from './BasicAuthenticationMethod';
import FormAuthenticationMethod from './FormAuthenticationMethod';
import ClientCertAuthenticationMethod from './ClientCertAuthenticationMethod';

export const ALL_AUTH_METHODS = [
    new NoAuthenticationMethod(),
    new BasicAuthenticationMethod(),
    new FormAuthenticationMethod(),
    new ClientCertAuthenticationMethod()
];


export const ID_TO_AUTH_METHOD_MAP = {};

ALL_AUTH_METHODS.forEach(t => ID_TO_AUTH_METHOD_MAP[t.id] = t);