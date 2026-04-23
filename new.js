let myarr = ["home" , "fan" , "charger" , 34 , null ,  false];
console.log(myarr) ;
console.log(myarr.lenght);
  myarr.push("harry");
console.log(myarr)
myarr.pop("harry");
console.log(myarr)
myarr.pop();
console.log(myarr)
myarr.shift();
console.log(myarr)
myarr.unshift("laptop");
console.log(myarr)
myarr.toString();
console.log(myarr)
myarr.sort();
console.log(myarr)
//slice()
let str = "harry is a good boy";
console.log(str.slice(0, 19)); 


let number = [1, 2, 3, 4, 5];
console.log(number.slice(2, 5)); 


//SPLICE//
let num = [1, 2, 3 , 4, 5];
num.splice(1, 2); 
console.log(num); 
function check() {
    let score = document.getElementById("score").value;

    if (score >= 50) {
        document.getElementById("result").innerHTML = "Pass";
    } else {
        document.getElementById("result").innerHTML = "Fail";
    }
}

var nu = [1, 2, 3, 4, 5, 6];

console.log(nu);

for (var i = 1; i < nu.length; i++ ) 
  console.log(nu[i]);
let users = [
 {name:"Ali", age:20},
 {name:"John", age:16},
 {name:"Farhan", age:25}
];

let adults = users.filter(user => user.age >=18);

console.log(adults);

let ages = [12,18,25,15,30];

let aged = ages.filter(age => age >= 18);

console.log(aged);
let prices = [100,200,300];

let gst = prices.map(item => item + 18);

console.log(gst); 
 
function makeBurger  (type){

  return type + "burger is ready"
}


console.log(makeBurger )