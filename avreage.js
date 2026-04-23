function avg(a, b){
    c = (a+b)/2;
 return c
}

c1 = avg (4,6);
c2 = avg(10,9);

console.log(c1)
console.log(c2)


let marks = 18;
        if (marks > 80) {
            console.log("You are not a kid");
        }
        else if (marks > 40) {
            console.log("Bachhe nahi rahe");
        }
        else if (marks > 35) {
            console.log("Yes Bachhe nahi rahe");
        }
        else if (marks >18 ) {
            console.log("18 Bachhe nahi rahe");
        }
        else {
            console.log("Bachhe rahe");
        }
window.onload = function () {
    let cells = document.querySelectorAll("td:not(:first-child)");

    cells.forEach(function(cell) {
        let marks = parseInt(cell.innerText);
        let result = "";

        if (marks > 90) {
            result = "Topper";
        }
        else if (marks > 80) {
            result = "Excellent";
        }
        else if (marks > 70) {
            result = "Good";
        }
        else if (marks > 60) {
            result = "Average";
        }
        else {
            result = "Needs Improvement";
        }

        // Show result inside the same cell
        cell.innerText = marks + " - " + result;
    });
};