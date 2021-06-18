import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Company } from '../_models/company';
import { Employee } from '../_models/employee';
import { OrdergroupsProgram } from '../_models/ordergroupsProgram';
import { Orders } from '../_models/orders';
import { Programs } from '../_models/programs';
import { Role } from '../_models/role';
import { Staffing } from '../_models/staffing';
import { CompanieService } from './companie.service';
import { EmployeeService } from './employee.service';
import { OrdergroupService } from './ordergroup.service';
import { OrdersService } from './orders.service';
import { StaffingPaginationService } from './paginations/staffing-pagination.service';
import { ProgramService } from './program.service';
import { StaffingService } from './staffing.service';

@Injectable({
  providedIn: 'root',
})
export class StaffingFilterService {
  staffings!: Staffing[];
  orders!: Orders[];
  companies!: Company[];
  managers!: Employee[];
  employees!: Employee[];
  programs!: Programs[];
  orderGroupsProgram!: OrdergroupsProgram[];

  staffingsChange: Subject<Staffing[]> = new Subject<Staffing[]>();

  companieIdField!: number | null;
  managerIdField!: number | null;
  startDateRangeStart!: string | null;
  startDateRangeEnd!: string | null;
  endDateRangeStart!: string | null;
  endDateRangeEnd!: string | null;
  fullNameField!: string | null;
  orderIdField!: number | null;
  programIdField!: number | null;
  orderGroupIdField!: number | null;
  minValueField!: number | null;
  maxValueField!: number | null;

  constructor(
    private employeeService: EmployeeService,
    private companieService: CompanieService,
    private ordersService: OrdersService,
    private orderGroupService: OrdergroupService,
    private programService: ProgramService,
    private staffingService: StaffingService,
    private staffingPaginationService: StaffingPaginationService
  ) {
    this.employeeService
      .getAll('0', '10')
      .pipe(first())
      .subscribe((response) => {
        this.employees = response.content;
      });
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
      .getAll('0', '10')
      .pipe(first())
      .subscribe((response) => {
        this.orders = response.content;
      });
    this.programService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.programs = response.content;
      });
    this.orderGroupService
      .getAll('0', '10')
      .pipe(first())
      .subscribe((response) => {
        this.orderGroupsProgram = response.content;
      });
    this.staffingService
      .getAll('0', this.staffingPaginationService.pageSize)
      .pipe(first())
      .subscribe((response) => {
        this.staffings = response.content;
      });
  }

  onDataUpdate() {
    this.staffingService
      .getAllByStaffingFilterWithPagination(
        this.companieIdField,
        this.managerIdField,
        this.startDateRangeStart,
        this.startDateRangeEnd,
        this.endDateRangeStart,
        this.endDateRangeEnd,
        this.fullNameField,
        this.orderIdField,
        this.programIdField,
        this.orderGroupIdField,
        this.minValueField,
        this.maxValueField,
        '0',
        this.staffingPaginationService.pageSize
      )
      .pipe(first())
      .subscribe((response) => {
        this.staffings = response.content;
        this.staffingsChange.next(this.staffings);
        this.staffingPaginationService.changeTotalElements(
          response.totalElements
        );
      });
  }

  setStartDateRange(startDateRangeStart: string, startDateRangeEnd: string) {
    this.startDateRangeStart = startDateRangeStart;
    this.startDateRangeEnd = startDateRangeEnd;
    this.onDataUpdate();
  }

  setEndDateRange(endDateRangeStart: string, endDateRangeEnd: string) {
    this.endDateRangeStart = endDateRangeStart;
    this.endDateRangeEnd = endDateRangeEnd;
    this.onDataUpdate();
  }

  setFullName(fullName: string) {
    this.fullNameField = fullName;
    this.onDataUpdate();
  }

  setOrder(orderId: number) {
    this.orderIdField = orderId;
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

  setProgramId(programId: number) {
    this.programIdField = programId;
    this.onDataUpdate();
  }

  setOrderGroupId(orderGroupId: number) {
    this.orderGroupIdField = orderGroupId;
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
    this.companieIdField = null;
    this.managerIdField = null;
    this.startDateRangeStart = null;
    this.startDateRangeEnd = null;
    this.endDateRangeStart = null;
    this.endDateRangeEnd = null;
    this.fullNameField = null;
    this.orderIdField = null;
    this.programIdField = null;
    this.orderGroupIdField = null;
    this.minValueField = null;
    this.maxValueField = null;
    this.onDataUpdate();
  }
}
