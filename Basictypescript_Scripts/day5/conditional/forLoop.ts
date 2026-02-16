// compare to do and do while loop ,for loop is used when we know the number
//  of iterations in advance
// comapre to anotjer loop for llop is less step and more readable


/*for(initialization; condition; increment/decrement){
    //code to be executed
}*/


//example 1: print number 1 to 5 using for loop
for(let i:number=1;i<=5;i++)
{
    console.log(i);
}


// method 1: print even number 1......10
for(let num:number=2;num<=10;num+=2)
{
    console.log(num);
}

//method 2 looping + conditional statement
// example 3: print number 10,9,8,7,6,5,4,3,2,1

for(let num21:number=10;num21>=1;num21--)
{
    console.log(num21);
}

let l12:number;
for(l12=1;l12<=5;l12++)
{
    console.log(l12);
}
console.log("value of l12 after loop "+l12);//6 because after last iteration
//  l12 will be incremented to 6 and then condition will be checked and loop will
//  be terminated


let l14:number;
for(l14=1;l14<=5;l14++);
console.log("value of l14 after loop "+l14);//6 because after last iteration

//  be terminated becase of semicolon after for loop there is no block of code to be executed in loop so it will be treated as empty loop and l14 
// will be incremented to 6 and then condition will be checked and loop will be terminated
