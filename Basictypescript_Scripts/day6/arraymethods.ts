



let numbers:number[]=[1,2,3,4,5]
let fruits:string[]=["apple","orange","grapes"];

console.log("Number of array",numbers);
console.log("String of array",fruits);

//length-attribute(not a method)

console.log("size of number array:",numbers.length)//5
console.log("size of number array:",fruits.length)//3

//1.push()-Adds single/mutiple elements to the end of an array
//syntax :array.push(element1,.....,elementn)

numbers.push(6,7);//the number will add end of the array

console.log("After push",numbers);//After push [1, 2, 3, 4,5, 6, 7]

console.log(fruits.push("pineapple"))
console.log(fruits)


//2.pop

//remove the last element from an array

//syntax:array.pop()

let lastFruits=fruits.pop();
console.log(lastFruits);
console.log(fruits);

//3.shift

//remove the first element from the array
//syntax: array.shift()

let firstnumber=numbers.shift();
console.log("After shift()",numbers);// [ 2, 3, 4, 5, 6, 7 ]
console.log("Removed number is ",firstnumber);//1


//4.unshift

//add single/mutiple elements to the begining of an element

//syntax:array.unshift(element1,.....,elementn)

fruits.unshift("kiwi","pear")
console.log("after unshift() ",fruits)// [ 'kiwi', 'pear', 'apple', 'orange' ]

//5.concate

//combines two or more array
//syntax:array.concat(value1,...,valuen);

let combinedarray=numbers.concat([8,9],[10]) //concat with datatype value only

console.log(combinedarray);//[2, 3, 4,  5, 6, 7, 8, 9, 10]


//6.slice()

//Starting index starts from zero
//extract the data based on start,end index
//Ending Index will be exclusive.Ex: If 3 is Ending index it will consider 2 (3-1=2)
//syntax:array.slice(start,end)
/*
This method cuts an array, in whichever manner we want and returns the trimmed array.
a. It excludes the last index from an argument.

syntax:
array.slice(start_index, end_index)
*/

let extraarray=fruits.slice(1,3)//end poing is not start from which we mention as start point where is array start point from that you count the end point

console.log("After slice()",extraarray);//[ 'pear', 'apple' ] (3-1=2) end index is exclude


let extraarray1=fruits.slice(2,5)
console.log("After slice()",extraarray1);

//7.splice()

//splice() -add /remove the elemnt from an array (from everywhere)

//syntax:array.splice(start,deletecount(optional),item1,...,itemN(add))

//ex1 element removed

console.log("current element in fruits array:",fruits);//[ 'kiwi', 'pear', 'apple', 'orange', 'grapes' ]

let removedsplice=fruits.splice(1,2);//delete the element from 1st index 2 element(1 is start index ,2 is represent how many element to be removed)
console.log("After splice(1,2):",removedsplice)//[ 'pear', 'apple' ]

console.log("after splice:",fruits);//[ 'kiwi', 'orange', 'grapes' ]


//ex2 not removed but added


fruits.splice(1,0,'pineapple','banana');//from 1 st we add pineapple','banana' and 0 element to delete
console.log("fruits.splice(1,0,'pineapple','banana') :",fruits);//[ 'kiwi', 'pineapple', 'banana', 'orange', 'grapes' ]

//ex3 element removed and added
fruits.splice(1,2,'mango','cherry');//deleted 2 element which is presented from 1 st index
console.log("fruits.splice(1,2,'mango','cherry') :",fruits);//[ 'kiwi', 'mango', 'cherry', 'orange', 'grapes' ]


//8.Indexof()
 //-finds the index of an element ,if element not found then return -1
 //syntax:array.indexof(searchelement)
// (or) array.indexof(searchelement,String index);

//ex1


let orangeIndex=fruits.indexOf("orange")
console.log("Index of orange:",orangeIndex);//3


//ex 2


let bananaIndex=fruits.indexOf("banana")
console.log("Index of banana:",bananaIndex);//-1   because banana is not present in the array


//ex3

orangeIndex=fruits.indexOf("orange",1); //1 is starting index
console.log("Index of orange:",orangeIndex);//3


//9 includes ()-check if an element exists

//Syntax:array.includes(searchElement,fromIndex)

//return true or false


console.log("Fruits include apples we arecchecking",fruits.includes('apple'));//false

console.log("Fruits include grapes we are checking",fruits.includes("grapes"));//true



//10.tostring()

//convert arrat to string

//syntax:array.tostring()

console.log("number formate",numbers);// [ 2, 3, 4, 5, 6, 7 ]

let numberstring=numbers.toString();
console.log("number converted into string:",numberstring);// 2,3,4,5,6,7  previously thenumber is printed in array now that is converted
//so it is string aaarya


let myarray:string[]=['e','f','h','t'];

console.log("printing original array",myarray);//[ 'e', 'f', 'h', 't' ]

let stringmyarray:string=myarray.toString();

console.log("After converting the string",stringmyarray);//e,f,h,t

























