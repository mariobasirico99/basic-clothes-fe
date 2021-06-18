import { Company } from './company';
import { Employee } from './employee';
import { OrdergroupsProgram } from './ordergroupsProgram';
//import { OrdergroupsProgram } from "./ordergroupsProgram";
import { Staffing } from './staffing';

export class Orders {
  id: number | undefined;
  city: string | undefined;
  company: Company | undefined;
  name: string | undefined;
  contactName: string | undefined;
  effort: number | undefined;
  endDate: string | undefined;
  responsible: Employee | undefined;
  endVisibilityDate: string | undefined;
  offertNumber: string | undefined;
  orderNumber: string | undefined;
  ordergroupProgram: OrdergroupsProgram | undefined;
  startDate: string | undefined;
  value: string | undefined;
  version: string | undefined;
}
