/**
 * Created by AAE on 07/10/2020.
 */

import { Notice }   from './notice';
import { DomainSearch } from './domainSearch';

export class RespDomainSearch {
    domainSearchResults : DomainSearch[];    
    rdapConformance : string[];
    notices : Notice[];
    port43 : string;
}