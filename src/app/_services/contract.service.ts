import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contract } from '../_models/contract';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.post<DefaultFilterResponse>(`${environment.apiUrl}/contracts/filter`,{},
    {
      headers: {
        'Content-Type': 'application/x-spring-data-compact+json',
      },
    });
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(`${environment.apiUrl}/contracts/filter`,{"id":id},{
      headers: {
        'Content-Type': 'application/x-spring-data-compact+json',
      },
    });
  }

  add(addForm: any) {
    let contractName = addForm.contractName;
    let description = addForm.description;
    let contract = {
      contractName,
      description
    }
    return this.http.post<any>(`${environment.apiUrl}/contracts`, contract)
  }
  update(updateForm: any) {
    let id = updateForm.id;
    let contractName = updateForm.contractName;
    let description = updateForm.description;
    let contract = {
      contractName,
      description
    }
    return this.http.put<any>(`${environment.apiUrl}/contracts/${id}`, contract)
  }

  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/contracts/${id}`
    );
  }
}
