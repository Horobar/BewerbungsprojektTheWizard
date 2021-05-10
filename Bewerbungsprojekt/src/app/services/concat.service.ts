import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConcatService {

  constructor() { }

  concat(param1, param2) : {
    return `${param1}${parma2}`;
  }
}
