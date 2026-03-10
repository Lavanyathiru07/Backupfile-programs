/*
1.An interface in typescript is a way to define the structure of an object
2)i tells the complier what propertied and types an object should have
3.It's like a blueprint for object
Abstract mrthod: we only signature of the method (there is  no implementattion)
 
interface InterfaceName
{
properties
abstract method
}
1.Regular properties
2.optional properties
3.readonly properties and function types
4.extending interfaces
5.class implements interface

*/

//example 1: Basic interface 

interface Person{
    name:string;
    age:number;
}


let student1:Person={
    name:"lavan",
    age:23

}

console.log(student1.age)//23
console.log(student1);//{ name: 'lavan', age: 23 }


//example 2:optional properties(?)

interface Employee{
    id:number;
    name:String;
    dept?:String
}

let emp:Employee={
    id:89,
    name:"test",
    dept:'QA'
    
}

console.log(emp);//{ id: 89, name: 'test' }
console.log(emp.name,emp.id,emp.dept)//test 89 QA


//example 3 read only properties

interface Book{
    title:String;
   readonly ISbn:String;
display():void;//abstract method
}

let b1:Book={
    title:'learn playwrite', 
    ISbn:"123-ASD",
    display() {
        console.log("testring")
    }
}
//before changing
console.log(b1.ISbn);
b1.display();

//after changing the value

b1.title="learn typescript";
console.log(b1.title);//learn typescript

// b1.ISbn="984r"; you cant read the value because this is read only property

//example :extending interface (inherittance is applicable)

interface Animal{
    name:String;
}

//child interface

interface Dog extends Animal{
    //static colour:String;//static keyword cant be declare in interface but it will accept in class
    colour:String;
}

let mydog:Dog={
    name:'buddy',
    colour:'black'
}

console.log(mydog.name,mydog.colour);//buddy black


//example 5 class can extends another class

//interface can extends another interface

//class can implement interface 

interface Fruits{
    name:string,
    colour():void;
}

class seed implements Fruits{
    name:string;
    static taste:string;
     constructor (name:string,taste:String)
     {
        this.name=name;
        taste=taste; // no need to mention the "this" keyword here because this static variable it is intial inside the class
     }

     colour(): void {
         console.log("testinggggggg");
     }
}//which are presented in parent interface you should declare and implement in chilc class


let plant=new seed("apple","good")
console.log(plant.name,seed.taste);//apple good here taste with classname mention because that is static variable
plant.colour();//testinggggggg


//if you dont want that methods you should redeclared that No need to assign the value here

//interface contains abstruct methods 






















