import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../_models/company';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';

@Injectable({
  providedIn: 'root',
})
export class CompanieService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.post<DefaultFilterResponse>(`${environment.apiUrl}/companies/filter`,{});
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(`${environment.apiUrl}/companies/filter`,{"id":id},
    {
      headers: {
        'Content-Type': 'application/x-spring-data-compact+json',
      },
    });
  }
  findByCompanyNameLike(name: string) {
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/companies/search/findByCompanyNameLike?value=${name}`
    );
  }
  add(addForm: any) {
    return this.http.post<any>(`${environment.apiUrl}/companies`, addForm)
  }
  update(updateForm: any) {
    let id = updateForm.id;
    let companyName = updateForm.companyName;
    return this.http.put<any>(`${environment.apiUrl}/companies/${id}`, {companyName})
  }
  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/companies/${id}`
    );
  }
}
