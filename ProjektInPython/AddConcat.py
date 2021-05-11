#Variabeldeklaration
testParam1 = "1";
testParam2 = "2";
testString1 = 'concat(12, 2)'
testString2 = 'add(1, 2)'
testString3 = "concat(a, concat(a, concat(a, concat(a, add(1, add(1, add(1, 2)))))))"
testString4 = "add(1, add(3,4))"
testString5 = "add(add(1,2), add(3,4))"
testString6 = a
testString7=  "concat(add(1,1) , concat(\" Bäume\", \" im Wald\"))"
testString8 = "A\"a,b(c\"d\"(e)\"("
saveArray = []
#Eingaben/Ausgaben


def stringSaveFinder(param:str, sign:str):
    """
    Funktion zum finden von Zeichen ohne Strings kaputt zu machen
    """
    firstQuote = param.find("\"")
    idx = param.find(sign)
    #print(param, firstQuote, idx)
    if firstQuote == (-1) or idx < firstQuote:
        return idx;
    secondQuote = param[firstQuote+1:].find("\"")
    idn = stringSaveFinder(param[firstQuote+secondQuote+2:], sign)
    if(idn == -1):
        return idn;
    return firstQuote + secondQuote + 2 + idn

#Testfälle
# print(stringSaveFinder(testString6, ","))
# print(stringSaveFinder(testString6, "("))

#Funktion fürs Kommafinden
def getLastCommaIndex(param):                   #ich suche das erste Komma
    idx = stringSaveFinder(param, ",")                       #und das steht beim index idx
    if(idx == -1):                              #fall es keine Kommas mehr hat -> idx = -1
        return idx                              #
    idn = getLastCommaIndex(param[idx+1:])      #doch doch, nach idx hats noch eins, such nochmal und pack seinen index in idn
    if(idn == -1):                              #idx war wirklich das letzte
        return idx
    return idn + idx + 1                        #es wird immer zweigeteilt gesucht, so ist am Schluss idx der index des letzten kommas und idn w

#Funktion zum zusammenzählen
def add(param1, param2):
    param1 = int(param1)
    param2 = int(param2)

    print(param1, param2)
    return param1 + param2

#concat-Funktion
def concat(param1, param2):
    param1 = str(param1)
    param2 = str(param2)
    return f"{param1.strip()}{param2.strip()}"

#Input-Verarbeiten
def procedureInput(param:str):
    print(f"A,param:{param}")
    cmdEnd = stringSaveFinder(param, "(")
    if(cmdEnd == -1):
        return param

    commaIndex = getLastCommaIndex(param[:cmdEnd]);

    preCommand = ''
    if(commaIndex < cmdEnd):
        preCommand = param[:commaIndex+1]
        print(f"IF:param: {param} -- preCommand: {preCommand} -- newParam: {param[commaIndex+1:]}")
        param = param[commaIndex+1:]
        cmdEnd = stringSaveFinder(param, "(")


    cmd = param[:cmdEnd].lower().strip()
    param = param[cmdEnd+1:]
    print(f"B,Param: {param} cmd: {cmd} preCommand: {preCommand}")

    #ToDo: "Schmerzen"
    #Eintritt Rekursion
    if(stringSaveFinder(param, "(") > -1):
        param = procedureInput(param)

    commaIndex = stringSaveFinder(param, ",")
    closingParant = stringSaveFinder(param, ")")
    inputLeft = param[:commaIndex]
    inputRight = param[commaIndex+1:closingParant]

    if(cmd == 'add'):
        return concat(preCommand, concat(add(inputLeft, inputRight), param[closingParant+1:]))
    elif(cmd== 'concat'):
        return concat(preCommand, concat(concat(inputLeft, inputRight), param[closingParant+1:]))
    else:
        print("unkown command")


    # workingString = param;r
    # stringLeft = '';
    # stringRight = '';
    # i = 0;
    # doConcat = False
    # doAdd = False
    # compareString = ""
    # parantCounter = 0
    #
    # for letter in workingString:
    #     compareString += letter
    #     if(letter == "("):
    #         parantCounter += 1
    #     elif(letter == ")"):
    #         parantCounter -= 1
    #
    #
    #     if(compareString == 'concat'):
    #         doConcat = True
    #     elif(compareString == 'add'):
    #         doAdd = True
    #
    #     if(compareString[-1] == ',' and parantCounter == 1):
    #         if(doConcat):
    #             stringLeft = workingString[7:i]
    #             stringRight = workingString[i+2:]
    #             concat(procedureInput(stringLeft),procedureInput(stringRight.rstrip(')')))
    #
    #         elif(doAdd):
    #             stringLeft = workingString[4:i]
    #             stringRight = workingString[i+2:]
    #             add(procedureInput(stringLeft), procedureInput(stringRight.rstrip(')')))
    #
    #         print(stringLeft)
    #         print(stringRight)

        # i += 1

#Eingaben/Ausgaben
#procedureInput(testParam1)
#out = procedureInput(testString1)
#print(out)
#procedureInput(testString2)
out = procedureInput(testString6)
# print("Gib deinen String ein: ")
# inp = input()
# print(inp)
# print(add(testParam1, testParam2))
#Funktionen
print(out)
#print(len(testString8))
