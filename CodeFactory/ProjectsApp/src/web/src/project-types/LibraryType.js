import ProjectType from './ProjectType';
import LibraryPng from "../img/library.png";

export default class LibraryType extends ProjectType {

    constructor() {
        super("Library", "Library", LibraryPng, "createLibrary");
    }
}
