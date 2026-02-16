//if condition 
//if age equal to or greater than 18 then print "you are eligible for voting"
var age = 20;
if (age >= 18) {
    console.log("you are eligible for voting");
}
//if else condition
//if age equal to or greater than 18 then print "you are eligible for voting" otherwise print "you are not eligible for voting"
var age1 = 15;
if (age >= 18) {
    console.log("you are eligible for voting");
}
else {
    console.log("you are not eligible for voting");
}
var num1 = 10;
if (num1 % 2 == 0) {
    console.log("".concat(num1, " is even"));
}
else {
    console.log(num1 + " is odd");
}
//switch case
/*switch(expression){
    case value1:
        statement1;
        break;
    case value2:
        statement2;
        break;
    default:
        statement3;
}*/
var day = 3;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    case 6:
        console.log("Saturday");
        break;
    case 7:
        console.log("Sunday");
        break;
    default:
        console.log("Invalid day");
    //break is mandatory for all cases except default case and if you not provide 
    // break statement then it will execute all the cases after the matched case 
    // until it finds a break statement or end of switch block
}
var x = 10, y = 20;
switch (x - y) {
    case -10:
        console.log("x is less than y");
        break;
    case 0:
        console.log("x is equal to y");
        break;
    case 10:
        console.log("x is greater than y");
        break;
    default: console.log("Invalid case");
}

//nested if else
