import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Article } from '../_models/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http: HttpClient) { }
  getAll() {
      return this.http.get<Article[]>(`${environment.apiUrl}/article/getall`);
  }
  notMineAndSex(id_utente : any, sex:string){
    return this.http.get<Article[]>(`${environment.apiUrl}/article/notMineAndSex?id=${id_utente}&sex=${sex}`);
  }
  notMine(id_utente : any){
    return this.http.get<Article[]>(`${environment.apiUrl}/article/notMine?id=${id_utente}`);
  }
  add(addArticle : any){
    return this.http.post<Article>(`${environment.apiUrl}/article/add`,addArticle);
  }
  getUserbyId(id_utente : any){
    return this.http.get<any>(`${environment.apiUrl}/article/getUserIdById?id=${id_utente}`);
  }
  upload(form:any,id:number){
    console.log(form)
    return this.http.patch<any>(`${environment.apiUrl}/article/upload?id=${id}`,form, { observe: 'response' });
  }
  getImage(id:number){
    return this.http.get<any>(`${environment.apiUrl}/article/getimage?id=${id}`);
  }
  delete(id:any){
    return this.http.delete<any>(`${environment.apiUrl}/article/delete?id=${id}`);
  }
}
