import {Component} from '@angular/core';

/**
 * @title Input with a clear button
 */
@Component({
  selector: 'input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputClearableExample {
  public currentValue: any = 'Clear me';
}
