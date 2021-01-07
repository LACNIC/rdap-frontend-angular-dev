/**
 * Created by AAE on 07/10/2020.
 */

import { Notice }   from './notice';
import { NameserverSearch } from './nameserverSearch';

export class RespNameserverSearch {
  nameserverSearchResults : NameserverSearch[];    
  rdapConformance : string[];
  notices : Notice[];
  port43 : string;
}