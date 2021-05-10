import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  visitTime: string = 'Current Date and Time'; //Date();
  constructor() { }

  ngOnInit(): void {

  }

}
