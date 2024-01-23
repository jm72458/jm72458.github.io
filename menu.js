const main_menu = document.getElementById("main_menu");
const game_select_screen = document.getElementById("game_select_screen");
const info_screen = document.getElementById("info_screen");
const pong = document.getElementById("pong");
const tetris = document.getElementById("tetris");
const info = document.getElementById("info");
const info_exit = document.getElementById("info_exit");


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