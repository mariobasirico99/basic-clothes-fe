import { Contract } from './contract';
import { Employee } from './employee';

export class ContractEmployee {
  id: Number | undefined;
  contractEmployee: Employee | undefined;
  contract: Contract | undefined;
  end: String | undefined;
  start: String | undefined;
  ral: string | undefined;
}
