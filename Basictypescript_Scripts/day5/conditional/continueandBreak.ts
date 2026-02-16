

//break

for(let i=0; i<10; i++){
     console.log(i);
    if(i==5){
        break;//it will exit the loop when i is equal to 5
    }
    console.log(i);
}

console.log("***********************");
//continue

for(let i=0; i<10; i++){
    if(i==5){
        continue;//it will skip the iteration when i is equal to 5 and 
        // continue with the next iteration
    }
    console.log(i);
}

console.log("***********************");

for(let i=0; i<10; i++){
    if(i==5||i==7||i==9){
        continue;//it will skip the iteration when i is equal to 5,7,9 and 
        // continue with the next iteration
    }
    console.log(i);
}