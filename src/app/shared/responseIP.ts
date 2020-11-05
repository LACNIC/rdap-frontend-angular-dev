/**
 * Created by Bruno on 13/06/2017.
 */
import { Entity }   from './entity';
import { Link }     from './link';
import { Event }    from './event';
import { Notice }   from './notice';
import { Remark }   from './remark';
import { ReverseDelegation } from './reverseDelegation';
    
export class ResponseIP {
    handle : string;
    startAddress : string;
    endAddress : string;
    ipVersion : string;
    name : string;
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
    remarks : Remark[];
    parentHandle : string;
    status: string;
    lang: string;
    cidr0_cidrs: any[];
    arin_originas0_originautnums: number[];
    nicbr_autnum: number;
    lacnic_reverseDelegations: ReverseDelegation[];
    lacnic_originAutnum: string;

}