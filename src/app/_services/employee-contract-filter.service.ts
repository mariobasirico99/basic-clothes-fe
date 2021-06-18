import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Contract } from '../_models/contract';
import { ContractEmployee } from '../_models/contract_employee';
import { Employee } from '../_models/employee';
import { ContractService } from './contract.service';
import { EmployeeContractService } from './employee.contract.service';
import { EmployeeService } from './employee.service';
import { EmployeeContractPaginationService } from './paginations/employee-contract-pagination.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeContractFilterService {
  contractEmployees!: ContractEmployee[];
  employees!: Employee[];
  contracts!: Contract[];

  contractEmployeesChange: Subject<ContractEmployee[]> = new Subject<
    ContractEmployee[]
  >();

  nameField!: string | null;
  lastNameField!: string | null;
  contractIdField!: number | null;
  startDateRangeStart!: string | null;
  startDateRangeEnd!: string | null;
  endDateRangeStart!: string | null;
  endDateRangeEnd!: string | null;

  constructor(
    private contractService: ContractService,
    private employeeContractService: EmployeeContractService,
    private employeeContractPaginationService: EmployeeContractPaginationService
  ) {
    this.employeeContractService
      .getAll('0', this.employeeContractPaginationService.pageSize)
      .pipe(first())
      .subscribe((response) => {
        this.contractEmployees = response.content;
        this.employeeContractPaginationService.changeTotalElements(
          response.totalElements
        );
      });
    this.contractService
      .getAll()
      .pipe(first())
      .subscribe((response) => {
        this.contracts = response.content;
      });
  }

  onDataUpdate() {
    this.employeeContractService
      .getAllByFilterWithPagination(
        this.contractIdField,
        this.nameField,
        this.lastNameField,
        '0',
        this.employeeContractPaginationService.pageSize
      )
      .pipe(first())
      .subscribe((response) => {
        this.contractEmployees = response.content;
        this.contractEmployeesChange.next(this.contractEmployees);
        this.employeeContractPaginationService.changeTotalElements(
          response.totalElements
        );
      });
  }

  setName(name: string) {
    this.nameField = name;
    this.onDataUpdate();
  }

  setLastName(lastName: string) {
    this.lastNameField = lastName;
    this.onDataUpdate();
  }

  setContractId(contractId: number) {
    this.contractIdField = contractId;
    this.onDataUpdate();
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

  clearFilters() {
    this.nameField = null;
    this.lastNameField = null;
    this.contractIdField = null;
    this.startDateRangeEnd = null;
    this.endDateRangeEnd = null;
    this.startDateRangeStart = null;
    this.startDateRangeEnd = null;
    this.onDataUpdate();
  }
}
