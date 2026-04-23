window.onload = function () {

    let rows = document.querySelectorAll("table tr");

    // 👉 Add header
    let header = rows[0];
    let newHeader = document.createElement("th");
    newHeader.innerText = "Performance";
    header.appendChild(newHeader);

    // 👉 Loop through each student row
    rows.forEach(function(row, index) {

        if (index === 0) return; // skip header

        let cells = row.querySelectorAll("td");
        if (cells.length === 0) return;

        let total = 0;
        let count = 0;

        // 👉 skip first column (student number)
        for (let i = 1; i < cells.length; i++) {
            let marks = parseInt(cells[i].innerText);
            if (!isNaN(marks)) {
                total += marks;
                count++;
            }
        }

        let avg = total / count;

        let result = "";

        // 👉 YOUR IF-ELSE LOGIC APPLIED
        if (avg > 32) {
            result = "You are not a kid";
        }
        else if (avg > 26) {
            result = "Bachhe nahi rahe";
        }
        else if (avg > 22) {
            result = "Yes Bachhe nahi rahe";
        }
        else if (avg > 18) {
            result = "18 Bachhe nahi rahe";
        }
        else {
            result = "Bachhe rahe";
        }

        // 👉 Add new cell
        let newCell = document.createElement("td");
        newCell.innerText = result;

        row.appendChild(newCell);
    });
};