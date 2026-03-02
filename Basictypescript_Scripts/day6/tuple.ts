//array is a dynamic in nature we can store n number vlaue into the array
//tuple is fixed type array
//tuple is a fixed-length array where each elemnt has a specific type
//It hepls in storing muTIPLE fields of different data type together

//tuple with 2value

//syntax
//   let variable name:[datatype]=[value];

let person:[string,number]=["john",34];//2 data type act like a tuple not unioun datatype in between there not mention
//'|' opertor and this is fixed datatype and lenth also 
//here 2 value -lenghth one is string(1st) and another one is number(2nd)

console.log(person);
console.log(person[0]);
console.log(person[1]);


//example 2 :Tuple with mutiple values

let user:[number,string,boolean,number]=[10,"john",true,90];//here we mention 4 datatype so we add value 4 only same datatype values

console.log(user);


//example 3: Iterating over a tuple using a tradtional for loop


for(let i=0;i<user.length;i++)
{
    console.log(user[i]);
}

//example 4:iternating using a 'for ..in'(index based)


for(let tupleindex in user)
{
    console.log(user[tupleindex]);
}

//example 5: iternating user 'for...of' (value based)


for(let value of user)
{
    console.log(value);
}

//Tuple Array(Array of tuple)with mutiple array

let student:[number,String][]=[[11,"student1"],[2,"student2"],[3,"Student3"]];

//let student:[number,String][]===> tuple of array

//[[1,"student1"],[2,"student2"],[3,"Student3"]];===>   here you can store multiple tuple in array [[tuple],[tuple],[tuple]]---outer bracket is array

console.log(student.length);

console.log(student[0]);//retrive the specific element from the array
let tp=student[0];
console.log(tp[0]);
console.log(student[0][1])





