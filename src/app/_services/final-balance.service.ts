import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Compsuntives } from '../_models/compsuntives';
import { CompsuntiveStatus } from '../_models/compsuntiveStatus';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';

@Injectable({
  providedIn: 'root',
})
export class FinalBalanceService {
  finalBalanceStatus!: CompsuntiveStatus;

  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/compsuntives/filter`,
      {}
    );
  }
  sortBy(
    index: string,
    size: string,
    sortDirection : string,
    sortField : string,
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/compsuntives/filter?page=${index}&size=${size}&sortDirection=${sortDirection}&sortField=${sortField}`,
      {}
    );
  }
  add(body: any) {
    return this.http.post(`${environment.apiUrl}/compsuntives`, body);
  }

  update(body: any, id: number) {
    return this.http.put(`${environment.apiUrl}/compsuntives/${id}`, body);
  }
  getByManager() {
    let id = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/compsuntives/filter`,
      {
        employee: { manager: { id: id } },
      }
    );
  }
  getByEmployee() {
    let id = JSON.parse(localStorage.getItem('user')!).id;
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/compsuntives/filter`,
      {
        employee: { id: id },
      }
    );
  }
  getAllByFilterWithPagination(
    year: string | null,
    month: string | null,
    employeeId: number | null,
    index: string,
    size: string
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/compsuntives/filter?page=${index}&size=${size}`,
      {
        employee: {
          id: employeeId,
        },
        year: year ? year : null,
        month: month ? month : null,
      }
      /* {
        headers: {
          'Content-Type': 'application/x-spring-data-compact+json',
        },
      } */
    );
  }

  getCompsuntivesByPeriodByEmployee(
    employeeId: number | undefined,
    startMonth: number,
    endMonth: number,
    startYear: number,
    endYear: number
  ) {
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/compsuntives/search/findCompsuntivesByPeriodByEmployee?employeeId=${employeeId}&startMonth=${startMonth}&endMonth=${endMonth}&startYear=${startYear}&endYear=${endYear}`
    );
  }

  getFinalBalanceStatus() {
    return this.http
      .get<CompsuntiveStatus>(
        `${environment.apiUrl}/compsuntives/getCompsuntiveStatus`
      )
  }
}
