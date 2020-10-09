/**
 * Created by Bruno on 13/06/2017.
 */
import { Entity }   from './entity';
import { Link }     from './link';
import { Event }    from './event';
import { Notice }   from './notice';
    
export class ResponseAutnum {
    handle : string;
    type : string;
    country : string;
    entities : Entity[];
    links : Link[];
    events : Event[];
    rdapConformance : string[];
    notices : Notice[];
    port43 : string;
    objectClassName : string;
    lacnic_legalRepresentative : string;
    
}