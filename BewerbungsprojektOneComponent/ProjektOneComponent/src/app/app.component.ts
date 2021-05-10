import { Component } from '@angular/core';
//import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent
{
  title: string = 'this will be a fancy project';
  output: string = 'Here will be the recentOutput';

  let outputGain!:string;

  //InputValue: string = "";

  TestParam1: any = "1";
  TestParam2: any = "1";

  outputGain = this.add(this.TestParam1, this.TestParam2);
  /**
   * Summ two Params
   */
  public add(param1:any, param2: any)
  {
    if(isNaN(param1) || isNaN(param2))
    {2
      return 'Just Numbers please';
    } else {
      return Number(param1) + Number(param2);
    }

  }
