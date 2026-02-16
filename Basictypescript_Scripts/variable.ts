//Type script is type based script
//java is not type based like boolean,number
//first complire the type script file .ts "tsc file.ts" then js file will appear then execute the js file "node file.js"
//type script is superset of javascript
//syntax for variable declaration "var varname:datatype = value"

// var employeename :string="lavanya";//semicolon is optional
// console.log(employeename);//<==== 1.both type and initia value

// //2.only the type of variable
// var employeename1:string='';
// console.log(employeename1);


// //3.only the initial value (without datatype)

// var nameper="vaishu";

// console.log(nameper);


// //without type and initial value

// var vaivalue;
// vaivalue="girl";
// console.log(vaivalue);

//"var" variable ----function scope based
var globalvar=10;
function testing()
{
    if(true)
    {
        var localvar=1000;
        console.log(localvar);//ok becase inside the fuction
    }
    console.log(localvar);//ok because inside the fuction
}
// console.log(localvar);///error because outside the function
console.log(globalvar);///ok because this is globally declared that variable



//"let"  variable-----block scope based
let y=80;
function letvariable()
{
    if(true)
    {
        let x=10;
        console.log(x)///ok because x is a let variable so it is block scope based
    }
    console.log(x);// this error becase this is presenting outside the block 
    console.log(y);//ok becase y let variable represented in globally
}
console.log(x);//error out of the block 
console.log(y);//ok becase this global variable


