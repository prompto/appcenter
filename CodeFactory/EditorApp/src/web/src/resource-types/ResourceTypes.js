import PromptoType from "./PromptoType";
import ResourceType from './ResourceType';
import PageType from "./PageType";
import HtmlType from "./HtmlType";
import JavascriptType from "./JavascriptType";
import BabelType from "./BabelType";
import StylesheetType from "./StylesheetType";
import JsonType from "./JsonType";
import XmlType from "./XmlType";
import YamlType from "./YamlType";
import TextType from "./TextType";
import ImageType from "./ImageType";
import AudioType from "./AudioType";
import VideoType from "./VideoType";
import OtherType from "./OtherType";
import TextResourceType from "./TextResourceType";

export const ALL_ELEMENT_TYPES = [
    new PromptoType(),
    new PageType(),
    new HtmlType(),
    new JavascriptType(),
    new BabelType(),
    new StylesheetType(),
    new JsonType(),
    new XmlType(),
    new YamlType(),
    new TextType(),
    new ImageType(),
    new AudioType(),
    new VideoType(),
    new OtherType() ];

export const ID_TO_TYPE_MAP = {};

ALL_ELEMENT_TYPES.forEach(t => ID_TO_TYPE_MAP[t.id] = t);

export const ALL_RESOURCE_TYPES = ALL_ELEMENT_TYPES.filter(t => t instanceof ResourceType);
export const TEXT_RESOURCE_TYPES = ALL_ELEMENT_TYPES.filter(t => t instanceof TextResourceType);
