import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() givenOutput!: string;
  @Input() givenInput!: string;

  constructor() { }

  ngOnInit(): void {
  }
  public InputsOutputs: string[][] = [];
  addData($event:any) {
  this.InputsOutputs.push([this.givenInput,this.givenOutput])
  console.log(this.InputsOutputs);

  }
}
