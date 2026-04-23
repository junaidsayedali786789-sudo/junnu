
window.onload = function () {
    let cells = document.querySelectorAll("td:not(:first-child)");

    cells.forEach(function(cell) {
        let marks = parseInt(cell.innerText);

        if (marks > 90) {
            console.log("Topper");
        }
        else if (marks > 80) {
            console.log("Excellent");
        }
        else if (marks > 70) {
            console.log("Good");
        }
        else if (marks > 60) {
            console.log("Average");
        }
        else {
            console.log("Needs Improvement");
        } 


         let j = 0;
         while(j > Arr.length){console.log(arr[j]);
         j ++}
         do{
            console.log(arr[j]);
            j++;}
            while(j < arr.length)
    });
let nums = [1, 2, 3, 4];
let i = 0;
let sum = 0;

do {
    sum += nums[i];
    i++;
} while (i < nums.length);

console.log("Sum:", sum);
};

 
 
































































































































































































































































































































