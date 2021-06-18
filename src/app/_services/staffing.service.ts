import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';
import { Staffing } from '../_models/staffing';

@Injectable({
  providedIn: 'root',
})
export class StaffingService {
  constructor(private http: HttpClient) {}

  getAll(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/staffings/filter?page=${index}&size=${size}`,
      {}
    );
  }

  getAllByPagination(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/staffings/filter?page=${index}&size=${size}`,
      {}
    );
  }

  getAllByStaffingFilterWithPagination(
    companyIdField: number | null,
    managerIdField: number | null,
    startDateRangeStart: string | null,
    startDateRangeEnd: string | null,
    endDateRangeStart: string | null,
    endDateRangeEnd: string | null,
    fullNameField: string | null,
    orderIdField: number | null,
    programIdField: number | null,
    orderGroupIdField: number | null,
    minValueField: number | null,
    maxValueField: number | null,
    index: string,
    size: string,
  ) {
    let nameField = null;
    let surnameField = null;
    if (fullNameField) {
      let nameSections = fullNameField!.split(' ');
      surnameField = nameSections[nameSections.length - 1];
      nameField = fullNameField!.replace(
        nameSections[nameSections.length - 1],
        ''
      );
    }
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/staffings/filter?page=${index}&size=${size}`,
      {
        employee: {
          name: nameField ? nameField.trim() : null,
          surname: surnameField ? surnameField.trim() : null,
        },
        order: {
          id: orderIdField,
          company: {
            id: companyIdField,
          },
          responsible: {
            id: managerIdField,
          },
          ordergroupProgram: {
            ordergroup: {
              id: orderGroupIdField,
            },
            program: {
              id: programIdField,
            },
          },
        },
      }
    );
  }
  sortBy(
    index: string,
    size: string,
    sortDirection : string,
    sortField : string,
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/staffings/filter?page=${index}&size=${size}&sortDirection=${sortDirection}&sortField=${sortField}`,
      {}
    );
  }
  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/staffings/filter`,
      { id: id }
    );
  }

  getByEmployeeId(id: number) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/staffings/filter`,
      {
        employee: { id: id },
      }
    );
  }
  getRecentStaffing(id: number){
    return this.http.get<Staffing>(
      `${environment.apiUrl}/staffings/search/findRecentStaffingByEmployee?employeeId=${id}`
    );
  }
  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/staffings/${id}`
    );
  }
  add(addForm: any) {
    let employee = `${environment.apiUrl}/employees/${addForm.employee}`;
    let order = `${environment.apiUrl}/orders/${addForm.order}`;
    let startDate = '';
    let startDateTemp = addForm.startDate.split('/').reverse().join('-');
    startDateTemp.split('-').forEach((dateItem: string) => {
      startDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    startDate = startDate.slice(0, -1);
    let endDate = '';
    let endDateTemp = addForm.endDate.split('/').reverse().join('-');
    endDateTemp.split('-').forEach((dateItem: string) => {
      endDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    endDate = endDate.slice(0, -1);
    let effort = addForm.effort;

    let staffing = {
      employee,
      order,
      startDate,
      endDate,
      effort,
    };
    return this.http.post<any>(`${environment.apiUrl}/staffings`, staffing);
  }
  update(addForm: any) {
    let id = addForm.id;
    let employee = `${environment.apiUrl}/employees/${addForm.employee}`;
    let order = `${environment.apiUrl}/orders/${addForm.order}`;
    let startDate = '';
    let startDateTemp = addForm.startDate.split('/').reverse().join('-');
    startDateTemp.split('-').forEach((dateItem: string) => {
      startDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    startDate = startDate.slice(0, -1);
    let endDate = '';
    let endDateTemp = addForm.endDate.split('/').reverse().join('-');
    endDateTemp.split('-').forEach((dateItem: string) => {
      endDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    endDate = endDate.slice(0, -1);
    let effort = addForm.effort;

    let staffing = {
      employee,
      order,
      startDate,
      endDate,
      effort,
    };
    return this.http.put<any>(
      `${environment.apiUrl}/staffings/${id}`,
      staffing
    );
  }
}
