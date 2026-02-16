//number

var first:number=12.0;
var second:number=0x37cf;
var third:number=0b1101;
console.log(first);
console.log(second);


//string


var empName:String="lavanya";
var empDept:string="QA";
 var stmt=empName+"work in "+empDept;
 console.log(stmt);


 //Boolean

 var b:boolean=true;
 console.log(b);

 //void type---this is not return any value

 function hello():void{
    console.log("this is welcome message");
 }


 //Null:null represent a variable whose value is undefined

 var num12:number=null;
 num12=90;
 console.log(num12);

 //undefinied type --bacially is a primitive type denotes all uninitialized variables

 var num23:number=undefined;
 num23=900;
 console.log(num23);


 //any type

 var val:any="Hi";
 val=100;

 console.log(val);

 //function is a block statement and its perform certain activity

 function myfunction(x:any,y:any)
 {
    console.log(x+y);
 }
myfunction("hellow",89)
myfunction(67,90);
myfunction(`Hellow`,` hi`);



