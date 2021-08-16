import { HttpClient } from '@angular/common/http';
import { Orders } from '../_models/orders';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { DefaultResponse } from '../_models/defaultResponse';
import { DefaultFilterResponse } from '../_models/defaultFilterResponse';

@Injectable({
  providedIn: 'root',
})

export class OrdersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/order/getall`);
  }

  getById(id: number) {
    console.log(id)
    return this.http.get<Orders[]>(`${environment.apiUrl}/order/getById?id=${id}`);
  }

  getByIdDest(id: number) {
    console.log(id)
    return this.http.get<Orders[]>(`${environment.apiUrl}/order/getByIdDest?id=${id}`);
  }
  reso(order : Orders){
    console.log(order)
    return this.http.post<Orders>(`${environment.apiUrl}/order/reso?id=${order}`,{});
  }
  add(addForm: any) {
    let order = {
      username : addForm.nome,
      indirizzo : addForm.indirizzo,
      city : addForm.city,
      cap : addForm.cap,
      mittente: addForm.mittente,
      destinatario : addForm.destinatario,
      articolo : addForm.articolo,
    };
    return this.http.post<any>(`${environment.apiUrl}/order/add`, order);
  }
}
