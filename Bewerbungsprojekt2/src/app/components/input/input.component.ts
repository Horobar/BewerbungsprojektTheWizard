import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Output() messageEvent = new EventEmitter();
  text!: string;
  private input!: string;
  constructor() { }

  ngOnInit(): void {
  }

  sendMessage() {
    this.messageEvent.emit(this.text);
  }
  // onSubmit() {
  //   if(!this.text) {
  //     alert('Gib bitte was ein');
  //     return "";
  //   }
  //   else {
  //     console.log(this.text);
  //     return this.text;
  //   }
  //   this.input = this.onSubmit();
  // }
}
