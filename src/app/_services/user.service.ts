import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models/user';
import { convertToObject } from 'typescript';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${environment.apiUrl}/user/getall`);
    }

    getById(id: number) {
        return this.http.get<any>(`${environment.apiUrl}/user/getById?id=${id}`);
    }
    register(regForm:any){
        console.log(regForm)
        return this.http.post<any>(`${environment.apiUrl}/user/register`,
        {
            email : regForm.email,
            city : regForm.city,
            indirizzo : regForm.indirizzo,
            cap : regForm.cap,
            username : regForm.username,
            password: regForm.password,
            initialRole : "ROLE_USER"
        });
    }
    updateUser(updateForm : any){
        console.log(updateForm)
        return this.http.patch<any>(`${environment.apiUrl}/user/update?id=${updateForm.id}`,
        {
            username: updateForm.username,
            email : updateForm.email,
            city : updateForm.city,
            indirizzo : updateForm.indirizzo,
            cap : updateForm.cap
        });
    }
    delete(id:any){
        return this.http.delete<any>(`${environment.apiUrl}/user/delete?id=${id}`);
    }
}