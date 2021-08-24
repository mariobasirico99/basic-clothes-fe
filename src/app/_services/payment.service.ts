import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  payment(token:string,amount:string){
    const headers = new HttpHeaders({token: token, amount: amount});
    return this.http.post(`${environment.apiUrl}/payment/charge`, {}, {headers: headers})
  
  }
}
