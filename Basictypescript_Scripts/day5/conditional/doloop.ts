//iteration statements

//while loop :a while loop execute a block of code  as long as a specified condition is true. The syntax of a while loop is as follows:
/*while(condition)
{
    //code to be executed
}*/


let i:number=1;
while(i<=5)
{
    console.log(i);
    i++;
}

let age45:number=15;
while(age45<100)
{
 if(age45>=18){
    console.log(`${age45} you are eligible for voting`);
    console.log("you are eligible for voting");
 }else{
    console.log(`${age45} you are not eligible for voting`);
    console.log("you are not eligible for voting");
 }
    age45++;
}


//example 2 print even number 1......10
//method 1
let num:number=2;
while(num<=10){
    console.log(num);
    num+=2;//num=num+2
}

//method 2 looping + conditional statement
// example 3: print number 10,9,8,7,6,5,4,3,2,1

let num21:number=10;
while(num21>=1)
{
    console.log(num21);
    num21--;
}
//there is no condition to stop so this loop will run infinity and 
// it will print "This is an infinite loop" continuously until you stop the program manually or use a break statement to exit the loop.
// while (true) {
//     console.log("This is an infinite loop");
//     //break; //uncomment this line to exit the loop
// }


//do while loop : a do while loop is similar to a while loop but it executes 
// the block of code at least once before checking the condition. The syntax of a do while loop is as follows:

/*do{
    //code to be executed
}while(condition);*/


//example 1: print number 1 to 5 using do while loop
let j:number=1;
do{
    console.log(j);
    j++;
}while(j<=5);
console.log("****************************************");
let j23:number=10;
do{
    console.log(j23);
    j23++;
}while(j23<=1);


/*
5--start
4--- 1 decrement (i--)
3
2
1--end 
*/

let k:number=5;
do{
    console.log(k);
    k--;
}while(k>=1);