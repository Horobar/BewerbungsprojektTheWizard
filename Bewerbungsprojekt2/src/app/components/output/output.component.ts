import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})
export class OutputComponent implements OnInit {
  public output! :string;
  @Input() childMessage!: string;
  constructor() {

    }

  ngOnInit(): void {
  }
}
