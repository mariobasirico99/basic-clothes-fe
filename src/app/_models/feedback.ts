import { User } from "./user";

export class Feedback {
    id: number | undefined;
    descrizione: string | undefined;
    voto: number | undefined;
    user: User | undefined;
    scrittore: User | undefined;
  }