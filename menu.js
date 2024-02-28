const main_menu = document.getElementById("main_menu");
const skill_set_screen = document.getElementById("skill_set_screen");
const html_css_screen = document.getElementById("html_css_screen");
const game_select_screen = document.getElementById("game_select_screen");
const info_screen = document.getElementById("info_screen");

const html_css = document.getElementById("html_css");
const javascript = document.getElementById("javascript");

const google = document.getElementById("google");
const login = document.getElementById("login");


const pong = document.getElementById("pong");
const tetris = document.getElementById("tetris");
const info = document.getElementById("info");
const info_exit = document.getElementById("info_exit");

html_css.onclick = function() {
    skill_set_screen.style.display = "none";
    html_css_screen.style.display = "block";
}

javascript.onclick = function() {
    skill_set_screen.style.display = "none";
    game_select_screen.style.display = "block";
}

google.onclick = function() {
    window.location.href = "https://jm72458.github.io/Google/index.html"
}

login.onclick = function() {
    window.location.href = "https://jm72458.github.io/Login/index.html"
}

pong.onclick = function() {
    window.location.href = "https://jm72458.github.io/Pong/index.html"
}

tetris.onclick = function() {
    window.location.href = "https://jm72458.github.io/Tetris/index.html"
}

info.onclick = function() {
    game_select_screen.style.display = "none";
    info_screen.style.display = "block";
}

info_exit.onclick = function() {
    game_select_screen.style.display = "block";
    info_screen.style.display = "none";
}