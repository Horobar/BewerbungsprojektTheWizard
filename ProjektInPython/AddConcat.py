#Variabeldeklaration
testParam1 = "1";
testParam2 = "2";
testString1 = 'concat(12, 2)'
testString2 = 'add(1, 2)'
testString3 = "concat(a, concat(a, concat(a, concat(a, add(1, add(1, add(1, 2)))))))"
#Eingaben/Ausgaben

#Funktion zum zusammenzählen
def add(param1, param2):
    if(param1.isnumeric() and param2.isnumeric()):
        return param1 + param2
    else:
        return "Bitte nur numerische Werte eingeben"
#concat-Funktion
def concat(param1, param2):
    return f"{param1}{param2}"
#Input-Verarbeiten
def procedureInput(param):
    workingString = str(param).lower();
    stringLeft = '';
    stringRight = '';
    i = 0;
    doConcat = False
    doAdd = False
    compareString = ""
    parantCounter = 0

    for letter in workingString:
        compareString += letter
        if(letter == "("):
            parantCounter += 1
        elif(letter == ")"):
            parantCounter -= 1


        if(compareString == 'concat'):
            doConcat = True
        elif(compareString == 'add'):
            doAdd = True

        if(compareString[-1] == ',' and parantCounter == 1):
            if(doConcat):
                stringLeft = workingString[7:i]
                stringRight = workingString[i+2:]
                concat(procedureInput(stringLeft),procedureInput(stringRight.rstrip(')')))

            elif(doAdd):
                stringLeft = workingString[4:i]
                stringRight = workingString[i+2:]
                add(procedureInput(stringLeft), procedureInput(stringRight.rstrip(')')))

            print(stringLeft)
            print(stringRight)

        i += 1

#Eingaben/Ausgaben
#procedureInput(testString1)
#procedureInput(testString2)
procedureInput(testString3)
# print("Gib deinen String ein: ")
# inp = input()
# print(inp)
# print(add(testParam1, testParam2))
#Funktionen
