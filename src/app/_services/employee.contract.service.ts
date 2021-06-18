import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContractEmployee } from '../_models/contract_employee';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeContractService {
  constructor(private http: HttpClient) {}

  getAll(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/contractEmployees/filter?page=${index}&size=${size}`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-spring-data-compact+json',
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
      `${environment.apiUrl}/contractEmployees/filter?page=${index}&size=${size}&sortDirection=${sortDirection}&sortField=${sortField}`,
      {}
    );
  }
  getAllByPagination(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/contractEmployees/filter?page=${index}&size=${size}`,
      {}
      /* {
        headers: {
          'Content-Type': 'application/x-spring-data-compact+json',
        },
      } */
    );
  }

  getAllByFilterWithPagination(
    contractId: number | null,
    name: string | null,
    surname: string | null,
    index:string,
    size: string
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/contractEmployees/filter?page=${index}&size=${size}`,
      {
        contractType: {
          id: contractId,
        },
        contractEmployee: {
          name: name ? name.trim() : null,
          surname: surname ? surname.trim() : null,
        },
      }
    );
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/contractEmployees/filter`,
      { id: id }
    );
  }

  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/contractEmployees/${id}`
    );
  }

  add(addForm: any) {
    let contractEmployee = `${environment.apiUrl}/employees/${addForm.employee}`;
    let contractType = `${environment.apiUrl}/contracts/${addForm.typeContract}`;
    let startDate = '';
    let startDateTemp = addForm.firstDate.split('/').reverse().join('-');
    startDateTemp.split('-').forEach((dateItem: string) => {
      startDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    startDate = startDate.slice(0, -1);
    let endDate = '';
    let endDateTemp = addForm.secondDate.split('/').reverse().join('-');
    endDateTemp.split('-').forEach((dateItem: string) => {
      endDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    endDate = endDate.slice(0, -1);
    let ral = addForm.ral;
    let contractEmp = {
      contractType,
      contractEmployee,
      startDate,
      endDate,
      ral,
    };
    return this.http.post<any>(
      `${environment.apiUrl}/contractEmployees`,
      contractEmp
    );
  }
  update(addForm: any) {
    let contractEmployee = `${environment.apiUrl}/employees/${addForm.employee}`;
    let contractType = `${environment.apiUrl}/contracts/${addForm.typeContract}`;
    let id = addForm.id;
    let startDate = '';
    let startDateTemp = addForm.firstDate.split('/').reverse().join('-');
    startDateTemp.split('-').forEach((dateItem: string) => {
      startDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    startDate = startDate.slice(0, -1);
    let endDate = '';
    let endDateTemp = addForm.secondDate.split('/').reverse().join('-');
    endDateTemp.split('-').forEach((dateItem: string) => {
      endDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    endDate = endDate.slice(0, -1);
    let ral = addForm.ral;
    let contractEmp = {
      contractType,
      contractEmployee,
      startDate,
      endDate,
      ral,
    };
    return this.http.put<any>(
      `${environment.apiUrl}/contractEmployees/${id}`,
      contractEmp
    );
  }
}
