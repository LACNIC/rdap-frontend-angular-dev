import { Link } from './link';

export class Entity {
    objectClassName : string;
    handle : string;
    vcardArray : any[];
    roles : string[];
    autnums : string[];
    networks : string[];
    links : Link[];
    lang : string;
    entities : Entity[];
}