import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';
import { Employee } from '../_models/employee';
import { Role } from '../_models/role';
import { param } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAll(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/employees/filter?page=${index}&size=${size}`,

      {} /*,{
      headers: {
        'Content-Type': 'application/x-spring-data-compact+json',
      },  
    } */
    );
  }

  getAllByPagination(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/employees/filter?page=${index}&size=${size}`,
      {}
      /* {
        headers: {
          'Content-Type': 'application/x-spring-data-compact+json',
        },
      } */
    );
  }
  sortBy(
    index: string,
    size: string,
    sortDirection : string,
    sortField : string,
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/employees/filter?page=${index}&size=${size}&sortDirection=${sortDirection}&sortField=${sortField}`,
      {}
    );
  }
  getAllByFilterWithPagination(
    role: Role | null,
    managerId: number | null,
    name: string | null,
    surname: string | null,
    counselorId: number | null,
    index: string,
    size: string
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/employees/filter?page=${index}&size=${size}`,
      {
        role: role,
        manager: {
          id: managerId,
        },
        counselor: {
          id: counselorId,
        },
        name: name ? name.trim() : null,
        surname: surname ? surname.trim() : null,
      }
      /* {
        headers: {
          'Content-Type': 'application/x-spring-data-compact+json',
        },
      } */
    );
  }
  
  getAllByRole(role: Role) {
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/employees/search/findEmployeesByRole?accountType=${role}`
    );
  }

  getAllByManagerId(id: number) {
    return this.http.get<Employee[]>(
      `${environment.apiUrl}/employees/search/findEmployeesByManagerId?managerId=${id}`
    );
  }

  getAllCounselors() {
    //TODO Raccolta dei counselor da BE
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/employees/filter`,
      {
        id: id,
      } /* {
      headers: {
        'Content-Type': 'application/x-spring-data-compact+json',
      },
    } */
    );
  }
  getAllByNameOrSurnameLike(name: string) {
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/employees/search/findByNameOrSurnameLike?value=${name}`
    );
  }
  
  update(loginForm: any) {
    let id = loginForm.id;
    let email = loginForm.username;
    let name = loginForm.name;
    let surname = loginForm.surname;
    let role = `${environment.apiUrl}/roles/${loginForm.typeAcc}`;
    let manager = `${environment.apiUrl}/employees/${loginForm.manager}`;
    let counselor = `${environment.apiUrl}/employees/${loginForm.counselor}`;
    let referenceArea = loginForm.areaRif;
    let personalPhone = loginForm.telPers;
    let businessPhone = loginForm.telAz;
    let emailDomain = "@elis.org"
    let telegramId= ""
    let emp = {
      email,
      name,
      emailDomain,
      surname,
      role,
      manager,
      counselor,
      referenceArea,
      personalPhone,
      businessPhone,
      telegramId,
    }
    return this.http.put<any>(`${environment.apiUrl}/employees/${id}`, emp);
  }
  add(loginForm: any) {
    let email = loginForm.username;
    let name = loginForm.name;
    let surname = loginForm.surname;
    let role = `${environment.apiUrl}/roles/${loginForm.typeAcc}`;
    let manager = `${environment.apiUrl}/employees/${loginForm.manager}`;
    let counselor = `${environment.apiUrl}/employees/${loginForm.counselor}`;
    let referenceArea = loginForm.areaRif;
    let personalPhone = loginForm.telPers;
    let businessPhone = loginForm.telAz;
    let emailDomain = "@elis.org"
    let telegramId= ""
    let emp ={
      email,
      telegramId,
      emailDomain,
      name,
      surname,
      role,
      manager,
      counselor,
      referenceArea,
      personalPhone,
      businessPhone,
    }
    return this.http.post<any>(`${environment.apiUrl}/employees`, emp);
  }

  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/employees/${id}`
    );
  }
}
