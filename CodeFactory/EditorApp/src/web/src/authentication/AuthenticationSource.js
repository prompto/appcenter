export default class AuthenticationSource {

    constructor(id, label, help) {
        this.id = id;
        this.label = label;
        this.help = help;
        this.disabled = false;
    }

    createDefaults(dialog, forTesting) {
        // nothing to do
    }

    renderItems(dialog) {
        // nothing to do
    }

    setStateFromValue(value, state) {
        // nothing to do
    }

    setValueFromState(state, value) {
        // nothing to do
    }

}
