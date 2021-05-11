import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  message!: string;
  parentMessage!: any;
  constructor() { }

  ngOnInit(): void {
  }

  //Beim Click wird der Input im Textfeld aufgenommen hier in der Variabel message gespeichert, weiterverarbeitet und anschliessend an den Output
  //weiterverschickt
  receiveMessage($event: any) {


    this.message = $event;
    console.log(this.message);
    this.parentMessage = parse(this.message);
    console.log(this.parentMessage);

    //Test Funktion stringSaveFinder
    //testStringSaveFinder();
  }
}
//ParseFunktion
function parse(param:string) {
  console.log(param);
  let cmdEnd: number = stringSaveFinder(param, "(");
  if(cmdEnd == -1) {
    return param;
  }
  let commaIndex: number = getLastCommaIndex(param.substring(0, cmdEnd));
  let preCommand: string = '';
  if(commaIndex < cmdEnd) {
    preCommand = param.substring(0, commaIndex + 1);
    param = param.substring(commaIndex + 1);
    cmdEnd = stringSaveFinder(param, "(");
  }

  let cmd: string = param.substring(0,cmdEnd).toLowerCase().trim();
  console.log(`cmd:${cmd}`);
  param = param.substring(cmdEnd+1);

  if(stringSaveFinder(param, "(") > -1) {
    param = parse(param) as string;
  }

  commaIndex = stringSaveFinder(param, ",");
  let closingParant: number = stringSaveFinder(param, ")");
  let inputLeft:string = param.substring(0, commaIndex);
  console.log(`Left:${inputLeft}`)
  let inputRight:string = param.substring(commaIndex+1, closingParant-commaIndex);
  console.log(`Right:${inputRight}`)
  if(cmd === 'add'){
    return concat(preCommand, concat(add(inputLeft, inputRight), param.substring(closingParant+1)));
  } else if (cmd === 'concat') {
    return concat(preCommand, concat(concat(inputLeft, inputRight), param.substring(closingParant+1)));
  }

}
//Funktion zum Finden von Zeichen, die nicht in Anführungszeichen stehen
function stringSaveFinder(param: string, sign: string)
{
  let firstQuote: number = param.indexOf("\"");
  let idx = param.indexOf(sign);

  if(firstQuote == (-1) || idx < firstQuote)
  {
    return idx;
  }
  let secondQuote: number = param.substring(firstQuote+1).indexOf("\"");
  let idn: any = stringSaveFinder(param.substring(firstQuote + secondQuote + 2), sign);
  if(idn == -1)
  {
    return idn;
  }
    return firstQuote + secondQuote + 2 + idn;
}

function testStringSaveFinder(): void
{
  const testString1:string =  "concat(add(1,1) , concat(\" Bäume\", \" im Wald\"))";
  const testString2:string =  "concat(10, \"concat(A,B)\")";
  console.log(stringSaveFinder(testString2, ","));
  console.log(stringSaveFinder(testString2, "("));
}

//Funktion für das Aufspüren der richtigen Kommas
function getLastCommaIndex(param: string)
{
  let idx = stringSaveFinder(param, ",");
  if(idx == -1)
  {
    return idx;
  }
  let idn: any = getLastCommaIndex(param.substring(idx+1));
  if(idn == 1){
    return idx;
  }
    return idn + idx + 1;
}

//add()-Funktion
function add(param1: any, param2: any) {
  if(isNaN(param1) || isNaN(param2)){
    return -5;  //nur provisorisch
  }   else {
    return param1 + param2;
  }
}

//concat-Funktion
function concat(param1:any, param2:any){
  param1 = param1 as string;
  param2 = param2 as string;
  return `${param1}${param2}`;
}
