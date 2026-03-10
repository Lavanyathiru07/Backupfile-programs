//module /utility means reusable component

export let appname="calculator";

export function add(a:number,b:number):number{
    return a+b;
}

export class formatter{
    static toupper(str:string):string{
        return str.toUpperCase();
    }
}

//Im using export keyword to export this modules after declared export keyword then All become module

class person{
    public name1:string; //you can access the variable anywhere
    protected age1:String;//protected can access within the class and child class
   private ssn:number;//private can access with in class
   constructor(name1:string,age1:String,ssn:number)
   {
    this.name1=name1;
    this.age1=age1;
    this.ssn=ssn;

   }

   displayinfo()
   {
    console.log(this.name1,this.age1,this.ssn)
   }
}