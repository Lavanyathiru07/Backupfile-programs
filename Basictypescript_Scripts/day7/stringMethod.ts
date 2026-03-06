//String -text value or a combination of character

/*
1.single quote-String literal('')
2.Double quote-String literal ("Double Qoute")
3.backtick(``)-string template-when we try to use a string variable inside another string value ${variable}

//index in string start with 0

*/


//Declarastion of string

let str1:string='This is a strting with single quote'
let str2:string="This is a strting with double quote"
let str3:string=`This is a strting back tick`


console.log(str1);
console.log(str2);
console.log(str3);

//when to use back tick opertaor

let num1:number=10;
console.log("number is :",num1);//10
console.log(`number is ${num1}`);//number is 10 inside string capture the value use backtick operator
console.log('number is ${num1}')//not valid   number is ${num1}
console.log("number is ${num1}")//not valid   number is ${num1}

//string method 


let str:string="Hello, Typescript";
 

//1.length--find the length of an array and this isn't method this is property

console.log("length of string ",str.length);//17

//2.toUpperCase() and toLowerCase()


console.log("Upper case: ",str.toUpperCase());//HELLO ,TYPESCRIPT

console.log("Lower case: ",str.toLowerCase());//hello ,typescript


//3.chatAt(index) and indexOf(string) 
//charAt(index)==based on index it should return the character
//indexOf(string)==based on string it should return the index

console.log("chatAt method :",str.charAt(10));//e
console.log("index of method :",str.indexOf("Type"));//7


//4.substring()
//01234
//Hello ,Typescript
//1234

//ending index exclusive
console.log("Extract the string in the sentence",str.substring(2,4))//startpoint start from 0 and endpoint is n-1 or end point is start from 1 //ans :ll


//5.includes():return true or false
//case sentitive

console.log("checking the value present? ",str.includes("Hello")); //true // case sentivite also this
console.log("checking the value present? ",str.includes("hello"));//false

//6.startsWith() and endsWith()

console.log("Starts with: ",str.startsWith('Hello'));//true
console.log("ends with: ",str.endsWith('t'));//true

console.log("Starts with rt : ",str.endsWith('rt'));//false
console.log("Starts with hello : ",str.startsWith('hello'));//false

//7.replace()
//"Hello, Type"
//it wont change the original value which is present in the variable
console.log('replaced string: ',str.replace("Type","type"));//replaced string:  Hello ,typescript
console.log(str);//Hello ,Typescript


//8.split()-break the string into multiple part based on the delimeter,return an array
//here delimiter is space as mentioned in console so based that where space is present here it will split the sentence

let words:string[]=str.split(" ")
console.log("using split method ",words);//using split method  [ 'Hello', ',Typescript' ]

//ex 2:
let mystring:string="abac@gmail.com,12334558";
let eparr:String[]=mystring.split(",");
console.log(`email : ${eparr[0]} , password : ${eparr[1]}`);//email : abac@gmail.com , password : 12334558


//9.trim()
//trimstart(),trimEnd()
 
mystring="    welcome to typescript    ";

console.log('Original string: ',mystring);//:      welcome to typescript
console.log('trim string:',mystring.trim());// welcome to typescript
console.log('trim start:',mystring.trimStart());//welcome to typescript
console.log('trim end:',mystring.trimEnd());//     welcome to typescript


//10.concat()

str1='welcome'
str2='to typescript'
str3="and javascript"

console.log("this is concat string ",str1.concat(str2));//this is concat string  welcometo typescript
console.log("this is concat string ",str1 + str2);//this alternative but not recommended because this is not usefull for number

console.log("welcome".concat(" to testing"));//welcome to testing

console.log(str1.concat(str2).concat(str3));//welcometo typescriptand javascript


//String is immutable nature

//the value is not changing the original value means that is called immmutability nature

let num:number=10;
let res:number=num+5;
console.log(res);

str1='welcome'

let modifiedString=str1.concat('to enjoy')
console.log(str1);//it cant change the original value 


//multiline string--go for backtick operator


let multiline:String=`welcomedddd
                     to trsy` //if you provide the string value multiple line means use backtick else if you use single or double quote it should displaynthe error message
















