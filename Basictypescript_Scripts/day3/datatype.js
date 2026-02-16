//datatype---type of data or value----
//annotations---ecplicity mention the datatype which is include ":"also ":datatype"
//Type inference===it will assign the datatype during the runtime based on the value which we asiign ---> var a=9
/*1)primitive datatype
number
string
boolean
null
undefined,any                             if I create the variable with primitive datatype means I can store only one value at the time (eg. var a:string=45,VAr b:boolean=true ---correct,,var a:string=12,23---incorrect)
union type
void

2)non-primitive data type

array
class                      we can store more than one value or group of value
function
interface
touple etc

*/
//number
//also refer the Bulidindatatype file already created here
// represent both integer,floating-point number
var age89 = 90;
var price = 90.8;
var big = 4445544n;
// 2.string
// we can put the string in 3 way like " "(double quote) or(backtick) ` ` or(single quote) ' '
// represent textual data
var firstname = "lavanya";
var secondname = "thiru";
// I want to combine these two with another word how let seee
// I want pasue any data in parameterized use backtick
var greeting = "hello ".concat(firstname, " ").concat(secondname);
console.log(greeting);
// you dont want store the value in one variable I will print the value dritectl in console you use , for cancat 
console.log("hello", firstname, secondname);
// 3.Boolean--->represent true or false
var isStudent = true;
var hasjob = false;
console.log("Is student ? ", isStudent); ///is student? true
//4.null & undefined
//special type for absence of value
var empty = null;
// empty=87;//error not accept
var notassigned = undefined;
// notassigned=90;
//5.any
//carefully use this because it losse the type script benefits
//we can reasign the value with any datatype
var valrr = "ekeke";
valrr = 90;
valrr = true;
//eg to use for address to use an keword
//6.Union type -- this is not keyword 
//combine mutiple type
//you dont know the datatype then goto any keyword or you can use umion datatpe
var id;
id = "Adb56";
id = true;
//7.void
//void can use in function
//if the function is not returing any value meams you can mean the function as void
//void fuction myfunc() like mention in other language 
// here function myfun():void
//if the fuction return something means you mention the return value datatype in the function 
//eg
function sum() {
    console.log(10 + 56); //no return value
}
function add() {
    return (10 + 20); //return the number datattype value
}
function sumvalue(x, y) {
    return x + y;
}
var res = sumvalue(34, 45);
console.log(res);
function subvalue(x, y) {
    console.log(x - y);
}
subvalue(87, 56);
