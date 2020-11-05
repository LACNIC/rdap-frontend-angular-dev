/**
 * Created by AAE
 */
import { Nameserver }     from './nameserver';
import { SecureDNS }     from './secureDNS';

export class ReverseDelegation {
  startAddress : string;
  endAddress : string;
  nameservers :  Nameserver[];
  secureDNS : SecureDNS;   
}