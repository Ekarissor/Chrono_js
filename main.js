var timer = document.getElementById("timer");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var resetBtn = document.getElementById("resetBtn");
var saveBtn = document.getElementById("saveBtn");
var deleteBtn = document.getElementById("deleteBtn");


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
// On écoute le bouton "startBtn" et exécute la fonction chronoStart.
startBtn.addEventListener("click", chronoStart)
// Fonction qui lance le chronomètre et le met en pause
function chronoStart() {
    if(startBtn.innerHTML == "Start" && timer == "00:00:00:00") {
    start = new Date()
    chrono()
    startBtn.innerHTML = "Stop"
    }
    else if (startBtn.innerHTML == "Start" && timer != "00:00:00:00"){
    start = new Date()-diff
	start = new Date(start)
    chrono()
    startBtn.innerHTML = "Stop"
    }
    else {
    clearTimeout(timerID)
    startBtn.innerHTML = "Start"
    }
}
// On écoute le bouton "resetBtn" et exécute la fonction chronoReset
resetBtn.addEventListener("click", chronoReset)
// Fonction qui remet à 0 le chronomètre
function chronoReset(){
	timer.innerHTML = "0:00:00:000"
    start = new Date()   
}
// On écoute le bouton "deleteBtn" et exécute la fonction removeTimer
deleteBtn.addEventListener("click", removeTimer);
// Cette fonction vide le local storage
function removeTimer(event) { 
  localStorage.clear()
}

// On écoute le bouton "saveBtn" et exécute la fonction saveTimer
saveBtn.addEventListener("click", saveTimer);
// Cette fonction sauvegarde dans le localStorage le timer ainsi que la value inscrite dans l'input
function saveTimer(event) {
    localStorage.setItem("time", timer.innerHTML);
    localStorage.setItem("name", nameInput.value);
}

// On écoute le bouton "saveBtn" et exécute la fonction display
saveBtn.addEventListener("click", display);


function display() {
    // On relie la var board qui contiendra les éléments à la div id="board"
    var board = document.getElementById("board");
    // On crée l'élément p et lui donne une ID
    var pName = document.createElement("p");
    pName.id = "name";
    // On envoie l'élément p dans le board
    board.appendChild(pName);
    var pTime = document.createElement("p");
    pTime.id = "time";
    board.appendChild(pTime);
    //  On envoie le localStorage dans le contenu p
    pName.innerText = localStorage.getItem("name");
    pTime.innerText = localStorage.getItem("time");
}