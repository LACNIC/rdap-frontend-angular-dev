/**
 * Created by Bruno on 21/06/2017.
 */
import { Link }     from './link';
import { Notice }   from './notice';
import { Event }    from './event';
import {ResponseIP} from './responseIP';
import {ResponseAutnum} from './responseAutnum';
import {Entity} from './entity';
import { Remark }   from './remark';

export class ResponseEntity {
    objectClassName : string;
    handle : string;
    vcardArray : any[];
    roles : string[];
    links : Link[];
    events : Event[];
    networks: ResponseIP[];
    autnums: ResponseAutnum[];
    entities: Entity[];
    lang : string;
    rdapConformance : string[];
    notices : Notice[];
    port43 : string;
    lacnic_legalRepresentative : string;
    remarks : Remark[];
}