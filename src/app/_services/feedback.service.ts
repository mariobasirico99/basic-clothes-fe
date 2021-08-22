import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Feedback } from 'src/app/_models/feedback'
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback/getall`);
  }
  getByUser(id:number) {
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback/getByUser?id=${id}`);
  }
  add(form:any) {
    console.log(form)
    return this.http.post<Feedback>(`${environment.apiUrl}/feedback/add`,{
      descrizione: form.descrizione,
      voto: form.voto,
      id_utente: form.id_utente,
      id_scrittore: form.scrittore_id
    });
  }
  getRankingByUser(id:number) {
    return this.http.get<any>(`${environment.apiUrl}/feedback/getRankingByUser?id=${id}`);
  }
  delete(id:any){
    return this.http.delete<any>(`${environment.apiUrl}/feedback/delete?id=${id}`);
  }
}
