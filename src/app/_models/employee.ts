import { EmployeeRole } from './employeeRole';
import { Staffing } from './staffing';

export class Employee {
  id: Number | undefined;
  name: String | undefined;
  surname: String | undefined;
  role: EmployeeRole | undefined;
  manager: Employee[] | undefined;
  referenceArea: String | undefined;
  counselor: Employee[] | undefined;
  email: String | undefined;
  emailDomain: String | undefined;
  fullName: String | undefined;
  personalPhone: String | undefined;
  businessPhone: String | undefined;
  telegramId: String | undefined;
  staffingList!: Staffing[];
}
