///============for each(),map(),reduce(),some(),every()===========
//1.foreach()
//execute a function once for each array element
//It takes function as a parameter
//syntax:array.foreach(function(currentvalue,index,array){})
//currentvalue -The current element being processed in the arry
//index(optional)-The index of the current element being processed in the array
//array(optional)-the array the current element belongs to.
//ex1:get index of all the fruits along with value
var fruitss = ['apple', 'orange', 'banana'];
for (var i in fruitss) {
    console.log(fruitss[i]);
}
fruitss.forEach(function (element, index) {
    //console.log(`${index}`,`${element}`)
    console.log(index, element);
});
//ex2:
fruitss.forEach(function (element) {
    console.log(element.toUpperCase());
});
//2.map()-create a new array with the result of calling the unction on every element of an array
//It takes function as as parameter
//returns the same number of element that we have in original array.
