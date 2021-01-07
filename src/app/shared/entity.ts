import { Link } from './link';
import { Event }    from './event';

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
    events : Event[];
}