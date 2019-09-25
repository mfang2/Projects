/*
Michael Fang
10/6/2018
Post-fix Expressions
*/

/*to do:
- add spaces between operators and parentheses

*/

import * as readlineSync from 'readline-sync';
import * as fs from 'fs'; 

var postFixLine='';
var answer:number;

var inFixToPostFix = function () {
    var opStack = new Array (); //linked list with stack for the operators to push and pop from.
    var preStr=""; //prefix expression string
    var postStr=""; //put postfix expression here
    var finish=0; //finished condition


    //is passed character an operand?
    var isOperand = function (line: string) {
        var ops = ['+', '-', '/', '*', '%', 'POW', '(', ')']; //operators, parantheses, and POW
        var isOps = true;
        for (var i = 0; i<ops.length; i++) {
            if (line == ops[i]) {
                return isOps = false; 
            }
        }
        return isOps; //if it does not find, returns as true;
    }

    //is passed character an operator?
    var isOperator = function (name: string) {//takes single character
        var ops = ['+', '-', '/', '*', '%', 'POW'];
        var isOps = false;
        for (var i = 0; i<ops.length; i++) {
            if (name == ops[i]) {
                return isOps = true; 
            }
        }
        return isOps; //if it does not find, returns as false;
    }

    var getSymbol = function (line: string) {
        var s = line.indexOf(','); //find next comma
        if (s==-1) { //indexOf returns -1 if it cannot be found, which means there is one more symbol left
            finish=-1; //set finishing condition 
            return line.substring(0);//add last symbol
        }
        else { //indexOf returns position of next comma
            preStr = line.substring(s+1); //set the string to the next bit.
            return line.substring(0, s);
        }
    }

    var getPriority = function (op: string) {
        if (op == '+' || op == '-') {
            return 1;
        }
        if (op == '*' || op == '/' || op == '%') {
            return 2;
        }
        if (op == 'POW') {
            return 3;
        }
    }

    //prompt user for expression
    var input = readlineSync.question("Enter expression or Q to quit: ");
    if (input == "q" || input == "Q") {
        done = true; //this is really ugly.
        return;
    }
    input = input.replace(/\+/g, ' \+ ').replace(/\*/g, ' \* ');  //add space before and after + and *
    input = input.replace(/\(/g, ' \( ').replace(/\)/g, ' \) ');    // add space before and after ( and )
    input = input.replace(/-/g, ' - ').replace(/\//g, ' /  ');       // add space before and after - and /
    //console.log(input);
    //var arr = input.split(' ').filter(x=>x.length > 0); //test code
    //console.log(arr);
    input = input.trim(); //in case there are extra whitespaces afterwards. 
    //I am not good with regular expressions. This puts spaces between numbers and other symbols.
    //This regular expression is derived
    // from stackoverflow (https://stackoverflow.com/questions/13191714/add-space-between-numbers-digits-and-letters-characters)

    // 1 major problem left: need spaces between symbols (i.e. between parens and *)
    // instructions do not state if there are space requirements for symbols.

    //console.log ("input is ", input);
    preStr = input.split(' ').filter(x=>x.length>0).toString(); //pass to function variable. 
    //console.log ("preStr is: ", preStr);
    while (finish!=-1) { //not finished
        var s = getSymbol(preStr);

        if (isOperand(s)) {//operands are moved to output
            postStr += s+' ';
        }
        else if (s=='(') { //push right parens onto stack immediately
            opStack.push(s);
        }
        else if (s==')') {
            var temp = opStack.pop();
            while (temp != '(') {
                postStr += temp+' ';
                temp = opStack.pop();
            }
        }
        else {//operators. Not operand or parens.
            while (opStack.length>0 && getPriority(opStack[opStack.length - 1]) >= getPriority(s)) {
                    postStr+=opStack.pop()+' ';
            }
            opStack.push(s);
        }
    }
    //pop remaining operator
    while (opStack.length>0) {
        postStr+=opStack.pop()+' ';
    }

    console.log ("The expression in postfix is", postStr);
    return postStr;
}

var evalPostFix = function (expression: string) {//evaluates a String expression in post-fix form
    var numStack = new Array (); //linked list with stack for the operands to push and pop from.
    let postFixStr = expression.split(' ').filter(x=>x.length>0).toString();
    //had to go online to find filter function. 
    //postFixStr is now the expression, with 1 comma (',') between each operator or operand
    //This should be redundant since the expression should already have the correct spacing.
    //console.log ("postFixStr is ", postFixStr);
    var finish=0; //finished condition, is -1 if finished. 
    //console.log (expression);

    //is passed character an operand?
    var isOperand = function (line: string) {
        var ops = ['+', '-', '/', '*', '%', 'POW', '(', ')']; //operators, parantheses, and POW
        var isOps = true;
        for (var i = 0; i<ops.length; i++) {
            if (line == ops[i]) {
                return isOps = false; 
            }
        }
        return isOps; //if it does not find, returns as true;
    }

    var getSymbol = function (line: string) {
        var s = line.indexOf(','); //find next comma delimiter
        //console.log ("The value of s is", s);

        if (s==-1) { //indexOf returns -1 if it cannot be found, which means there is one more symbol left
            finish=-1; //set finishing condition 
            return line.substring(0);//add last symbol
        }
        else { //indexOf returns position of next space
            postFixStr = line.substring(s+1); //set the string to the position AFTER the operator or operand.
            return line.substring(0, s);
        }
    }

    var calculate = function (op:string, num1:number, num2:number) {
        if (op=='*') {
            return (num1 * num2);
        }
        if (op=='/') {
            return (num1 / num2);
        }
        if (op=='%') {
            return (num1 % num2);
        }
        if  (op=='+') {
            return (num1 + num2);
        }
        if (op=='-') {
            return (num1 - num2);
        }
        if (op=='POW') {
            return (num1^num2);
        }
    }

    //evaluate postfix
    while (finish!=-1) {
        var f = getSymbol (postFixStr);
        //console.log (f);
        var num1:number;
        var num2:number;
        var result:number;

        if (isOperand(f)) {
            numStack.push (f);
        }
        else {
            num1 = parseInt(numStack.pop());
            num2 = parseInt(numStack.pop());
            result = calculate (f, num1, num2);
            //console.log (result);
            numStack.push(result.toString());
            
        }
    }
    //console.log (numStack);
    let answer = numStack[0]; //answer should be left in stack
    //console.log ("result is: ", answer);
    return answer;

}

//main
let done = false; 

while (!done) {
    postFixLine = inFixToPostFix(); //convert and prints post-fix expression
    if (done) {
        break;
    }
    answer = evalPostFix(postFixLine); //evaluates postfix expression and produces result
    console.log ("The expression evaluates to:", answer);
}

/*
postFixLine = inFixToPostFix();
answer = evalPostFix(postFixLine);
console.log (answer);
*/
// evaluate postfix




