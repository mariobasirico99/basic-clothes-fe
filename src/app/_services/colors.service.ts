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
            colore: 'NERO',
          },
          {
            colore: 'BIANCO',
          },
          {
            colore: 'ARANCIONE',
          },
          {
            colore: 'GIALLO',
          },
          {
            colore: 'VERDE',
          },
          {
            colore: 'ROSSO',
          },
          {
            colore: 'VIOLA',
          },
          {
            colore: 'MARRONE',
          },
          {
            colore: 'BLU',
          },
          {
            colore: 'AZZURRO',
          },
          {
            colore: 'ROSA',
          },
        ],
    };
  }
}
