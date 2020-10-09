/**
 * Created by AAE on 07/10/2020.
 */

import { Link }     from './link';
import { Notice }   from './notice';

export class ResponseDomain {
    handle : string;
    ldhName : string;   
    nameServers : string[];
    links : Link[];   
    rdapConformance : string[];
    notices : Notice[];
    port43 : string;
    objectClassName : string;    
    
}