/**
 * Created by AAE
 */
import { Event }    from './event';

export class DsData {
  zone : string;
  keyTag : string;
  algorithm : string;
  digest : string;
  digestType : string;
  events : Event[];
}