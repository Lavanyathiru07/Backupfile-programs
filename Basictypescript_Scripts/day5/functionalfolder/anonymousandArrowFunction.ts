//anonymous fuction (unnamed function) is a function without a name. 
// It is often used as a callback function or as an argument to another function.
//instead ,it is assigned to a vaiable ,which acts as its name

//syntax of anonymous function
/*let variableName=function(parameters):returnType{
    //code to be executed
}*/

//variable(); calling the function 

let msgg=function():String{
    return "Hello, welcome to TypeScript!";
}

msgg();
console.log(msgg());


//example 2: anonymous function with parameters and return type

let sum78=function(x:number,y:number):number{
    return x+y;
}

let results:number=sum78(10,20);
console.log(`The sum is ${results}`);


//arrow function : an arrow function is a concise way to write a function in TypeScript.
//  It is also an anonymous function. The syntax of an arrow function is as follows:

/*let variableName=(parameters):returnType=>{
    //code to be executed
}*/
/*lambda refers to anonymous function in programming languag4s
lambda functions  are a concise mechanism to represent anonymous functions
these functions are also called as arrow function

there are 3 parts of lambda function
1. parameters : a function may optionally have parameter
2. the fat arrow notation/lambda notation(=>): it is also called as the goes to opertor
3. statements:represent the function instruction set

syntax of lambda function
let variableName=(parameters):returnType=>{
    //code to be executed
}
variableName(); calling the function*/    

let helloo=():void=>{
console.log("Hello, welcome to TypeScript!");
}

helloo();


//example 2: lambda function with parameters and return type
 let multipicationn=(x:number,y:number):number=>{
    return x*y;
 }
 console.log(`The multiplication is ${multipicationn(10,20)}`);


 //example:3 Arrow fuction with implicit return type
 //no need to specify the return word and curly braces if the function body contains only a single expression. The value of that expression will be implicitly returned by the function.

 let divisionn=(x:number,y:number)=>x/y;
    console.log(`The division is ${divisionn(20,10)}`);


    //example 4:arrow fuction with optional parameter

    //first parameter should be optional followed by second parameter should option else it will show the complie time error

    let displaytheoptionalparameterr=(x:number,y?:number):number=>
    {
        console.log(`The value of x is ${x}`);
        if(y!==undefined){
            console.log(`The value of y is ${y}`);
            return x+y;
        }else{
            console.log("y is not provided");
            return x;
        }
    }
    console.log(`the result is ${displaytheoptionalparameterr(10,20)}`);

    //example 5:default parameter in arrow function

    let calculatediscountt=(price:number,rate:number=9.0):number=>{
        let discount=price*rate/100;
        return discount;
    }

    console.log("the discount price is",calculatediscountt(10000,0.9));


    //example 6:arrow function with rest parameter

    let moduless=(...mods:(number|string)[]):number=>{
        console.log("the models are",mods);
        return mods.length;
    }

    console.log(`the number of modules are ${moduless(98,8,"lavanya","vaishu")}`);


