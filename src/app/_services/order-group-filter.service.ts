import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { OrdergroupsProgram } from '../_models/ordergroupsProgram';
import { Programs } from '../_models/programs';
import { OrdergroupService } from './ordergroup.service';
import { OrderGroupPaginationService } from './paginations/order-group-pagination.service';
import { ProgramService } from './program.service';

@Injectable({
  providedIn: 'root',
})
export class OrderGroupFilterService {
  ordergroupsProgram!: OrdergroupsProgram[];
  programs!: Programs[];

  orderGroupsProgramChange: Subject<OrdergroupsProgram[]> = new Subject<
    OrdergroupsProgram[]
  >();

  programIdField!: number | null;
  orderGroupIdField!: number | null;

  constructor(
    private ordergroupsProgramService: OrdergroupService,
    private programService: ProgramService,
    private orderGroupPaginationService: OrderGroupPaginationService
  ) {
    this.ordergroupsProgramService
      .getAll('0', this.orderGroupPaginationService.pageSize)
      .pipe(first())
      .subscribe((response) => {
        this.ordergroupsProgram = response.content;
      });

    this.programService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.programs = response.content;
      });
  }

  onDataUpdate() {
    this.ordergroupsProgramService
      .getAllByFilterWithPagination(
        this.programIdField,
        this.orderGroupIdField,
        '0',
        this.orderGroupPaginationService.pageSize
      )
      .pipe(first())
      .subscribe((response) => {
        this.ordergroupsProgram = response.content;
        this.orderGroupsProgramChange.next(this.ordergroupsProgram);
        this.orderGroupPaginationService.changeTotalElements(
          response.totalElements
        );
      });
  }

  setProgramId(programId: number) {
    this.programIdField = programId;
    this.onDataUpdate();
  }

  setOrderGroupId(orderGroupId: number) {
    this.orderGroupIdField = orderGroupId;
    this.onDataUpdate();
  }

  clearFilters() {
    this.orderGroupIdField = null;
    this.programIdField = null;
    this.onDataUpdate();
  }
}
