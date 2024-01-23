const main_menu = document.getElementById("main_menu");

const start_screen = document.getElementById("start_screen");
const play = document.getElementById("play");
const rules = document.getElementById("rules");
const controls = document.getElementById("controls");

const game_mode_screen = document.getElementById("select_game_mode");
const player_vs_player = document.getElementById("pvp");
const player_vs_computer = document.getElementById("pvc");
const game_mode_exit = document.getElementById("game_mode_exit");

const winner_screen = document.getElementById("winner_screen");
const play_again = document.getElementById("restart_game");
const winner_screen_exit = document.getElementById("winner_exit");

const pause_screen = document.getElementById("pause_screen");
const resume_game = document.getElementById("resume_game");
const pause_screen_exit = document.getElementById("pause_exit");

const rules_screen = document.getElementById("rules_screen");
const rules_screen_exit = document.getElementById("rules_exit");

const controls_screen = document.getElementById("controls_screen");
const controls_screen_exit = document.getElementById("controls_exit");

play.onclick = function() {
    start_screen.style.display = "none";
    game_mode_screen.style.display = "block";
}

rules.onclick = function() {
    start_screen.style.display = "none";
    rules_screen.style.display = "block";
}

controls.onclick = function() {
    start_screen.style.display = "none";
    controls_screen.style.display = "block";
}

player_vs_player.onclick = function() {
    main_menu.style.display = "none";
    start_screen.style.display = "block";
    game_mode_screen.style.display = "none";
    pause = false;
    computer_active = false;
    setCountdown();
}

player_vs_computer.onclick = function() {
    main_menu.style.display = "none";
    start_screen.style.display = "block";
    game_mode_screen.style.display = "none";
    pause = false;
    computer_active = true;
    setCountdown();
}

game_mode_exit.onclick = function() {
    start_screen.style.display = "block";
    game_mode_screen.style.display = "none";
}

play_again.onclick = function() {
    winner_screen.style.display = "none";
    resetValues();
    pause = false;
    setCountdown();
}

winner_screen_exit.onclick = function() {
    winner_screen.style.display = "none";
    main_menu.style.display = "block";
    resetValues();
}

resume_game.onclick = function() {
    pause = false;
    resumeGame();
}

pause_screen_exit.onclick = function() {
    pause_screen.style.display = "none"
    main_menu.style.display = "block";
    game_active = false;
    resetValues();
}

rules_screen_exit.onclick = function() {
    rules_screen.style.display = "none";
    start_screen.style.display = "block";
}

controls_screen_exit.onclick = function() {
    controls_screen.style.display = "none";
    start_screen.style.display = "block";
}

function setCountdown() {
    calculateCountdown();
    countdown = setInterval(calculateCountdown, 1000);
}

function pauseGame() {
    pause_screen.style.display = "block";
}

function resumeGame() {
    pause_screen.style.display = "none";
}