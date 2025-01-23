//Function
let a=prompt();
console.log("Let's begin");

for(i=0;i<a;i++){
    let b=prompt();
    let c=prompt();
    func(b,c);
}

function func(name,place){
  console.log("My name is",name,"and I'm from",place);
}