import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultResponse } from '../_models/defaultResponse';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  getAll() {
    /* return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/roles?page=0&size=50`
    ); */
    return {
      _embedded: {
        roles: [
          {
            id: 1,
            accountType: 'SUPERADMIN',
          },
          {
            id: 2,
            accountType: 'DIRECTOR',
          },
          {
            id: 3,
            accountType: 'MANAGER',
          },
          {
            id: 4,
            accountType: 'HR_ADMIN',
          },
          {
            id: 5,
            accountType: 'HR',
          },
          {
            id: 6,
            accountType: 'CONSULTANT_II',
          },
          {
            id: 7,
            accountType: 'CONSULTANT_I',
          },
          {
            id: 8,
            accountType: 'ANALYST_II',
          },
          {
            id: 9,
            accountType: 'ANALYST_I',
          },
        ],
      },
    };
  }
}
