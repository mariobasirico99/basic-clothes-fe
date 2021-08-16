import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaglieService {

  constructor() { }
  getall(){
    return {
        taglie: [
          {
            taglia: 'XS',
          },
          {
            taglia: 'S',
          },
          {
            taglia: 'M',
          },
          {
            taglia: 'L',
          },
          {
            taglia: 'XL',
          },
          {
            taglia: '35',
          },
          {
            taglia: '36',
          },
          {
            taglia: '37',
          },
          {
            taglia: '38',
          },
          {
            taglia: '39',
          },
          {
            taglia: '40',
          },
          {
            taglia: '41',
          },
          {
            taglia: '42',
          },
          {
            taglia: '43',
          },
          {
            taglia: '44',
          },
        ],
    };
  }
}
