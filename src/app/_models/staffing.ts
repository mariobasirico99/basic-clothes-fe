import { Employee } from "./employee";
import { Orders } from "./orders";

export class Staffing{
    id: Number|undefined;
    effort : Number|undefined;
    employee : Employee | undefined;
    endDate : String |undefined;
    order : Orders | undefined;
    startDate : String | undefined;
}