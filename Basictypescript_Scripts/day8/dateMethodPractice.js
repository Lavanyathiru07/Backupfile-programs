let d=new Date();
 
console.log(d);

console.log(d.getDate());//1-31
console.log(d.getMonth()+1);//0-11 //month number count start from 0 so You want means just you add one then you get current month count
console.log(d.getFullYear());//current year

console.log(d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear());

console.log(d.getHours());//0-23
console.log(d.getMinutes());//0-59
console.log(d.getSeconds());//0-59


console.log(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());

