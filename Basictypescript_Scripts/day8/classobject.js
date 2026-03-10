//class is a logical entity which contains variable and methods
//object is physical entity and an instance of class
//method contains statement .some time method can accept arugement
//class also contains constructor
//constructor will be called when you create object for the class


class student{

    // setDetails(id,name,grade) //sid,sname variable are belongs to local method I want to make the variable as belogs to class use keyword as "THIS"
    // {
    //     //setDetails(sid,sname,grade) 
    //     // this.sid=101;
    //     // this.sname="john";
    //     // this.grade='a';

    //       this.sid=id;
    //     this.sname=name;
    //     this.grade=grade;
    // }

    constructor(id,name,grade) //sid,sname variable are belongs to local method I want to make the variable as belogs to class use keyword as "THIS"
    {
        this.sid=id;
        this.sname=name;
        this.grade=grade;
    }

    display()
    {
        console.log(this.sid,this.sname,this.grade);
    }

    
}
// let stu=new student(); 
// stu.setDetails(101,"lavanya","A+");//call assign value to that variable
// stu.display();// 101 john

//constructor invoke automatically when the object creation without help object ref like method
 let stu=new student(100,"lava","o");
 stu.display();

 //I can create many number of object 

 let stu1=new student(101,"lavaan","o4");
 stu1.display();
 let stu2=new student(102,"lavay","o1");
 stu2.display();
 let stu3=new student(103,"lavan","o2");
  stu3.display();