/**
 * Created by AAE on 07/10/2020.
 */

import { Link }     from './link';
import { Notice }   from './notice';
import { IpAddresses} from './IpAddresses';
import { Remark }   from './remark';
    
export class ResponseNameserver {
    ldhName : string;   
    links : Link[];   
    rdapConformance : string[];
    notices : Notice[];
    ipAddresses : IpAddresses;
    port43 : string;
    objectClassName : string;  
    remarks : Remark[];  
    
    
}