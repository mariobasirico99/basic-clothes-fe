import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullPageSearchService {
  searchedText: string;

  searchedTextChange: Subject<string> = new Subject<string>();

  constructor() {
    this.searchedText = '';
  }

  onTextChange(event: any) {
    const newSearchedText = (event.target as HTMLInputElement).value;
    this.searchedText = newSearchedText;
    this.searchedTextChange.next(newSearchedText);
  }
}
