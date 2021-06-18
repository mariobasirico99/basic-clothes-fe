import { DefaultFilterPagination } from './defaultFilterPagination';
import { DefaultFilterSorting } from './defaultFilterSorting';

export class DefaultFilterResponse {
  content: any;
  pageable!: DefaultFilterPagination; //è l'oggetto della richiesta
  last!: boolean;
  totalElements!: number;
  totalPages!: number;
  sort!: DefaultFilterSorting;
  first!: boolean;
  number!: number;
  numberOfElements!: number;
  size!: number;
  empty!: boolean;
}
