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
var names1 = ["lavanya", "vaishu", "friends"]; //declaration and initialization of array
console.log(names1);
