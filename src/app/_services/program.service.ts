import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';
import { DefaultResponse } from '../_models/defaultResponse';
import { Programs } from '../_models/programs';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.post<DefaultFilterResponse>(`${environment.apiUrl}/programs/filter`,{});
  }

  getById(id: number) {
    return this.http.post<DefaultFilterResponse>(`${environment.apiUrl}/programs/filter`,{"id": id});
  }
  findByProgramNameLike(name: string) {
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/programs/search/findByProgramNameLike?value=${name}`
    );
  }
  add(addForm: any) {
    let programName = addForm.programName;
    return this.http.post<any>(`${environment.apiUrl}/programs`, {programName})
  }
  update(updateForm: any) {
    let id = updateForm.id;
    let programName = updateForm.programName;
    return this.http.put<any>(`${environment.apiUrl}/programs/${id}`, {programName})
  }

  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/programs/${id}`
    );
  }
}
