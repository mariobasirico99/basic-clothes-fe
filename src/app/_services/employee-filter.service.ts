import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import * as _ from 'lodash';
import { Employee } from '../_models/employee';
import { Role } from '../_models/role';
import { EmployeeService } from './employee.service';
import { EmployeePaginationService } from './paginations/employee-pagination.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFilterService {
  employees!: Employee[];
  roles = Role;
  managers!: Employee[];
  counselors!: Employee[];

  employeesChange: Subject<Employee[]> = new Subject<Employee[]>();

  nameField!: string | null;
  surnameField!: string | null;
  roleField!: Role | null;
  managerIdField!: number | null;
  counselorIdField!: number | null;

  constructor(
    private employeeService: EmployeeService,
    private employeePaginationService: EmployeePaginationService
  ) {
    this.employeeService
      .getAllByRole(Role.Manager)
      .pipe(first())
      .subscribe((response) => {
        this.managers = response._embedded.employees;
      });
    this.employeeService
      .getAll('0', this.employeePaginationService.pageSize)
      .pipe(first())
      .subscribe((response) => {
        this.employees = response.content;
        this.counselors = response.content;
      });
  }

  onDataUpdate() {
    this.employeeService
      .getAllByFilterWithPagination(
        this.roleField,
        this.managerIdField,
        this.nameField,
        this.surnameField,
        this.counselorIdField,
        '0',
        this.employeePaginationService.pageSize
      )
      .pipe(first())
      .subscribe((response) => {
        this.employees = response.content;
        this.employeesChange.next(this.employees);
        this.employeePaginationService.changeTotalElements(
          response.totalElements
        );
      });
  }

  setFullName(fullName: string) {
    let nameSections = fullName.split(' ');
    this.surnameField = nameSections[nameSections.length - 1];
    this.nameField = fullName.replace(
      nameSections[nameSections.length - 1],
      ''
    );
    this.onDataUpdate();
  }

  setRole(role: Role) {
    this.roleField = role;
    this.onDataUpdate();
  }

  setManagerId(managerId: number) {
    this.managerIdField = managerId;
    this.onDataUpdate();
  }

  setCounselorId(counselorId: number) {
    this.counselorIdField = counselorId;
    this.onDataUpdate();
  }

  clearFilters() {
    this.counselorIdField = null;
    this.managerIdField = null;
    this.nameField = null;
    this.roleField = null;
    this.surnameField = null;
    this.onDataUpdate();
  }
}
