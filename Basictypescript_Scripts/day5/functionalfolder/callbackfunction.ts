//a callback fuction:A function passed as an argument to another function and execute later  is called a callback function.

//example 1:


function greatwelcome(greeting:string)
{
    console.log(greeting,"this is a callback function");
}

function callbackfunction(name:string,hmsg:(message:string)=>void)//hmsg is the callback function I will name it as hmsg while calling
//I will that function as a parameter

//hmsg is a function that takes a string parameter and returns void and also notice that colon is used to specify the type of the parameter and return type of the function
{
    console.log("thi is name",name);
    hmsg(`Hello ${name}, welcome to TypeScript!`);///i,m calling the callback function 
    // and passing the message as an argument
    //executing the call back function
    
}

callbackfunction("lavanya",greatwelcome);//here I am passing the named function as an argument 
// to the callback function



//syntax of callback function
/*function functionName(parameters,callback:(parameterType)=>returnType):void{
    //code to be executed
    callback(argument); //executing the callback function
}*/

//example 2: 

function displayresult(resultt:number):void{
    console.log("the result is",resultt);
}

function summ(r1:number,r2:number,sumres:(result:number)=>void):void{

    let result12:number=r1+r2;
    sumres(result12);//executing the callback function and passing the result as an argument

}


console.log(summ(23,45,displayresult));

function sqaurethevalue(numb:number):number{
    return numb*numb;
}
let result:number;
function processArray(arr:number[],callback:(numb:number)=>number):number{
    for (let i=0;i<arr.length;i++){
        result=callback(arr[i]);//executing the callback function and passing the current element of the array as an argument
      
    }
      return result;
}

console.log(processArray([2,3,4],sqaurethevalue));


