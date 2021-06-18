import { Company } from './company';
import { Compsuntives } from './compsuntives';
import { ContractEmployee } from './contract_employee';
import { Employee } from './employee';
import { Ordergroups } from './ordergroups';
import { Orders } from './orders';
import { Programs } from './programs';

export class SpringEmbedded {
  programs!: Programs[];
  employees!: Employee[];
  orders!: Orders[];
  contractEmployees!: ContractEmployee[];
  content!: any;
  companies!: Company[];
  compsuntives!: Compsuntives[];
  ordergroups!: Ordergroups[];
}