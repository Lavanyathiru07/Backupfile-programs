var a = 10, b1 = 45;
//Arithmetic operation
console.log(a + b1);
console.log(b1 - a);
console.log(a * b1);
console.log(a / b1);
console.log(a % b1);
console.log(Math.pow(a, b1)); //10 square 45 
//Assignment opertor
a = 100;
b1 = 50;
console.log(a += b1); //a=a+b
console.log(a -= b1); //a=a-b
console.log(a *= b1);
console.log(a /= b1);
console.log(a %= b1);
///relational opertors
//returns boolean value true/false
//>  < >= <= == != ===
console.log("***********************");
a = 109;
b1 = 89;
console.log(a > b1); //true
console.log(a < b1); //false
console.log(a >= b1); //true
console.log(a >= b1); //false
console.log(a == b1); //false
console.log(a != b1); //true
//difference between ==(equality) && ===(strict equality)
var num122 = 10;
var num123 = "10";
console.log(num122 == num123); //true//compare only value
console.log(num122 === num123); //false //compare the value along with data type
//logical opertors && || ! 
//we can between the boolean variable
//b1    b2   &&  ||   !b1
//T      T    T   T    false
//T      F    F   T     -
//F      T    F   T     true
//f      F    F   F      -
//
var l1 = true;
var l2 = false;
console.log(l1 && l2);
console.log(l1 || l2);
console.log(!l1); //false
console.log(!l2); //true
//combination of logical and relational opertor
console.log(20 > 10 && 10 > 5); //true
console.log(10 < 20 || 5 > 10); //true
//increment and decrement opertors
var n1 = 10;
n1++; //n1=n1+1//post increment
var res78 = n1++;
console.log(res78); //10 -- first assign value in variable
console.log(n1); //11
var res79 = ++n1;
console.log(res79); //11
//ternary opertor
// ?:
//exp ? res1: res 2;
var l3 = 78, l4 = 90;
var res45 = (l3 > l4) ? l3 : l4;
console.log(res45);
///eg 2
var personage = 68;
var adultage = (personage > 18) ? "adult" : "minor";
console.log(adultage);
