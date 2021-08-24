import { HttpClient } from '@angular/common/http';
import { Orders } from '../_models/orders';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


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
      pagamento : addForm.pagamento
    };
    return this.http.post<any>(`${environment.apiUrl}/order/add`, order);
  }
  update(id: any,status:any) {
    return this.http.patch<any>(`${environment.apiUrl}/order/update?id=${id}`,{"status":status});
  }
  updatePayment(id: any,status:any) {
    return this.http.patch<any>(`${environment.apiUrl}/order/updatePayment?id=${id}`,{"status":status});
  }
  delete(id:any){
    return this.http.delete<any>(`${environment.apiUrl}/order/delete?id=${id}`);
  }
}
