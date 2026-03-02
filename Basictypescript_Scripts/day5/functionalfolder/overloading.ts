//over loaded function : a function that can be called with different number of arguments or different types of arguments is called an overloaded function. 
// In TypeScript, we can achieve function overloading by providing multiple function signatures 
// for the same function name.

//syntax of function overloading
/*function functionName(parameters1):returnType;
function functionName(parameters2):returnType;



//step 1:write a signature of function (signature means the function declaration without the body) for each way you want to call the function. Each signature should have a different parameter list and return type if necessary.
//step 2:implement a function
//step 3:calling fuction

//example 1 :different parameter tpe(data type)



*/
function getinfo(id:number):string; // signature 1
function getinfo(name:string):string;//signature 2

function getinfo(param:number|string):string{
    if(typeof param=="number")
    {
        // console.log("User id is",param);
        return (`user id is ${param}`);
    }
    else 
    {
        // console.log("User name is",param);
        return (`user name is ${param}`);
    }
}

console.log(getinfo(5433));
console.log(getinfo("SDET channel"));


//example 2 : different number of parameters

function calculatearea(a1:number,b1:number,c1:number):number;
function calculatearea(a1:number,b1:number):number;

function calculatearea(a1:number,b1:number,c1?:number):number{
    
}



