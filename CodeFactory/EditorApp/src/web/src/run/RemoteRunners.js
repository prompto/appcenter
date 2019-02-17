import RemoteInterpreter from './RemoteInterpreter';
import RemoteExecutor from './RemoteExecutor';

export default class Runners {

    static types = {
        SI: RemoteInterpreter,
        SE: RemoteExecutor
    };

    static forMode(mode) {
        const type = Runners.types[mode];
        return type ? new type() : null;
    }

}
