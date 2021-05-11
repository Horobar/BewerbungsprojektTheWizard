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
    //console.log(this.message);
    this.parentMessage = parse(this.message);
    //console.log(this.parentMessage);

    //Test Funktion stringSaveFinder
    //testStringSaveFinder();
    //Test getLastCommaIndex
    //testGetLastCommaIndex();
    //Test: add()
    //testAdd();
    //Test: concat()
    //testConcat();
    //test:Parse().
    //testParse();
  }
}
//ParseFunktion
function parse(param:any) {
  //console.log(param);
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
  //console.log(`cmd:${cmd}`);
  param = param.substring(cmdEnd+1);
  //console.log(`Param nach cmd weg : ${param}`);
  if(stringSaveFinder(param, "(") > -1) {
    param = parse(param) as string;
  }
  //console.log(`Param nach rekursion : ${param}`);
  commaIndex = stringSaveFinder(param, ",");
  let closingParant: number = stringSaveFinder(param, ")");
  let inputLeft:string = param.substring(0, commaIndex);
  //console.log(`Left:${inputLeft}`)
  let inputRight:string = param.substring(commaIndex+1, closingParant);
  //console.log(`Right:${inputRight}`)
  if(cmd === 'add'){
    let addOutput: any = add(inputLeft, inputRight);
    if(addOutput != NaN) {
      return concat(preCommand, concat(addOutput, param.substring(closingParant+1)));
    }

  } else if (cmd === 'concat') {
    return concat(preCommand, concat(concat(trimClean(inputLeft), trimClean(inputRight)), param.substring(closingParant+1)));
  }
}

//testParse()
function testParse(): void {
  let parseTestInput1: string = "A"; //geht
  let parseTestInput2: number = 10; //geht
  let parseTestInput3: string = "concat(A, 10)"; //geht
  let parseTestInput4: string = "concat(\"A\", \"10\")";
  let parseTestInput5: string = "add(10, 10) ";
  let parseTestInput6: string = "add(\"10\", \"10\")"; //geht
  let parseTestInput7: string = "add(10, -10)"; //geht nicht
  let parseTestInput8: string = "add(\"10\", \"Baum\")";
  let parseTestInput9: string = "add(10, concat(1,1))";
  let parseTestInput10: string = "concat(add(1,1) , concat(\" Bäume\", \" im Wald\"))"; //geht nicht, kriege Anführungszeichen nicht weg
  let parseTestInput11: string = "concat(a, concat(a, concat(a, concat(a, add(1, add(1, add(1, 2)))))))";
  let parseTestInput12: string = "\"concat(\"A\", \"B\")\" ";
  let parseTestInput13: string = "concat(\"concat(A,B)\", 10";
  let parseTestInput14: string = "concat(10, \"concat(A,B)\")";

  console.log(parseTestInput5);
  console.log(parse(parseTestInput5));

}
//funktion zu trimmen von inputright und inputleft
function trimClean(param: any){
  let paramCleaned:string = param.trim();
  if(paramCleaned[0] === "\"" && paramCleaned[-1] === "\"") {
    paramCleaned = paramCleaned.substring(1,-2);
  }
  return paramCleaned;
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
  const testString3:string =  "\"concat(\"A\", \"B\")\" ";
  console.log("StringSaveFinder Test:")
  console.log("concat(10, \"concat(A,B)\")");
  console.log(stringSaveFinder(testString2, ","));
  console.log(stringSaveFinder(testString2, "("));
  console.log("concat(add(1,1) , concat(\" Bäume\", \" im Wald\"))");
  console.log(stringSaveFinder(testString1, ","));
  console.log(stringSaveFinder(testString1, "("));
  console.log("\"concat(\"A\", \"B\")\" ");
  console.log(stringSaveFinder(testString3, ","));
  console.log(stringSaveFinder(testString3, "("));
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
//Testfunktion für getLastCommaIndex
function testGetLastCommaIndex(): void
{
  const testString4:string =  "concat(add(1,1) , concat(\" Bäume\", \" im Wald\"))";
  const testString5:string =  "concat(10, \"concat(A,B)\")";
  const testString6:string =  "\"concat(\"A\", \"B\")\" ";
  console.log("getLastCommaIndex Test:")
  console.log("concat(10, \"concat(A,B)\")");
  console.log(getLastCommaIndex(testString5));
  console.log("concat(add(1,1) , concat(\" Bäume\", \" im Wald\"))");
  console.log(getLastCommaIndex(testString4));
  console.log("\"concat(\"A\", \"B\")\" ");
  console.log(getLastCommaIndex(testString6));
}
//add()-Funktion
function add(param1: any, param2: any) {
  let numParam1!: number;
  let numParam2!: number;

  numParam1 = Number(param1);
  numParam2 = Number(param2);

  return numParam1 + numParam2;
}
//Test:add()-Funktion
function testAdd(): void
{
  const testParam1:string =  "A";
  const testParam2:number =  10;
  const testParam3:string =  "10";
  const testParam4:string = "add(10, 11)";
  console.log("add() Test:")
  // console.log("add(10, 10)");
  // console.log(add(testParam2, testParam2));
  console.log("add(A, 10)");
  console.log(add(testParam1, testParam2));
  console.log("add(10, \"10\")");
  console.log(add(testParam2, testParam3));
  console.log("add(10, \"add(10, 11)\")");
  console.log(add(testParam2, testParam4));
}
//concat-Funktion
function concat(param1:any, param2:any){
  param1 = param1 as string;
  param2 = param2 as string;
  return `${param1}${param2}`;
}
//Test-Concat()
function testConcat(): void
{
  const testParam1:string =  "A";
  const testParam2:number =  10;
  const testParam3:string =  "10";
  const testParam4:string = "add(10, 11)";
  console.log("concat() Test:")
  // console.log("add(10, 10)");
  // console.log(add(testParam2, testParam2));
  console.log("concat(A, 10)");
  console.log(concat(testParam1, testParam2));
  console.log("concat(10, \"10\")");
  console.log(concat(testParam2, testParam3));
  console.log("concat(10, \"add(10, 11)\")");
  console.log(concat(testParam2, testParam4));
}
