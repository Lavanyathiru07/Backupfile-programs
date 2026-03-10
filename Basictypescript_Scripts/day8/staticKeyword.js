// each object get own space so memory waste
//you wnat to change the value in all place

//you define the static keyword for variable and method

//static methods and variable directly access the variable directly withot creating object

class test
{
   static a=10; //inside the class you not need mention let,var,vhar keyword //static variable
    b=20; //non static variable

    static m1(){
        console.log("static method");
    }

    m2()
    {
        console.log("non static method");
    }
    
}

//1)we can directly access static variable and methods using class name

console.log(test.a);//10
test.a=1000;
console.log(test.a);//1000 //modify the a value with the help of class name
// console.log(test.b);//undefined because this non static variable we cant access the variable through class only obj

test.m1();
// test.m2();


//2)we can access non static variable & methods using object

let t= new test();
 console.log(t.b);
t.m2();
 
