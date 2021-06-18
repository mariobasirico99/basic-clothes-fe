import { SpringEmbedded } from "./springEmbedded";
import { SpringLinks } from "./springLinks";
import { SpringPagination } from "./springPagination";


export class DefaultResponse {
  page!: SpringPagination;
  _embedded!: SpringEmbedded;
  _links!: SpringLinks;
}
