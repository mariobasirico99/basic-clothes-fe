import { Byte } from "@angular/compiler/src/util";
import { SafeResourceUrl } from "@angular/platform-browser";
import { User } from "./user";

export class Article{
    [x: string]: any;
  id: number | undefined;
  colore: string|undefined;
  id_utente: number | undefined;
  marca: string | undefined;
  nome: string| undefined;
  picture: string | undefined;
  image: SafeResourceUrl | undefined;
  prezzo: number |undefined;
  taglia: string| undefined;
  tipo: string| undefined;
  venduto: boolean | undefined;
    article: any;
}