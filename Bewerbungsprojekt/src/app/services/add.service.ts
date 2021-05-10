import { Injectable } from '@angular/core';
import { isNumeric } from 'rxjs/util/isNumeric';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor() { }

  add(param1, param2): {
    if(isNumeric(param1) && isNumeric(param2) {
      return param1 + param2;
    } else {
      return "For add() only numeric value are allowed."
    }
  }
}
