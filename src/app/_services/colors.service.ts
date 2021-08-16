import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor() { }
  getall(){
    return {
        colori: [
          {
            colore: 'Nero',
          },
          {
            colore: 'Bianco',
          },
          {
            colore: 'Arancione',
          },
          {
            colore: 'Giallo',
          },
          {
            colore: 'Verde',
          },
          {
            colore: 'Rosso',
          },
          {
            colore: 'Viola',
          },
          {
            colore: 'Marrone',
          },
          {
            colore: 'Blu',
          },
          {
            colore: 'Azzurro',
          },
          {
            colore: 'Rosa',
          },
        ],
    };
  }
}
