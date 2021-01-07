/**
 * Created by AAE on 07/10/2020.
 */

import { Notice }   from './notice';
import { EntitySearch } from './entitySearch';

export class RespEntitySearch {
  entities : EntitySearch[];    
  rdapConformance : string[];
  notices : Notice[];
  port43 : string;
}