const main_menu = document.getElementById("main_menu");

const start_screen = document.getElementById("start_screen");
const play = document.getElementById("play");
const info = document.getElementById("info");
const controls = document.getElementById("controls");

const info_screen = document.getElementById("info_screen");
const info_paragraphs = document.getElementsByClassName("paragraphs")[0];
const info_img = document.getElementsByClassName("img")[0];
const info_left = document.getElementById("info_left");
const info_right = document.getElementById("info_right");
const info_exit = document.getElementById("info_exit");

const controls_screen = document.getElementById("controls_screen");
const controls_exit = document.getElementById("controls_exit");

const pause_screen = document.getElementById("pause_screen");
const resume = document.getElementById("resume_game");
const pause_exit = document.getElementById("pause_exit");

const game_over_screen = document.getElementById("game_over_screen");
const final_score = document.getElementById("final_score");
const play_again = document.getElementById("play_again");
const game_over_exit = document.getElementById("game_over_exit");

let scoreboard_score = document.getElementById("scoreboard_score");
let scoreboard_level = document.getElementById("scoreboard_level");
let scoreboard_lines = document.getElementById("scoreboard_lines");

play.onclick = function() {
    main_menu.style.display = "none";
    startGame();
}

info.onclick = function() {
    start_screen.style.display = "none";
    info_screen.style.display = "block";
}

info_left.onclick = function() {
    changeInfoScreen();
}

info_right.onclick = function() {
    changeInfoScreen();
}

function changeInfoScreen() {
    if (window.getComputedStyle(info_paragraphs).getPropertyValue('display') == "block") {
        info_paragraphs.style.display = "none";
        info_img.style.display = "flex";
    }
    else {
        info_paragraphs.style.display = "block";
        info_img.style.display = "none";
    }
}

info_exit.onclick = function() {
    info_screen.style.display = "none";
    start_screen.style.display = "block";
}

controls.onclick = function() {
    start_screen.style.display = "none";
    controls_screen.style.display = "block";
}

controls_exit.onclick = function() {
    controls_screen.style.display = "none";
    start_screen.style.display = "block";
}

function showPauseMenu() {
    pause_screen.style.display = "block";
}

resume.onclick = function() {
    resumeGame();
    pause_screen.style.display = "none";
}

pause_exit.onclick = function() {
    returnMainMenu();
}

function closePauseMenu() {
    pause_screen.style.display = "none";
}

function showGameOverScreen() {
    game_over_screen.style.display = "block";
    final_score.innerHTML = player_points;
}

play_again.onclick = function() {
    game_over_screen.style.display = "none";
    resetValues();
    startGame();
}

game_over_exit.onclick = function() {
    returnMainMenu();
}

function returnMainMenu(){
    resetValues();
    game_over_screen.style.display = "none";
    pause_screen.style.display = "none";
    main_menu.style.display = "block";
}
