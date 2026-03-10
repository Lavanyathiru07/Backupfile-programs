//object -object contains properties and behaviour
//object contains variables and methods
//object is collection of key and value pairs


//ex:

//employee--name,design,sal,dep

//               bonus(),getemdetails(),setdetails()



//student -name,sid,grade //getdeatails(),setdetails()

//different way to create an object in js/ts
//1.using 'object' type-Directly define the values for variable(js/ts)
//2.Inline type object -we also define the datatype of the keys(ts)
//3.using type aliases(js/ts)
//4.using the  classes(js es16/ts)


//1.Using 'object'type-Directly define the value for variable

//The typescript 'object' type represent all value that are not in primitive type

//ex1

/*let employee:object ={ name:"john",
            age:98,
            salary:9877,
            job:"engineer"
}

//if I add intensly object keyword means you can only properties(key-value pair)
//you should not store function

*/
//ex2

let employee={ name:"john",
            age:98,
            salary:9877,
            job:"engineer",
            getDetails:function(){
            //  console.log(this.name,this.age,this.salary,this.job)

            return `${this.name} is a ${this.job} earning ${this.salary}`;
            }
}
console.log(typeof(employee))

//accessing object-approach1(using . notation)

console.log(employee.age);//98

console.log(employee.getDetails());//john is a engineer earning 9877

//accessing object -approach2 (using braket notation)

console.log(employee["name"],employee["salary"],employee["job"]);//john 9877 engineer
console.log(employee["getDetails"]());//john is a engineer earning 9877
//syntax objname["key1"],objname["key2"]

//modify the value
employee.job="manager";
// employee["job"]="manager";

console.log("Modified job :",employee["job"]);


// //2.inline Type object -we also define the datatype of the keys (TS)

// let Student:{
//     name :String,
//     age:number,grade:string,
//     getSummary:()=>String
// }=

// {
// name:"Scott",
// age:15,grade:"A",
// getSummary:()=>String{
//     return `${this.name} is ${this.age} years old and scored grade ${this.}`
// }

// }


// //3.suing type aliasas (TS) :allows creating a new name for an existing type

// //example 1;

// type Product={
//     name :String,
//     price: number,
//     getInfo :() => String
// };

