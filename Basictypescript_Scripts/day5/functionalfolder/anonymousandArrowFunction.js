//anonymous fuction (unnamed function) is a function without a name. 
// It is often used as a callback function or as an argument to another function.
//instead ,it is assigned to a vaiable ,which acts as its name
//syntax of anonymous function
/*let variableName=function(parameters):returnType{
    //code to be executed
}*/
//variable(); calling the function 
var msg = function () {
    return "Hello, welcome to TypeScript!";
};
msg();
console.log(msg());
//example 2: anonymous function with parameters and return type
var sum = function (x, y) {
    return x + y;
};
var results1 = sum(10, 20);
console.log("The sum is ".concat(results1));
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
var hello = function () {
    console.log("Hello, welcome to TypeScript!");
};
hello();
//example 2: lambda function with parameters and return type
var multipication = function (x, y) {
    return x * y;
};
console.log("The multiplication is ".concat(multipication(10, 20)));
//example:3 Arrow fuction with implicit return type
//no need to specify the return word and curly braces if the function body contains only a single expression. The value of that expression will be implicitly returned by the function.
var division = function (x, y) { return x / y; };
console.log("The division is ".concat(division(20, 10)));
//example 4:arrow fuction with optional parameter
//first parameter should be optional followed by second parameter should option else it will show the complie time error
var displaytheoptionalparameter = function (x, y) {
    console.log("The value of x is ".concat(x));
    if (y !== undefined) {
        console.log("The value of y is ".concat(y));
        return x + y;
    }
    else {
        console.log("y is not provided");
        return x;
    }
};
console.log("the result is ".concat(displaytheoptionalparameter(10, 20)));
//example 5:default parameter in arrow function
var calculatediscount = function (price, rate) {
    if (rate === void 0) { rate = 9.0; }
    var discount = price * rate / 100;
    return discount;
};
console.log("the discount price is", calculatediscount(10000, 0.9));
//example 6:arrow function with rest parameter
var modules = function () {
    var mods = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mods[_i] = arguments[_i];
    }
    console.log("the models are", mods);
    return mods.length;
};
console.log("the number of modules are ".concat(modules(98, 8, "lavanya", "vaishu")));
