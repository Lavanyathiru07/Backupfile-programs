//if condition 
//if age equal to or greater than 18 then print "you are eligible for voting"
let ages:number=20;
if(ages>=18){
    console.log("you are eligible for voting");
}


//if else condition
//if age equal to or greater than 18 then print "you are eligible for voting" otherwise print "you are not eligible for voting"

let age12:number=15;
if(age12>=18){
    console.log("you are eligible for voting");
}else{
    console.log("you are not eligible for voting");
}

let num19:number=10;
if(num19%2==0){
    console.log(`${num1} is even`);
}else{
    console.log(num1+" is odd");
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

let day67:number=3;
switch(day67)
{
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


let x12:number=10,y12:number=20;
switch(x12-y12)
{
    case -10:
        console.log("x is less than y"); break;

    case 0:
        console.log("x is equal to y"); break;

    case 10:console.log("x is greater than y"); break;
    default: console.log("Invalid case");
}

let num23:number=5,num3:number=10;
switch(num3>num23)
{
    case true: console.log(`${num3} is greater than ${num2}`); break;
    case false: console.log(`${num3} is less than ${num2}`); break;
    default: console.log("Invalid case");
}
 