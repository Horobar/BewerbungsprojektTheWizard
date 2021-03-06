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

  outputGain!: any;
  workingString: string = "";
  testString: string = "";
  parantCounter: number = 0;
  doConcat: boolean = false;
  doAdd: boolean = false;

  TestParam1: any = '1';
  TestParam2: any = '1';

  doStuff() {
    //get Input
    let input: string = (document.getElementById(
      'InputField'
    ) as HTMLInputElement).value;

    console.log(input);
    this.output = this.parse(input);
  }

  parse(input: any) {
    this.workingString = input.toString();
    for (let i = 0; i < this.workingString.length; i++)
    {
      this.testString = this.workingString[i];
      //Testen, ob nur eine Klammer offen ist
      if(this.workingString[i] === "(" )
      {
        this.parantCounter++;
      }
      else if(this.workingString[i] === ")" )
      {
        this.parantCounter--;
      }

      //Testen ob der eingegebene String mit add oder concat beginnt
      if(this.testString === 'concat')
      {
        this.doConcat = true;
      }
      else if ((this.testString === 'add'))
      {
        this.doAdd = true;
      }

      //ist man bei einem Komma und nur eine Klammer offen?
      if((this.workingString[i] === ",") && this.parantCounter === 1)
      {
        //begann der String mit concat?
        if(this.doConcat)
        {
          this.concat(this.workingString.substring(7,i), this.workingString.substring(i+2,(this.workingString.length-2)));
        }
        //begann der String mit Add
        else if(this.doAdd)
        {
          this.add(this.workingString.substring(4,i), this.workingString.substring(i+2,(this.workingString.length-2)));
        }
      }
    }
    return this.output;

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

  }

  /**
   * concats two strings
   */
  concat(param1: any, param2: any) {
    //either param could be a function like concat(1,1) is equal to 11
    //so you need to call parse(param1) and parse(param2)
    return `${this.parse(param1)}${this.parse(param2)}`;
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
