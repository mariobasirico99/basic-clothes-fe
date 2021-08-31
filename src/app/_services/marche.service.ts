import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcheService {

  constructor() { }
  getall(){
    return {
        marche: [
          {
            marca: 'ADIDAS',
          },
          {
            marca: 'ARMANI',
          },
          {
            marca: 'BALENCIAGA',
          },
          {
            marca: 'BENETTON',
          },
          {
            marca: 'CALVIN KLEIN',
          },
          {
            marca: 'DSQUARED',
          },
          {
            marca: 'GUCCI',
          },
          {
            marca: 'GUESS',
          },
          {
            marca: 'HUGO BOSS',
          },
          {
            marca: 'LACOSTE',
          },
          {
            marca: 'MOSCHINO',
          },
          {
            marca: 'NIKE',
          },
          {
            marca: 'POLO RALPH LOUREN',
          },
          {
            marca: 'TOMMY HILFIGER',
          },
          {
            marca: 'VALENTINO',
          },
          {
            marca: 'VANS',
          },
          {
            marca: 'VERSACE',
          },
          {
            marca: 'ALTRO...'
          }
        ],
    };
  }
}
