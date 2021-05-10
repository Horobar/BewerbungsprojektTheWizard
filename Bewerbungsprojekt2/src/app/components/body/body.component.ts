import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  message!: string;
  parentMessage!: string;
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessage($event: any) {
    this.message = $event;
    console.log(this.message);
    this.parentMessage = this.message + 3 ;
    console.log(this.parentMessage);
  }

  parse() {
    console.log("Parse");
  }
}
