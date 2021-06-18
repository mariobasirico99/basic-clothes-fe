import { Employee } from './employee';
import { SpringLinks } from './springLinks';

export class Compsuntives {
  id: number | undefined;
  daysOffIllness: number | undefined;
  daysOther: number | undefined;
  daysTraining: number | undefined;
  elisNps: number | undefined;
  employee: Employee | undefined;
  insertDate: string | undefined;
  month: number | undefined;
  notes: string | undefined;
  year: number | undefined;
  _links!: SpringLinks;
}
