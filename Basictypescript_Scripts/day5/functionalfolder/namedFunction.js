//named function :A function that is defined with a name is called a named function. The syntax of a named function is as follows:
/*function functionName(parameters):returnType{
    //code to be executed
}*/
//functionNAme();//calling the function /invoking the function
//example 1:named function without parameters and without return type
function greet() {
    console.log("Hello, welcome to TypeScript!");
}
greet(); //calling the function
//example 2:named function with parameters and  return type
function add(x, y) {
    return x + y;
}
var result = add(10, 20);
console.log("The sum is ".concat(result));
//example 3: named function with rest parameter
//rest parameter allows us to pass an arbitrary number of arguments to a function. The syntax of a rest parameter is as follows:
/*function functionName(...parameterName:type[]):returnType{
    //code to be executed
}*/
function subtract() {
    var numbs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbs[_i] = arguments[_i];
    }
    var i;
    var result = 0;
    for (i = 0; i < numbs.length; i++) {
        result += numbs[i];
    }
    console.log("The additional is ".concat(result));
}
subtract(10, 5, 2);
subtract(20, 10, 5, 2);
//named function with rest parameter of multiple types
function multitypeFunction() {
    var elements = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        elements[_i] = arguments[_i];
    }
    return elements.length;
}
console.log(multitypeFunction(1, 2, 3, 4, 5));
console.log(multitypeFunction("Hello", "World"));
console.log(multitypeFunction(1, "Hello", 2, "World", 3));
//example 4: named function with optional parameter
//optional parameter is a parameter that may or may not be provided when calling the function. The syntax of an optional parameter is as follows:
/*function functionName(parameterName?:type):returnType{
    //code to be executed
}*/
function displaynames(id, name, mailid) {
    console.log("ID: ".concat(id, ", Name: ").concat(name));
    if (mailid != undefined) {
        console.log("Mail ID:", mailid);
    }
}
displaynames(1, "John Doe", "ass@gmail.com");
displaynames(2, "John");
//example 5: named function with default parameter
//default parameter is a parameter that has a default value if no value is provided when calling the function. The syntax of a default parameter is as follows:
/*function functionName(parameterName:type=defaultValue):returnType{

    //code to be executed
}*/
function calaculatediscount(price, rate) {
    if (rate === void 0) { rate = 9.0; }
    var discount = price * rate;
    console.log("The discount is ".concat(discount));
}
calaculatediscount(1000, 0.1);
calaculatediscount(1000);
