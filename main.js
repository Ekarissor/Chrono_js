// Here are all the variables used to create the stopwatch

var timer = document.getElementById("timer");

var startBtn = document.getElementById("startBtn");

var stopBtn = document.getElementById("stopBtn");

var resetBtn = document.getElementById("resetBtn");

var saveBtn = document.getElementById("saveBtn");

var deleteBtn = document.getElementById("deleteBtn");

var showBtn = document.getElementById("showBtn");

var boardName = document.getElementById("boardName");

var boardTime = document.getElementById("boardTime");

var nameInput = document.getElementById("nameInput");

var inputError = document.getElementById("inputError");

var printBtn = document.getElementById("printBtn");

var lbArray = [];

//  ------------------------------------

var startTime = 0

var start = 0

var end = 0

var diff = 0

var timerID = 0

function chrono() {

    end = new Date()

    diff = end - start

    diff = new Date(diff)

    var msec = diff.getMilliseconds()

    var sec = diff.getSeconds()

    var min = diff.getMinutes()

    var hr = diff.getHours() - 1

    if (min < 10) {

        min = "0" + min

    }

    if (sec < 10) {

        sec = "0" + sec

    }

    if (msec < 10) {

        msec = "00" + msec

    }

    else if (msec < 100) {

        msec = "0" + msec

    }

    timer.innerHTML = hr + ":" + min + ":" + sec + ":" + msec

    timerID = setTimeout("chrono()", 10)

}

// The button "startBtn" execute the function "chronoStart" when clicked.

startBtn.addEventListener("click", chronoStart)

// This function has for mission to start and pause the stopwatch.

function chronoStart() {

    if (startBtn.innerHTML == "START" && timer == "00:00:00:00") {

        start = new Date()

        chrono()

        startBtn.innerHTML = "STOP"

    }

    else if (startBtn.innerHTML == "START" && timer != "00:00:00:00") {

        start = new Date() - diff

        start = new Date(start)

        chrono()

        startBtn.innerHTML = "STOP"

    }

    else {

        clearTimeout(timerID)

        startBtn.innerHTML = "START"

    }

}

// The button "resetBtn" execute the function "chronoReset" when clicked.

resetBtn.addEventListener("click", chronoReset)

// This function has for mission to reload the window what reset our stopwatch.

function chronoReset() {

    document.location.reload(true);

}

// The button "deleteBtn" execute the function "removeTimer" when clicked.

deleteBtn.addEventListener("click", removeTimer);

// This function has for mission to clear the localStorage and also delete all data in our table.

function removeTimer(event) {

    localStorage.clear()
    lbArray = []
}



// The button "saveBtn" execute the function "saveTimer" when clicked.

saveBtn.addEventListener("click", saveTimer);

// This function has for mission to check if input is not empty. If not, it will save data into the localStorage and push it in a table.

function saveTimer(event) {
    if (nameInput.value == "") {
        inputError.innerHTML = "YOU HAVE TO INSERT A NAME TO SAVE";
    }
    else {
        inputError.innerHTML = "";
        var lbObject = {
            name: nameInput.value,
            time: timer.innerHTML,
        };
        lbArray.push(lbObject);
        localStorage.setItem("leaderboard", JSON.stringify(lbArray));
    }
}


// The button "showBtn" execute the function "display" when clicked.

showBtn.addEventListener("click", display);

// This function has for mission to display our table by getting data into localStorage and push them into "li" element in a table.

function display() {
    var leaderboardList = JSON.parse(localStorage.getItem('leaderboard'));
    boardName.innerHTML = '';
    boardTime.innerHTML = '';
    leaderboardList.forEach(function (score) {
        // We create the element "li" and gave him classes
        var liName = document.createElement("li");
        liName.className = "name text-truncate";
        // Push our element "li" into the table
        boardName.appendChild(liName);
        var liTime = document.createElement("li");
        liTime.className = "time";
        boardTime.appendChild(liTime);
        //  Sending localStorage data into "li" element
        liName.innerText = score.name;
        liTime.innerText = score.time;
    }
    );

}

// On écoute le bouton "showBtn" et exécute la fonction printPage
printBtn.addEventListener("click", printPage);

// printPage ouvre l'option print
function printPage() {
    window.print();
}