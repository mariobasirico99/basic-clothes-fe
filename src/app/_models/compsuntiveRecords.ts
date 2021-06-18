import { Compsuntives } from "./compsuntives";
import { Employee } from "./employee";
import { Orders } from "./orders";

export class CompsuntiveRecords{
    id : Number | undefined;
    compsuntive : Compsuntives | undefined;
    daysWorked : Number | undefined;
    eclNps : Number | undefined;
    employee : Employee | undefined;
    insertDate : String | undefined;
    notes : String | undefined;
    order : Orders | undefined;
    orderNps : Number | undefined;
}