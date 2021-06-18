import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';

@Injectable({
  providedIn: 'root'
})
export class OrdergrService {
  constructor(private http: HttpClient) {}

  getAll(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroups/filter?page=${index}&size=${size}`,      {}
    );
  }
  getAllByPagination(index: string, size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroups/filter?page=${index}&size=${size}`,      {}
    );
  }

  getAllByFilterWithPagination(code: string | null,index: string,
    size: string) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroups/filter?page=${index}&size=${size}`,
      {
        code:code
      }
    );
  }
  getAllByCodeLike(code: string) {
    console.log(this.http.get<DefaultResponse>(
      `${environment.apiUrl}/ordergroups/search/findByCodeLike?code=${code}`
    ))
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/ordergroups/search/findByCodeLike?code=${code}`
    );
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/ordergroups/filter`,
      { id: id }
    );
  }

  add(obj: any) {
    let code = obj.code;
    let description = obj.description;
    let fiscalYear = obj.fiscalYear;
    return this.http.post<any>(`${environment.apiUrl}/ordergroups`,{code,description,fiscalYear});
  }
  update(obj: any) {
    let id = obj.id;
    let code = obj.code;
    let description = obj.description;
    let fiscalYear = obj.fiscalYear;
    return this.http.put<any>(`${environment.apiUrl}/ordergroups/${id}`,{code,description,fiscalYear});

  }
  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(`${environment.apiUrl}/ordergroups/${id}`);
  }
}
