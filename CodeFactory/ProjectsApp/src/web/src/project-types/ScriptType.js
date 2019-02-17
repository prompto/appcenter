import ProjectType from './ProjectType';
import ScriptJpg from "../img/script.jpg";

export default class ScriptType extends ProjectType {

    constructor() {
        super("Script", "Script", ScriptJpg, "createScript");
        this.disabled = true;
    }
}
