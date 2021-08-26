import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipiService {

  constructor() { }
  getall(){
    return {
        tipi: [
          {
            tipo: 'MAGLIETTA',
          },
          {
            tipo:'SCARPE'
          },
          {
            tipo: 'POLO',
          },
          {
            tipo: 'VESTITO',
          },
          {
            tipo: 'CAMICIA',
          },
          {
            tipo: 'JEANS',
          },
          {
            tipo: 'PANTALONI',
          },
          {
            tipo: 'BERMUDA',
          },
          {
            tipo: 'FELPA',
          },
          {
            tipo: 'GIACCA',
          },
          {
            tipo: 'COMPLETO',
          },
          {
            tipo: 'CAPPOTTO',
          },
          {
            tipo: 'INTIMO',
          },
          {
            tipo: 'ACCESSORI',
          },
        ],
    };
  }
}
