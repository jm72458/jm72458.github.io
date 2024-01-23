/*
Completion Time: 2 days
*/
const canvas = document.getElementById('board');
const canvas_w = 1600;
const canvas_h = 1200;

//Set up Canvas
canvas.width = canvas_w;
canvas.height = canvas_h;

//Paddle Location, Size, Speed
const paddle_w = 20;
const paddle_h = 120;
const p1_x = 90;
const p2_x = 1490;
let p1_y = (canvas_h/2) - (paddle_h/2);
let p2_y = (canvas_h/2) - (paddle_h/2);
const paddle_speed = 9;

//Ball Size and Location
const ball_w_h = 20;
let ball_x = (canvas_w/2) - (ball_w_h/2);
let ball_y = (canvas_h/2) - (ball_w_h/2);
const ball_start_speed = 5;
const ball_speed = 10;

//Net Size and Location
const net_width = "12";
const net_x = 800;
const net_top_y = 134;
const net_bottom_y = 1120;
const net_segments = 14;
const net_iterations = 20;

//Player Scores
const winner_display = document.getElementById("winner").firstChild;
let p1_score = 0;
let p2_score = 0;
const max_score = 10;

//Game countdown
var countdown = null;
let count_num = 3;
const count_background_w_h = 230;

//For Ball Movement Calculations
let player_serve = Math.floor(Math.random() * 2) + 1;
let ball_angle = Math.floor(Math.random() * 2);
let first_hit = false;
let game_active = false;
let respawn_delay = false;
const respawn_delay_time = 90;
let pause = true;

//For 1 player Calculations
let computer_active = false;
const computer_wait_speed = 4;
const computer_chase_speed = 9;
let computer_direction = -1;
const edge_return_size = 3
let follow_ball = false;

/*---------------------------------------------Set up Board-------------------------------------------------*/
if(canvas.getContext) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';

    //Player 1
    ctx.fillRect(p1_x, p1_y, paddle_w, paddle_h);

    //Player 2
    ctx.fillRect(p2_x, p2_y, paddle_w, paddle_h);

    //Net
    drawNet();

    //Scores
    drawScores();
}

/*---------------------------------------------Controls-------------------------------------------------*/
//Link functions to keys
const move_player = { 
    87: {pressed: false, func: p1MoveUp}, 
    83: {pressed: false, func: p1MoveDown},
    38: {pressed: false, func: p2MoveUp}, 
    40: {pressed: false, func: p2MoveDown}}

//Activate movements when players press button
document.addEventListener("keydown", (e) => {
    switch(e.keyCode) {
        case 87:
            move_player[e.keyCode].pressed = true;
            break;
        case 83:
            move_player[e.keyCode].pressed = true;
            break;
        case 38:
            if (!computer_active) {
                move_player[e.keyCode].pressed = true;
            }
            break;
        case 40:
            if (!computer_active) {
                move_player[e.keyCode].pressed = true;
            }
            break;
    }
})

//Stop movements when players release button
document.addEventListener("keyup", (e) => {
    switch(e.keyCode) {
        case 87:
            move_player[e.keyCode].pressed = false;
            break;
        case 83:
            move_player[e.keyCode].pressed = false;
            break;
        case 38:
            if (!computer_active) {
                move_player[e.keyCode].pressed = false;
            }
            break;
        case 40:
            if (!computer_active) {
                move_player[e.keyCode].pressed = false;
            }
            break;
        case 27:
        case 80:
            if (game_active) {
                pause = !pause;
                if (pause) {
                    pauseGame();
                }
                else {
                    resumeGame();
                }
            }
            break;
    }
})

/*Purpose: Allows another key to be pressed without interrupting the other pressed key
  This function continuously loops
  Checks booleans to determine active keys and keeps their functions running if the keyup event has not activated 
*/
const executeMoves = () => {
    Object.keys(move_player).forEach(key=> {
        move_player[key].pressed && move_player[key].func()
    })
}

/*---------------------------------------------Drawing Game Objects-------------------------------------------------*/
function drawP1() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.clearRect(p1_x, p1_y, paddle_w, paddle_h); 
    ctx.fillRect(p1_x, p1_y, paddle_w, paddle_h);
}

function drawP2() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.clearRect(p2_x, p2_y, paddle_w, paddle_h); 
    ctx.fillRect(p2_x, p2_y, paddle_w, paddle_h);
}

function drawNet() {
    ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.lineWidth = "12";
    ctx.strokeStyle = "#FFFFFF";
    ctx.setLineDash([net_segments, net_iterations]);
    ctx.moveTo(net_x, net_top_y);
    ctx.lineTo(net_x, net_bottom_y);
    ctx.stroke();
}

function drawScores() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "120px 'Courier New'";
    ctx.textAlign = "center"; 

    //p1 score
    ctx.fillText(p1_score, canvas_w/4, 180);

    //p2 score
    ctx.fillText(p2_score, (canvas_w - canvas_w/4), 180);
}

function drawCountdown() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect((canvas_w/2) - (count_background_w_h/2), (canvas_h/2) - (count_background_w_h/2), count_background_w_h, count_background_w_h);

    ctx.fillStyle = '#00C200';
    ctx.font = "200px 'Courier New'";
    ctx.textAlign = "center"; 
    ctx.fillText(count_num + 1, canvas_w/2, canvas_h/2 + 55);
}

function drawBall() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(ball_x, ball_y, ball_w_h, ball_w_h);
}

/*---------------------------------------------Calculations-------------------------------------------------*/
function p1MoveUp() {
    if (p1_y > 0 && !pause && game_active) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(p1_x, p1_y, paddle_w, paddle_h); 
        p1_y -= paddle_speed;
        drawP1();
    }
}

function p1MoveDown() {
    if (p1_y < canvas_h - paddle_h && !pause && game_active) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(p1_x, p1_y, paddle_w, paddle_h); 
        p1_y += paddle_speed;
        drawP1();
    }
}

function p2MoveUp() {
    if (p2_y > 0 && !pause  && game_active) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(p2_x, p2_y, paddle_w, paddle_h); 
        p2_y -= paddle_speed;
        drawP2();
    }
}

function p2MoveDown() {
    if (p2_y < canvas_h - paddle_h && !pause && game_active) {
        ctx = canvas.getContext('2d');
        ctx.clearRect(p2_x, p2_y, paddle_w, paddle_h); 
        p2_y += paddle_speed;
        drawP2();
    }
}

function computerMoveUp(speed) {
    ctx = canvas.getContext('2d');
    ctx.clearRect(p2_x, p2_y, paddle_w, paddle_h); 
    p2_y -= speed;
    drawP2();
}

function computerMoveDown(speed) {
    ctx = canvas.getContext('2d');
    ctx.clearRect(p2_x, p2_y, paddle_w, paddle_h); 
    p2_y += speed;
    drawP2();
}

function calculateCountdown() {
    if (count_num != 0) {
        count_num -= 1;
    }
    else {
        clearInterval(countdown);
        countdown = null;
        game_active = true;
        calculateBall();
    }
}

function calculateBall() {
    let speed = 0;
    if (!first_hit) {
        speed = ball_start_speed;
    }
    else {
        speed = ball_speed;
    }

    //Move ball horizontally
    if (player_serve == 1) {
        ball_x -= speed;
    }
    else {
        ball_x += speed;
    }

    //Move ball vertically
    if (ball_angle == 0) {
        ball_y -= speed;
    }
    else {
        ball_y += speed;
    }

    //A player has scored
    if (!respawn_delay) {
        if (ball_x >= ball_w_h + canvas_w) {
            changeScore(1);
        }
        else if (ball_x <= -ball_w_h) {
            changeScore(2);
        }
    }
    else {
        if (ball_x >= ball_w_h + canvas_w + (speed * respawn_delay_time) || ball_x <= -ball_w_h - (speed * respawn_delay_time)) {
            respawn_delay = false;
            resetBall();
        }
    }

    //Ball hit edge
    if (ball_y <= 0) {
        ball_angle = 1;
    }
    else if (ball_y >= canvas_h - ball_w_h) {
        ball_angle = 0;
    }

    //Bounce ball back
    if (ball_x <= p1_x + paddle_w && ball_x >= p1_x) {
        if ((ball_y >= p1_y && ball_y <= p1_y + paddle_h) || (ball_y + ball_w_h >= p1_y && ball_y + ball_w_h <= p1_y + paddle_h)) {
            player_serve = 2;
            first_hit = true;
        }
    }
    else if (ball_x + ball_w_h >= p2_x && ball_x + ball_w_h <= p2_x + paddle_w) {
        if ((ball_y >= p2_y && ball_y <= p2_y + paddle_h) || (ball_y + ball_w_h >= p2_y && ball_y + ball_w_h <= p2_y + paddle_h)) {
            player_serve = 1;
            first_hit = true;
        }
    }

    drawBall();
}

function calculateComputer() {
    if (player_serve == 2) {
        let speed = computer_chase_speed;
        if (follow_ball) {
            speed = ball_start_speed;
        }

        if (ball_y + (ball_w_h/2) > p2_y + (paddle_h/2) + (1.3 * ball_w_h) && p2_y + paddle_h < canvas_h - (ball_w_h - 1)) {
            computerMoveDown(speed);
        }
        else if (ball_y + (ball_w_h/2) < p2_y + (paddle_h/2) - (1.3 * ball_w_h) && p2_y > 0 + (ball_w_h - 1)) {
            computerMoveUp(speed);
        }
        else {
            if (!first_hit) {
                follow_ball = true;
            }
        }
        computer_direction = -1;
    }
    else {
        follow_ball = false;
        if (computer_direction == -1) {
            if (canvas_h/2 < p2_y + (paddle_h/2)) {
                computerMoveUp(computer_wait_speed);
                computer_direction = 1;
            }
            else if (canvas_h/2 > p2_y + (paddle_h/2)) {
                computerMoveDown(computer_wait_speed);
                computer_direction = 0;
            }
            else {
                computer_direction = Math.floor(Math.random() * 2);
            }
        }
        else {
            if (computer_direction == 1) {
                computerMoveUp(computer_wait_speed);
            }
            else if (computer_direction == 0){
                computerMoveDown(computer_wait_speed);
            }

            //Move in other direction if close to edge
            if (p2_y <= ball_w_h * edge_return_size) {
                computer_direction = 0;
            }
            else if (p2_y + paddle_h >= canvas_h - (ball_w_h * edge_return_size)) {
                computer_direction = 1;
            }
        }
    }
}

function changeScore(player){
    
    if (player == 1) {
        p1_score += 1;
        if (p1_score == max_score) {
            game_active = false;
        }
    }
    else {
        p2_score += 1;
        if (p2_score == max_score) {
            game_active = false;
        }
    }

    if (game_active) {
        respawn_delay = true;
    }
    else {
        displayWinner(player);
    }
}

/*---------------------------------------------Reset Values-------------------------------------------------*/
function displayWinner(player) {
    game_active = false;
    pause = true;
    first_hit = false;
    winner_display.nodeValue = "Player " + player + " Won!";
    winner_screen.style.display = "block";
}

function resetBall() {
    ball_x = (canvas_w/2) - (ball_w_h/2);
    ball_y = Math.floor(Math.random() * (canvas_h - canvas_h/5) + canvas_h/5);
    first_hit = false;
    ball_angle = Math.floor(Math.random() * 2);
}

function resetValues() {
    p1_score = 0;
    p2_score = 0;
    first_hit = false;
    count_num = 3;
    p1_y = (canvas_h/2) - (paddle_h/2);
    p2_y = (canvas_h/2) - (paddle_h/2);
    ball_x = (canvas_w/2) - (ball_w_h/2);
    ball_y = (canvas_h/2) - (ball_w_h/2);
}

//Loops continuously and acts as a checker
const animate = () => {
    //Clear board and redraw everything
    ctx.clearRect(0, 0, canvas_w, canvas_h);
    drawNet();
    drawP1();
    drawP2();
    drawScores();
    executeMoves();

    if (computer_active && !pause && game_active) {
        calculateComputer();
    }
    
    if (game_active && !pause) {
        calculateBall();
    }
    else if (pause) {
        drawBall();
    }
    
    if (countdown != null) {
        drawCountdown();
    }

    window.requestAnimationFrame(animate);
}

//To start the loop
window.requestAnimationFrame(animate);