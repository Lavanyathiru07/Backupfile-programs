/*
 Array in typescript
 ==============================
 -An array is a special type of variable that store multiple values.
 -The value can be of the same type or different type.
 -Arrays are declared using [] or the generic `Array<T>` type.
 -Indexing status from 0
 -Array are an ordered collection of elements, where each element is identified by its index.
 */

//syntax of array
/*let variableName:type[]; //using square brackets
or
let variableName:Array<type>; //using generic array type
*/

//Approach 1:using leteral

// let names:string[]=[];//empty array of string type and we declare the variable name as names

// //intialization of array /assigning value
// //Typescript and javascript array are dynamic size means we cant mention the size of array
// // let names:string[3]=[]

// names[0]="lavanya";
// names[1]="vaishu";
// names[2]="friends";

// let names1:String[]=["lavanya","vaishu","friends"];//declaration and initialization of array

// console.log(names1);


//Approach 2:using generic array type

let empNames:Array<string>=["lavanya","Qa","testing","automation"];//empty array of string type and we declare the variable name as empNames

let empIDs:Array<number>=[101,102,103];//declaration and initialization of array

let data:Array<string|number>=[109,"lavanya",98,"QA"];//array of union type
 let mixedData:Array<any>=[109,"lavanya",98,"QA"];//array of any type


console.log(empIDs);
console.log(empIDs[0]);//retreiving the specific element from the array using index

console.log(`size of the array is ${empNames.length}`);//4 (How many values stored in the array)
console.log(data);

//loop through array iterating over array using for loop

console.log("Employee names priniting using for loop");

for(let i=0;i<empNames.length;i++)//i<=empNAmes.length-1
    {
console.log(empNames[i]);//i is representing an index
    }

    ///Example in loop and for loop
    //Example 2:Iterating using the 'for...in' loop (indexs)

    console.log("Employee names priniting using for...in loop");

    for(let k in empIDs)
    {
        console.log(empIDs[k]);//k is representing an index
        console.log(empIDs[2]);//k is representing an index
    }


    //Example 3:Iterating using the 'for...of' loop (values)
    console.log("Employee names priniting using for...of loop");

    for(let value of mixedData)
    {
        console.log(value);//value is representing value only not index
    }



/*
1.literal array:using square brackets  

syntax:let variableName:datatype[]=[]; //using square brackets

2.generic array type:using Array<type>

syntax:let variableName:Array<datatype>=[];

3.Both array type is same 
=====================================
for loop types
==============================
4.for loop:used to iterate over array using index (we need mention intialization,condition and increment/decrement)

5.for ...in loop:used to iterate over array using index (we need not mention intialization,condition and increment/decrement)
 and value are store in the variable which we declare in loop

 syntax:for(let variableName in arrayName)  ///variableName is representing index and arrayName is representing the array
 //  which we want to iterate

 6.for ...of loop:used to iterate over array using value (we need not mention intialization,condition and increment/decrement)

    syntax:for(let variableName of arrayName)  ///variableName is representing value and arrayName is representing the array

    without index you can print the value of array using for...of loop
*/


//array with functions 

//search the element in a n array using function

function search(ele:number,arr:number[]):boolean{
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]===ele)
        {
            return true;
        }
        
    }
        return false;
}
 let arr:number[]=[1,2,3,4,5];

 console.log(search(30,arr));

 console.log(search(3,arr));


 //example 5:A function takes an array and returns an array


 function captilaizewords(arr:string[]):string[]{
    //  let result:string[]=[];
    for(let j in arr)
       

        {
            console.log(`lower case original value ${arr[j]}`);
            // result[j]=arr[j].toUpperCase();
            arr[j]=arr[j].toUpperCase();
        }

        return arr;
        // return result;
    }

    let words:string[]=["lavanya","vaishu","friends"];

    captilaizewords(words);

    console.log(words);









