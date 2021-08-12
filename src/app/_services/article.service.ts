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
  notMine(id_utente : any){
    return this.http.get<Article[]>(`${environment.apiUrl}/article/notMine?id=${id_utente}`);
  }
  add(addArticle : any){
    return this.http.get<Article>(`${environment.apiUrl}/article/add`,addArticle);
  }
}
