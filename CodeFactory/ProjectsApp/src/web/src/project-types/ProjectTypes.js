import WebServiceType from './WebServiceType';
import WebLibraryType from './WebLibraryType';
import WebSiteType from './WebSiteType';
import LibraryType from './LibraryType';
import ThesaurusType from './ThesaurusType';
import ScriptType from './ScriptType';
import BatchType from './BatchType';

export const ALL_PROJECT_TYPES = [new WebSiteType(), new WebServiceType(), new WebLibraryType(), new LibraryType(), new BatchType(), new ScriptType()];
export const WEB_PROJECT_TYPES = ALL_PROJECT_TYPES.slice(0, 3);
export const CODE_PROJECT_TYPES = ALL_PROJECT_TYPES.slice(3, 6);
export const ID_TO_TYPE_MAP = {};

ALL_PROJECT_TYPES.forEach(t => ID_TO_TYPE_MAP[t.id] = t);

const thesaurus = new ThesaurusType();
ID_TO_TYPE_MAP[thesaurus.id] = thesaurus;
