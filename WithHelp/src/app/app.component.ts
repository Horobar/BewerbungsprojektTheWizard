import { Component } from '@angular/core';
//import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'this will be a fancy project';
  output: string = 'Here will be the recentOutput';

  outputGain!: string;
  workingString: string = "";
  testString: string = "";

  TestParam1: any = '1';
  TestParam2: any = '1';

  doStuff() {
    //get Input
    let input: string = (document.getElementById(
      'InputField'
    ) as HTMLInputElement).value;

    this.outputGain = this.parse(input);
  }

  parse(input: any) {
    this.workingString = input.toString();
    for (let i = 0; i < this.workingString.length; i++) {
      teststring = this.teststring[i];

    }
    //figure out which function
    //if concat
    // do concat

    //get both params
    //tipp params are separted by a comma but you need to find the correct comma since it not just the next one
    //if add
    //do add

    //get both params
    //tipp params are separted by a comma but you need to find the correct comma since it not just the next one
    //if neither
    // return input
    return input;
  }

  /**
   * concats two strings
   */
  concat(param1: any, param2: any) {
    //either param could be a function like concat(1,1) is equal to 11
    //so you need to call parse(param1) and parse(param2)
  }

  /**
   * Summ two Params
   */
  add(param1: any, param2: any) {
    //either param could be a function like concat(1,1) is equal to 11
    //so you need to call parse(param1) and parse(param2)

    if (isNaN(param1) || isNaN(param2)) {
      // dont return a string or recursion will fail and use your return value in the future
      // you need to throw an error here
      return 'Just Numbers please';
    } else {
      return Number(param1) + Number(param2);
    }
  }
}
