import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessoService {

  constructor() { }
  getall(){
    return {
        all: [
          {
            sesso: 'UOMO',
          },
          {
            sesso: 'DONNA',
          },
          {
            sesso: 'BAMBINI',
          },
        ],
    };
  }
}
