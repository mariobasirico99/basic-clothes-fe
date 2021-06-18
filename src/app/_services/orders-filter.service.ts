import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../_models/company';
import { Employee } from '../_models/employee';
import { Orders } from '../_models/orders';
import { Role } from '../_models/role';
import { CompanieService } from './companie.service';
import { EmployeeService } from './employee.service';
import { OrdersService } from './orders.service';
import { OrderPaginationService } from './paginations/order-pagination.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersFilterService {
  orders!: Orders[];
  companies!: Company[];
  managers!: Employee[];

  ordersChange: Subject<Orders[]> = new Subject<Orders[]>();

  projectIdField!: number | null;
  companieIdField!: number | null;
  managerIdField!: number | null;
  endDateRangeStart!: string | null;
  endDateRangeEnd!: string | null;
  minValueField: number | null = 0;
  maxValueField: number | null = 0;

  constructor(
    private employeeService: EmployeeService,
    private companieService: CompanieService,
    private ordersService: OrdersService,
    private orderPaginationService: OrderPaginationService
  ) {
    this.employeeService
      .getAllByRole(Role.Manager)
      .pipe(first())
      .subscribe((response) => {
        this.managers = response._embedded.employees;
      });
    this.companieService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.companies = response.content;
      });
    this.ordersService
      .getAll('0', this.orderPaginationService.pageSize)
      .pipe(first())
      .subscribe((response) => {
        this.orders = response.content;
        this.orderPaginationService.changeTotalElements(response.totalElements);
      });
  }

  onDataUpdate() {
    this.ordersService
      .getAllByFilterWithPagination(
        this.projectIdField,
        this.managerIdField,
        this.companieIdField,
        this.endDateRangeStart,
        this.endDateRangeEnd,
        this.minValueField!.toString(),
        this.maxValueField!.toString(),
        '0',
        this.orderPaginationService.pageSize
      )
      .pipe(first())
      .subscribe((response) => {
        this.orders = response.content;
        this.ordersChange.next(this.orders);
        this.orderPaginationService.changeTotalElements(response.totalElements);
      });
  }

  setEndDateRange(endDateRangeStart: string, endDateRangeEnd: string) {
    this.endDateRangeStart = endDateRangeStart;
    this.endDateRangeEnd = endDateRangeEnd;
    this.onDataUpdate();
  }

  setOrder(orderId: number) {
    this.projectIdField = orderId;
    this.onDataUpdate();
  }

  setCompanieId(companieId: number) {
    this.companieIdField = companieId;
    this.onDataUpdate();
  }

  setManagerId(managerId: number) {
    this.managerIdField = managerId;
    this.onDataUpdate();
  }

  setMinValue(minValue: number) {
    this.minValueField = minValue;
    this.onDataUpdate;
  }

  setMaxValue(maxValue: number) {
    this.maxValueField = maxValue;
    this.onDataUpdate;
  }

  clearFilters() {
    this.projectIdField = null;
    this.companieIdField = null;
    this.managerIdField = null;
    this.endDateRangeStart = null;
    this.endDateRangeEnd = null;
    /* this.minValueField = null;
    this.maxValueField = null; */
    this.onDataUpdate();
  }
}
