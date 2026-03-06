///============for each(),map(),reduce(),some(),every()===========


//1.foreach()

//execute a function once for each array element
//It takes function as a parameter


//syntax:array.foreach(function(currentvalue,index,array){})

//currentvalue -The current element being processed in the arry
//index(optional)-The index of the current element being processed in the array
//array(optional)-the array the current element belongs to.

//ex1:get index of all the fruits along with value

let fruitss:string[]=['apple','orange','banana'];
 for(let i in fruitss)
 {
    console.log(fruitss[i]);//apple it will return the value normally not in array
//orange
//banana
 }

 fruitss.forEach(function(element,index)
 {
    //console.log(`${index}`,`${element}`)
      console.log(index,element)
 })

 //reverse()--It will reverse the array value
 console.log(fruitss.reverse());//[ 'banana', 'orange', 'apple' ]

 //sort()
//It will sort the value By defeult ascending order
//syntax array.sort( compareFunction )
 console.log(fruitss.sort());


 //ex2:
 //join
 //using comma join the array
 // numbers.join()
 let numberss: number[] = [11, 89, 23, 7, 98];
let result: string = numberss.join();

console.log("String:", result);//String: 11,89,23,7,98

console.log(fruitss.join('+='));//apple+=banana+=orange

 fruitss.forEach((element)=>{
    console.log(element.toUpperCase());
 });




 //2.map()-create a new array with the result of calling the unction on every element of an array
 //It takes function as as parameter
 //returns the same number of element that we have in original array.

 //syntax array.map(function(currentvalue,index,array){})


 //ex1 get square of all the number in an array .EX:[1,2,3]then result should be [1,4,9]

 let squarenumberoriginal:number[]=[1,2,3,4];

   let squarednumber =squarenumberoriginal.map(function(element) // map function will the array value so you must declare the variable here no need to mention the datatype number becasue typescrpt is typereference

   {
      return element*element;
   })

   console.log("square number is: ",squarednumber);//[ 1, 4, 9, 16 ]
   console.log("square number is: ",squarenumberoriginal);//[ 1, 2, 3, 4 ]


   //ex2 Double of each number

   // let doublenumber=squarenumberoriginal.map((ele)=>{
   //    return ele *2;
   // })

      let doublenumber=squarenumberoriginal.map((ele)=>ele *2); // curly braces and return statements are optional if you have single return statement inside the arrow function 

   console.log("Double number is :" ,doublenumber);//[ 2, 4, 6, 8 ]


   //3.fiter()--create a new array with all element that pass/ satisfy the function
   //take fuction as a parameter
   //return either same of fewer number of elements compared to original array.

   //ex1:get only even number from an array

//   let evennumber=squarenumberoriginal.filter((element)=>{
//    return (element%2==0);
//   });


let evennumber=squarenumberoriginal.filter((Element)=>Element%2==0);
console.log("printing the event number using filter(): ",evennumber);//[2,4]


//ex2;get the only numbers greater than 3 from an array

let filternumber=squarenumberoriginal.filter((element)=> element>3);

console.log("Number greater than 3: ",filternumber);//[4]


///map will check all element and return the true value 
//filter will check the condition it the condition is true then return the original value and filter consider 0 is false above 0 are true

//let filternumber=squarenumberoriginal.filter((element)=> element>3);  for If I mention the map instead of filter means I got [false,false,true,false]
//Why I got that it will track all element and give length of output like original array length
//why boolean values means it check the condition (ele>3)=> what result it return that will it through in array




///filter I change filter instead of map means I got original array becase It check each condition true or false it true means it will return same
//original value like 4 or false means it elimitate that 
//eg  ele>3 this is condition ==> 1>3 --false(elimi)
//2>3 --false(elimi)
//4>3--true(display)


///let doublenumber=squarenumberoriginal.map((ele)=>ele *2);===> for this I use filter instead map then return original array [ 1, 2, 3, 4 ]
//condition=ele*2========1*2=2(True(because this is return value is not 0)),so it will display the orinala value which is present in array 1
//2*2=4(T)==(display 2),3*2=6(t)==display(3)


//4.reduce()--Applies a function on every element of an array and returns a single value

//syntax:array.reduces(function(accumulator,currentvalue,index,arrray){})

//accumulator-the accumulator value from previous iteration
//current value-the current element being processed

//ex:1get the total (sum) of all element in an array


// let total=0;

// for(let i=0;i<squarenumberoriginal.length;i++)
// {
//    total+=squarenumberoriginal[i]
// }
// console.log("sum of all number:",total)

//using reduce method

let resuceresult=squarenumberoriginal.reduce((total,element)=>{ 
   return (total+element) //total+=elemeent written like this Total+element because reduce will return single value only
   },0); 
   //and it will store all result one by one in accumulator(total) here accumulator is total
   //herenI didn't mention any default value for toatal it will take 0 as default value 

//or elese here you can mention the accumulator values here No need to mention 0 as accumulator more than 0 you must declare

console.log("sum of element in array: ",resuceresult)//10


//you also mention in single line
/* let resuceresult=squarenumberoriginal.reduce((total,element)=>(total+element,0);
*/

//5.some -----check if any element satisfies a condition 
//return true if at least one passes the condition ,else false

//syntax array.some(function(currentvalue,index,array){})

//ex1:check array negative value or not

let hasNegativevalue=squarenumberoriginal.some((element)=>element<0);//if atleast one element statisfying the condition it will true 

console.log("Does array contains negative value? ",hasNegativevalue);//false===[ 1, 2, 3, 4 ] this array does not contains negative value(ele<0) so return flase


//ex 2 even number checking

let evenarray=squarenumberoriginal.some((ele)=>ele%2==0);

console.log("checking the even number in given array using some(): ",evenarray)//true [ 1, 2, 3, 4 ] because this is array contains even number


//6.every()-check if all elements satisfy a condition
//return true if all elements pass the condition,else false

//syntax: array.every(function(currentvalue,index,array){})

//ex 1 even number checking

let evenarrayevery=squarenumberoriginal.every((ele)=>ele%2==0);

console.log("checking the even number in given array using every(): ",evenarrayevery)//false [ 1, 2, 3, 4 ] this arrat contains both number even and odd


//ex2:
let allGreaterzero=squarenumberoriginal.every((Element)=>Element>=0)
 console.log("Checking all number greater one using every() :",allGreaterzero)//true







 /*In JavaScript, .map() and .filter() are both used to create new arrays from an existing one, but they process the elements differently. 
1. .filter() — The "Security Guard"
Purpose: To pick only specific elements that pass a test.
How it works: It looks at each element and asks: "Is this true?".
If True, it keeps the original element.
If False, it ignores the element.
Result: A new array that is often shorter than the original. 
GeeksforGeeks
GeeksforGeeks
 +6
Example:
javascript
let nums = [1, 2, 4];
let result = nums.filter(x => x > 3); 
// Guard asks: Is 1 > 3? (No) -> Is 2 > 3? (No) -> Is 4 > 3? (Yes!)
// Result: [4]
Use code with caution.

2. .map() — The "Factory Worker"
Purpose: To transform every single element into something else.
How it works: It takes every element and replaces it with the result of your code.
Result: A new array that is always the same length as the original. 
GeeksforGeeks
GeeksforGeeks
 +5
Example (The "Boolean" Result):
When you use a comparison like x > 3 inside .map(), you are asking the "worker" to tell you the result of that math for every single spot. 
Medium
Medium
javascript
let nums = [1, 2, 4];
let result = nums.map(x => x > 3); 
// Worker says: 1 > 3 is false -> 2 > 3 is false -> 4 > 3 is true
// Result: [false, false, true]
Use code with caution.

Key Differences at a Glance
Feature 	.filter()	.map()
Main Job	Selects elements	Transforms elements
New Array Size	Can be shorter than original	Always same as original
Callback Return	Must return true or false	Returns the new value
Common Use	Finding even numbers, search results	Doubling values, changing format
Would you like to try a small coding challenge to see if you can pick which one to use?**





undefined
undefined
undefined
11 sites
Map() vs Filter() Methods in JavaScript - GeeksforGeeks
22 Aug 2024 — Map() vs Filter() Methods in JavaScript * In JavaScript, the map() and filter() methods are powerful array functions that allow yo...

GeeksforGeeks
Understanding Map Filter Reduce JavaScript - NxtWave
8 Apr 2025 — * 1. JavaScript map() Method. This method in JavaScript is used to create a new array. It calls a function on each element of the ...

NxtWave | CCBP 4.0 Certification Programs

map() vs filter() vs reduce() in JS | by Mathursan Balathas
27 Aug 2021 — So what's the big deal about that? If that is the case, you can still do it with 3 lines of code with forEach as well. This will g...

Medium

Show all
Now also I cant understand why it is return true and false and value
It all comes down to what the method does with the result of your function.
Think of it like this: your function (element) => element > 3 is a question. It always answers either true or false.
1. Why .filter() returns the Number
When you use .filter(), JavaScript uses your true/false answer as a instruction to keep or throw away the item.
Logic: "If the function says true, I will put the original number into the new array."
Result: You get [4].
2. Why .map() returns true/false
When you use .map(), JavaScript takes whatever your function returns and puts it directly into the new array. It doesn't ask questions; it just records the answer.
Logic: "Whatever the function says, I will put that exact answer into the new array."
Process:
Is 1 > 3? The answer is false. Map puts false in the array.
Is 2 > 3? The answer is false. Map puts false in the array.
Is 4 > 3? The answer is true. Map puts true in the array.
Result: You get [false, false, true].
A Simple Comparison
Imagine you have a box of fruit: [Apple, Apple, Orange].
The Filter Goal: "Give me only the Apples"
You check: Is it an Apple? (Yes/No)
If Yes, you put the Apple in the new box.
Result: [Apple, Apple]
The Map Goal: "Tell me if each one is an Apple"
You check: Is it an Apple? (Yes/No)
You write down the Answer on a piece of paper.

*/




















 



 

