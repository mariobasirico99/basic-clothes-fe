import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderPaginationService {
  pageIndex: string = '0';
  pageSize: string = '10';
  totalElements: number = 0;

  totalElementsChange: Subject<number> = new Subject<number>();

  constructor() {}

  changePageIndex(index: string) {
    this.pageIndex = index;
  }

  changePageSize(size: string) {
    this.pageSize = size;
  }

  changeTotalElements(total: number) {
    console.log("orders", total);
    this.totalElements = total;
    this.totalElementsChange.next(total);
  }
}
