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

  sortBy(
    index: string,
    size: string,
    sortDirection : string,
    sortField : string,
  ) {
    return this.http.post<DefaultFilterResponse>(
      `${environment.apiUrl}/order/filter?page=${index}&size=${size}&sortDirection=${sortDirection}&sortField=${sortField}`,
      {}
    );
  }

  getById(id: number) {
    return this.http.get<Orders>(
      `${environment.apiUrl}/order/getById?id=${id}`);
  }
  reso(order : Orders){
    console.log(order)
    return this.http.post<Orders>(`${environment.apiUrl}/order/reso?id=${order}`,{});
  }
  deleteById(id: number) {
    return this.http.delete<DefaultResponse>(
      `${environment.apiUrl}/order/${id}`
    );
  }
  findByNameLike(name: string) {
    return this.http.get<DefaultResponse>(
      `${environment.apiUrl}/order/search/findByNameLike?name=${name}`
    );
  }
  add(addForm: any) {
    let responsible = `${environment.apiUrl}/employees/${addForm.manager}`;
    let company = `${environment.apiUrl}/companies/${addForm.company}`;
    let ordergroupProgram = `${environment.apiUrl}/ordergroupPrograms/${addForm.ordergroup}`;
    let endVisibilityDate = '';
    let endVisibilityDateTemp = addForm.endVisibilityDate
      .split('/')
      .reverse()
      .join('-');
    endVisibilityDateTemp.split('-').forEach((dateItem: string) => {
      endVisibilityDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    endVisibilityDate = endVisibilityDate.slice(0,-1);
    let startDate = "";
    let startDateTemp = addForm.startDate.split('/').reverse().join('-');
    startDateTemp.split('-').forEach((dateItem: string) => {
      startDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    startDate = startDate.slice(0,-1);
    let endDate = "";
    let endDateTemp = addForm.endDate.split('/').reverse().join('-');
    endDateTemp.split('-').forEach((dateItem: string) => {
      endDate += dateItem.length === 1 ? `0${dateItem}-` : `${dateItem}-`;
    });
    endDate = endDate.slice(0,-1);
    let value = addForm.valOrdine;
    let offertNumber = addForm.numOfferta;
    let city = addForm.city;
    let name = addForm.nameOrd;
    let contactName = addForm.nameRef;
    let order = {
      responsible,
      ordergroupProgram,
      value,
      contactName,
      company,
      city,
      name,
      offertNumber,
      endVisibilityDate,
      startDate,
      endDate,
    };
    return this.http.post<any>(`${environment.apiUrl}/order`, order);
  }
}
