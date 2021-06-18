import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'lodash';
import { environment } from 'src/environments/environment';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';

import { OrdergroupsProgram } from '../_models/ordergroupsProgram';
import { OrdergrService } from './ordergr.service';

@Injectable({
  providedIn: 'root',
})
export class OrdergroupService {
  constructor(private http: HttpClient, private ordergrservice : OrdergrService) {}

  getAll(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroupPrograms/filter?page=${index}&size=${size}`,      {}
    );
  }
  getAllByPagination(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroupPrograms/filter?page=${index}&size=${size}`,      {}
    );
  }

  getAllByFilterWithPagination(programId: number | null, orderGroupId: number | null,index: string,
    size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroupPrograms/filter?page=${index}&size=${size}`,
      {
        ordergroup: {
          id: orderGroupId,
        },
        program: {
          id: programId,
        },
      }
    );
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroupPrograms/filter`,
      { id: id }
    );
  }

  add(loginForm: any) {
    let program = `${environment.apiUrl}/programs/${loginForm.program}`;
    let orderg =  `${environment.apiUrl}/ordergroups/${loginForm.orderg}`;
    let ordergroupprogram = {
      ordergroup: orderg,
      program,
    };
    return this.http.post<any>(`${environment.apiUrl}/ordergroupPrograms`, ordergroupprogram);
  }
 
  update(updateForm: any) {
    let id = updateForm.id;
    let program = `${environment.apiUrl}/programs/${updateForm.program}`;
    let orderg =  `${environment.apiUrl}/ordergroups/${updateForm.orderg}`;
    let ordergroupprogram = {
      ordergroup: orderg,
      program,
    };
    return this.http.put<any>(`${environment.apiUrl}/ordergroupPrograms/${id}`,ordergroupprogram);
  }
  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(`${environment.apiUrl}/ordergroups/${id}`);
  }
}
