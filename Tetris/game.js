/*
Completion Time: 3 weeks - (5 day vacation during this time)
*/
const rows_above_grid = 3;
const grid_w = 10;
const grid_h = 20 + rows_above_grid;
const grid_block_w_h = 35;
const grid_block_border = 2;
const background_color = "#000000";
const border_color = "#292929";

const canvas = document.getElementById('main_canvas');
const canvas_w = (grid_w * grid_block_w_h) + grid_block_border;
const canvas_h = (grid_h - rows_above_grid) * grid_block_w_h + grid_block_border;
canvas.width = canvas_w;
canvas.height = canvas_h;

const next_canvas = document.getElementById('next_canvas');
const next_w = 5 * grid_block_w_h;
const next_h = 8 * grid_block_w_h;
next_canvas.width = next_w;
next_canvas.height = next_h;

const hold_canvas = document.getElementById("hold_canvas");
const hold_w = 5 * grid_block_w_h;
const hold_h = 3 * grid_block_w_h;
hold_canvas.width = hold_w;
hold_canvas.height = hold_h;

//Tetrimino Block Size
const tetrimino_w = 3;
const tetrimino_h = 3;
const tetrimino_outline = 5;
const ghost_outline = 3;

//I Tetrimino Information
const i_w = 4;
const i_h = 4;
const i_r1_blocks = [{x:0, y:1},{x:1, y:1},{x:2, y:1},{x:3, y:1}];
const i_r2_blocks = [{x:1, y:0},{x:1, y:1},{x:1, y:2},{x:1, y:3}];
const i_r3_blocks = [{x:0, y:2},{x:1, y:2},{x:2, y:2},{x:3, y:2}];
const i_r4_blocks = [{x:2, y:0},{x:2, y:1},{x:2, y:2},{x:2, y:3}];

//O Tetrimino Information
const o_w_h = 2;
const o_blocks = [{x:0, y:0},{x:1, y:0},{x:0, y:1},{x:1, y:1}];

//J Tetrimino Information
//const j_empty_blocks = [{x:1, y:0},{x:2, y:0}];
const j_r1_blocks = [{x:0, y:0},{x:0, y:1},{x:1, y:1},{x:2, y:1}];
const j_r2_blocks = [{x:1, y:0},{x:2, y:0},{x:1, y:1},{x:1, y:2}];
const j_r3_blocks = [{x:0, y:1},{x:1, y:1},{x:2, y:1},{x:2, y:2}];
const j_r4_blocks = [{x:1, y:0},{x:1, y:1},{x:0, y:2},{x:1, y:2}];

//L Tetrimino Information
//const l_empty_blocks = [{x:0, y:0},{x:1, y:0}];
const l_r1_blocks = [{x:2, y:0},{x:0, y:1},{x:1, y:1},{x:2, y:1}];
const l_r2_blocks = [{x:1, y:0},{x:1, y:1},{x:1, y:2},{x:2, y:2}];
const l_r3_blocks = [{x:0, y:1},{x:1, y:1},{x:2, y:1},{x:0, y:2}];
const l_r4_blocks = [{x:0, y:0},{x:1, y:0},{x:1, y:1},{x:1, y:2}];

//S Tetrimino Information
//const s_empty_blocks = [{x:0, y:0},{x:2, y:1}];
const s_r1_blocks = [{x:1, y:0},{x:2, y:0},{x:0, y:1},{x:1, y:1}];
const s_r2_blocks = [{x:1, y:0},{x:1, y:1},{x:2, y:1},{x:2, y:2}];
const s_r3_blocks = [{x:1, y:1},{x:2, y:1},{x:0, y:2},{x:1, y:2}];
const s_r4_blocks = [{x:0, y:0},{x:0, y:1},{x:1, y:1},{x:1, y:2}];

//T Tetrimino Information
//const t_empty_blocks = [{x:0, y:0},{x:2, y:0}];
const t_r1_blocks = [{x:1, y:0},{x:0, y:1},{x:1, y:1},{x:2, y:1}];
const t_r2_blocks = [{x:1, y:0},{x:1, y:1},{x:2, y:1},{x:1, y:2}];
const t_r3_blocks = [{x:0, y:1},{x:1, y:1},{x:2, y:1},{x:1, y:2}];
const t_r4_blocks = [{x:1, y:0},{x:0, y:1},{x:1, y:1},{x:1, y:2}];

//Z Tetrimino Information
//const z_empty_blocks = [{x:0, y:1},{x:2, y:0}];
const z_r1_blocks = [{x:0, y:0},{x:1, y:0},{x:1, y:1},{x:2, y:1}];
const z_r2_blocks = [{x:2, y:0},{x:1, y:1},{x:2, y:1},{x:1, y:2}];
const z_r3_blocks = [{x:0, y:1},{x:1, y:1},{x:1, y:2},{x:2, y:2}];
const z_r4_blocks = [{x:1, y:0},{x:0, y:1},{x:1, y:1},{x:0, y:2}];

const tetrimino = [
{/*Cyan*/ name: "I", w:i_w, h:i_h, start_x: 3, color: "#00CCCC", outline1: "#00FFFF", outline2: "#009999", draw: drawTetrimino, r1_blocks: i_r1_blocks, r2_blocks: i_r2_blocks, r3_blocks: i_r3_blocks, r4_blocks: i_r4_blocks},
{/*Yellow*/ name: "O", w:o_w_h, h:o_w_h, start_x: 4, color: "#CCCC00", outline1: "#FFFF00", outline2: "#999900", draw: drawOTetrimino, r1_blocks: o_blocks, r2_blocks: o_blocks, r3_blocks: o_blocks, r4_blocks: o_blocks}, 
{/*Blue*/ name: "J", w:tetrimino_w, h:tetrimino_h, start_x: 3, color: "#0000CC", outline1: "#0066FF", outline2: "#000066", draw: drawTetrimino, r1_blocks: j_r1_blocks, r2_blocks: j_r2_blocks, r3_blocks: j_r3_blocks, r4_blocks: j_r4_blocks}, 
{/*Orange*/ name: "L", w:tetrimino_w, h:tetrimino_h, start_x: 3, color: "#CC9900", outline1: "#E6CC00", outline2: "#CC6600", draw: drawTetrimino, r1_blocks: l_r1_blocks, r2_blocks: l_r2_blocks, r3_blocks: l_r3_blocks, r4_blocks: l_r4_blocks}, 
{/*Green*/ name: "S", w:tetrimino_w, h:tetrimino_h, start_x: 3, color: "#00CC00", outline1: "#00FF00", outline2: "#009900", draw: drawTetrimino,  r1_blocks: s_r1_blocks, r2_blocks: s_r2_blocks, r3_blocks: s_r3_blocks, r4_blocks: s_r4_blocks}, 
{/*Purple*/ name: "T", w:tetrimino_w, h:tetrimino_h, start_x: 3, color: "#9900CC", outline1: "#CC00FF", outline2: "#660099", draw: drawTetrimino, r1_blocks: t_r1_blocks, r2_blocks: t_r2_blocks, r3_blocks: t_r3_blocks, r4_blocks: t_r4_blocks}, 
{/*Red*/ name: "Z", w:tetrimino_w, h:tetrimino_h, start_x: 3, color: "#B30000", outline1: "#FF0000", outline2: "#990000", draw: drawTetrimino,  r1_blocks: z_r1_blocks, r2_blocks: z_r2_blocks, r3_blocks: z_r3_blocks, r4_blocks: z_r4_blocks}];

let grid_blocks = new Array(grid_w * grid_h);
let current_tetrimino = Math.floor(Math.random() * 7);
let next_tetrimino = Math.floor(Math.random() * 7);
let second_next_tetrimino = Math.floor(Math.random() * 7);
let third_next_tetrimino = Math.floor(Math.random() * 7);
let tetrimino_x =  tetrimino[current_tetrimino].start_x * grid_block_w_h;
let tetrimino_y = (rows_above_grid * grid_block_w_h);
let rotate = 1;
let move_pieces = null;
let pause = false;
let game_active = false;
let shoot = false;
let next_tetrimino_timer = null;
let next_timer_active = false;
let draw_next = false;
let draw_hold = false;
let hold_disabled = 0;
let grab_hold = false;
let player_points = 0;
let num_rows_filled = 0;
let back_to_back = 0;
let current_level = 1;
let drop_speed = 1;
let held_tetrimino = -1;

//Set up board
prepareGridBlocks();
drawGridBackground();
drawGridOutline();

function prepareGridBlocks() {
    for (let y = 0; y < grid_h; y++) {
        for (let x = 0; x < grid_w; x++) {
            let t = (grid_w * y) + x;
            if (y >= rows_above_grid) {
                grid_blocks[t] = {x: x * grid_block_w_h, y: (y - rows_above_grid) * grid_block_w_h, color: background_color, outline_color1: background_color, outline_color2: background_color};
            }
            else {
                //For rows above visible grid
                grid_blocks[t] = {x: x * grid_block_w_h, y: -1 * ((rows_above_grid - y) * grid_block_w_h), color: background_color, outline_color1: background_color, outline_color2: background_color};
            }
        }
    }
}
/*---------------------------------------------Controls-------------------------------------------------*/
document.addEventListener("keydown", (e) => {
    switch(e.keyCode) {
        case 37:
            moveLeft();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown("player");
            break;
        case 38:
            rotateTetrimino("right");
            break;
        case 90: //z
            rotateTetrimino("left");
            break;
        case 67: //c
            hold();
            break;
        case 32:
            hardDrop();
            break;
    }
})

document.addEventListener("keyup", (e) => {
    switch(e.keyCode) {
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

/*---------------------------------------------Drawing Game Objects-------------------------------------------------*/
function drawGridBackground() {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canvas_w, canvas_h);

    for (let i = rows_above_grid; i < grid_blocks.length; i++) {
        ctx.fillStyle = grid_blocks[i].color;
        ctx.fillRect(grid_blocks[i].x + grid_block_border/2, grid_blocks[i].y + grid_block_border/2, grid_block_w_h, grid_block_w_h);

        if (grid_blocks[i].outline_color1 != background_color && grid_blocks[i].outline_color2 != background_color) {
            ctx.translate(grid_blocks[i].x + grid_block_w_h + grid_block_border, grid_blocks[i].y);
            ctx.rotate(90 * Math.PI / 180);

            let gradient = ctx.createLinearGradient(0, 1, 1, 0);
            gradient.addColorStop("0", grid_blocks[i].outline_color1);
            gradient.addColorStop("1", grid_blocks[i].outline_color2);
    
            ctx.lineWidth = tetrimino_outline;
            ctx.strokeStyle = gradient;
            ctx.strokeRect(tetrimino_outline, tetrimino_outline, grid_block_w_h - tetrimino_outline - grid_block_border/2, grid_block_w_h - tetrimino_outline - grid_block_border/2);
            ctx.resetTransform();
        }
        else if (grid_blocks[i].outline_color1 != background_color && grid_blocks[i].outline_color2 == background_color) {
            ctx.lineWidth = ghost_outline;
            ctx.strokeStyle = grid_blocks[i].outline_color1;
            ctx.strokeRect(grid_blocks[i].x + grid_block_border/2 + ghost_outline/2, grid_blocks[i].y + grid_block_border/2 + ghost_outline/2, grid_block_w_h - ghost_outline, grid_block_w_h - ghost_outline);
        }
    }
}

function drawGridOutline() {
    for (let i = rows_above_grid; i < grid_blocks.length; i++) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.lineWidth = grid_block_border;
        ctx.strokeStyle = border_color;
        ctx.strokeRect(grid_blocks[i].x + grid_block_border/2, grid_blocks[i].y + grid_block_border/2, grid_block_w_h, grid_block_w_h);
    }
}

function drawGrid() {
    drawGridBackground();
    drawGridOutline();
}

function drawTetrimino(x, y, color) {
    drawGhost(color);
    for (let i = 0; i < tetrimino[current_tetrimino].h; i++) {
        for (let z = 0; z < tetrimino[current_tetrimino].w; z++) {
            if (rotate % 2 != 0) {
                for (let r = 0; r < tetrimino[current_tetrimino].r1_blocks.length; r++) {
                    let rotate_coords = tetrimino[current_tetrimino].r1_blocks.slice();
                    let t = (grid_w * ((y / grid_block_w_h) + i)) + ((x / grid_block_w_h) + z);

                    if (rotate == 3) {
                        rotate_coords = tetrimino[current_tetrimino].r3_blocks.slice();
                    }
                    
                    if (z == rotate_coords[r].x && i == rotate_coords[r].y) {
                        if (t >= 0) {
                            grid_blocks[t].color = color;
                            if (color == background_color) {
                                grid_blocks[t].outline_color1 = color;
                                grid_blocks[t].outline_color2 = color;
                            }
                            else {
                                grid_blocks[t].outline_color1 = tetrimino[current_tetrimino].outline1;
                                grid_blocks[t].outline_color2 = tetrimino[current_tetrimino].outline2;
                            }
                        }
                    }
                }
            }
            else {
                for (let r = 0; r <  tetrimino[current_tetrimino].r1_blocks.length; r++) {
                    let rotate_coords =  tetrimino[current_tetrimino].r2_blocks.slice();
                    t = (grid_w * ((y / grid_block_w_h) + z)) + ((x / grid_block_w_h) + i);

                    if (rotate == 4) {
                        rotate_coords = tetrimino[current_tetrimino].r4_blocks.slice();
                    }

                    if (z == rotate_coords[r].y && i == rotate_coords[r].x) {
                        if (t >= 0) {
                            grid_blocks[t].color = color;
                            if (color == background_color) {
                                grid_blocks[t].outline_color1 = color;
                                grid_blocks[t].outline_color2 = color;
                            }
                            else {
                                grid_blocks[t].outline_color1 = tetrimino[current_tetrimino].outline1;
                                grid_blocks[t].outline_color2 = tetrimino[current_tetrimino].outline2;
                            }
                        }
                    }
                }
            }
        }
    }
    drawGrid();
}

function drawOTetrimino(x, y, color){
    drawGhost(color);
    for (let i = 0; i < o_w_h; i++) {
        for (let z = 0; z < o_w_h; z++) {
            let t = (grid_w * ((y / grid_block_w_h) + i)) + ((x / grid_block_w_h) + z);
            if (t >= 0 && t < grid_blocks.length) {
                grid_blocks[t].color = color;
                if (color == background_color) {
                    grid_blocks[t].outline_color1 = color;
                    grid_blocks[t].outline_color2 = color;
                }
                else {
                    grid_blocks[t].outline_color1 = tetrimino[current_tetrimino].outline1;
                    grid_blocks[t].outline_color2 = tetrimino[current_tetrimino].outline2;
                }
            }
        }
    }
    drawGrid();
}

function drawNextTetriminos() {
    const allocated_block_height = 2; //How many blocks vertically each block should take up
    const vertical_space_between_tetriminos = grid_block_w_h/2;
    clearNext();

    let order = next_tetrimino;
    let start_y = 0;

    for (let v = 0; v < 3; v++) {
        switch (v) {
            case 0:
                start_y = vertical_space_between_tetriminos;
                break;
            case 1:
                order = second_next_tetrimino;
                start_y += vertical_space_between_tetriminos;
                break;
            case 2:
                order = third_next_tetrimino;
                start_y += vertical_space_between_tetriminos;
                break;
        }

        const ctx = next_canvas.getContext('2d');
        ctx.fillStyle = tetrimino[order].color;
        let block_coords = tetrimino[order].r1_blocks.slice();

        draw_next = true;
        let height = findHeight(block_coords);
        let width = findWidth(block_coords);
        draw_next = false

        let start_x = (next_w/2) - (width[0]/2 * grid_block_w_h);
        start_y += (allocated_block_height - height[0]) * (vertical_space_between_tetriminos);
    
        for (let i = height[1]; i < height[0] + height[1]; i++) {
            for (let z = width[1]; z < width[0] + width[1]; z++) {
                for (let r = 0; r < block_coords.length; r++) {                
                    if (z == block_coords[r].x && i == block_coords[r].y) {
                        ctx.fillRect(start_x + ((z - width[1]) * grid_block_w_h), start_y, grid_block_w_h, grid_block_w_h);

                        ctx.translate(start_x + ((z - width[1]) * grid_block_w_h) + grid_block_w_h + grid_block_border, start_y - grid_block_border);
                        ctx.rotate(90 * Math.PI / 180);

                        let gradient = ctx.createLinearGradient(0, 1, 1, 0);
                        gradient.addColorStop("0", tetrimino[order].outline1);
                        gradient.addColorStop("1", tetrimino[order].outline2);
                
                        ctx.lineWidth = tetrimino_outline;
                        ctx.strokeStyle = gradient;
                        ctx.strokeRect(tetrimino_outline, tetrimino_outline, grid_block_w_h - tetrimino_outline - grid_block_border/2, grid_block_w_h - tetrimino_outline - grid_block_border);
                        ctx.resetTransform();

                        ctx.beginPath();
                        ctx.lineWidth = grid_block_border/2;
                        ctx.strokeStyle = background_color;
                        ctx.strokeRect(start_x + ((z - width[1]) * grid_block_w_h), start_y, grid_block_w_h, grid_block_w_h);
                    }
                }
            }
            start_y += vertical_space_between_tetriminos * 2;
            start_y += (allocated_block_height - height[0]) * (grid_block_w_h/2);
        }
    }
}

function clearNext() {
    const ctx = next_canvas.getContext('2d');
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, next_w, next_h);
}

function drawHoldTetrimino() {
    clearHold();
    const ctx = hold_canvas.getContext('2d');
    ctx.fillStyle = tetrimino[current_tetrimino].color;
    let block_coords = tetrimino[current_tetrimino].r1_blocks.slice();

    draw_hold = true;
    let height = findHeight(block_coords);
    let width = findWidth(block_coords);
    draw_hold = false

    const start_x = (hold_w/2) - (width[0]/2 * grid_block_w_h);
    let start_y = hold_h/2 - (height[0]/2 * grid_block_w_h);

    for (let i = height[1]; i < height[0] + height[1]; i++) {
        for (let z = width[1]; z < width[0] + width[1]; z++) {
            for (let r = 0; r < block_coords.length; r++) {                
                if (z == block_coords[r].x && i == block_coords[r].y) {
                    ctx.fillRect(start_x + ((z - width[1]) * grid_block_w_h), start_y, grid_block_w_h, grid_block_w_h);

                    ctx.translate(start_x + ((z - width[1]) * grid_block_w_h) + grid_block_w_h + grid_block_border, start_y - grid_block_border);
                    ctx.rotate(90 * Math.PI / 180);

                    let gradient = ctx.createLinearGradient(0, 1, 1, 0);
                    gradient.addColorStop("0", tetrimino[current_tetrimino].outline1);
                    gradient.addColorStop("1", tetrimino[current_tetrimino].outline2);
            
                    ctx.lineWidth = tetrimino_outline;
                    ctx.strokeStyle = gradient;
                    ctx.strokeRect(tetrimino_outline, tetrimino_outline, grid_block_w_h - tetrimino_outline - grid_block_border/2, grid_block_w_h - tetrimino_outline - grid_block_border);
                    ctx.resetTransform();

                    ctx.beginPath();
                    ctx.lineWidth = grid_block_border/2;
                    ctx.strokeStyle = background_color;
                    ctx.strokeRect(start_x + ((z - width[1]) * grid_block_w_h), start_y, grid_block_w_h, grid_block_w_h);
                }
            }
        }
        start_y += grid_block_w_h;
    }

    tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, background_color);
    drawGhost(background_color);
    drawGrid();
}

function clearHold() {
    const ctx = hold_canvas.getContext('2d');
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, hold_w, hold_h);
}

function drawGhost(color) {
    let y = tetrimino_y;
    const x = tetrimino_x;
    const points = findBottomPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
    let move_down = true;

    while (move_down) {
        for (let i = 0; i < points.length; i += 2) {
            let t = (grid_w * (y/grid_block_w_h + points[i + 1] + 1)) + (tetrimino_x/grid_block_w_h + points[i]);
    
            if (t >= grid_blocks.length) {
                move_down = false;
                break;
            }
            else {
                if (grid_blocks[t].color != background_color) {
                    move_down = false;
                    break;
                }
            }
        }

        if (move_down) {
            y += grid_block_w_h;
        }
    }

    if (y != tetrimino_y) {
        for (let i = 0; i < tetrimino[current_tetrimino].h; i++) {
            for (let z = 0; z < tetrimino[current_tetrimino].w; z++) {
                if (rotate % 2 != 0) {
                    for (let r = 0; r < tetrimino[current_tetrimino].r1_blocks.length; r++) {
                        let rotate_coords = tetrimino[current_tetrimino].r1_blocks.slice();
                        let t = (grid_w * ((y / grid_block_w_h) + i)) + ((x / grid_block_w_h) + z);
    
                        if (rotate == 3) {
                            rotate_coords = tetrimino[current_tetrimino].r3_blocks.slice();
                        }
                        
                        if (z == rotate_coords[r].x && i == rotate_coords[r].y) {
                            if (t >= 0) {
                                grid_blocks[t].outline_color1 = color;
                            }
                        }
                    }
                }
                else {
                    for (let r = 0; r <  tetrimino[current_tetrimino].r1_blocks.length; r++) {
                        let rotate_coords =  tetrimino[current_tetrimino].r2_blocks.slice();
                        t = (grid_w * ((y / grid_block_w_h) + z)) + ((x / grid_block_w_h) + i);
    
                        if (rotate == 4) {
                            rotate_coords = tetrimino[current_tetrimino].r4_blocks.slice();
                        }
    
                        if (z == rotate_coords[r].y && i == rotate_coords[r].x) {
                            if (t >= 0) {
                                grid_blocks[t].outline_color1 = color;
                            }
                        }
                    }
                }
            }
        }
    }
}
/*---------------------------------------------Calculations-------------------------------------------------*/
function moveLeft() {
    if (!pause && !shoot && game_active) {
        const points = findLeftPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
        let move_left = true;
    
        for (let i = 0; i < points.length; i += 2) {
            let t = (grid_w * (tetrimino_y/grid_block_w_h + points[i + 1])) + (tetrimino_x/grid_block_w_h + points[i] - 1);
            let r = (tetrimino_x/grid_block_w_h + points[i] - 1);
            if (r < 0) {
                move_left = false;
            }
            else {
                if (t >= 0) {
                    if (grid_blocks[t].color != background_color) {
                        move_left = false;
                    }
                }
            }
        }
    
        if (move_left) {
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, background_color);
            tetrimino_x -= grid_block_w_h;
            drawGridBackground();
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
            drawGridOutline();
        }

        checkStoppedTetrimino();
    }
}

function moveRight() {
    if (!pause && !shoot && game_active) {
        const points = findRightPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
        let move_right = true;
    
        for (let i = 0; i < points.length; i += 2) {
            let t = (grid_w * (tetrimino_y/grid_block_w_h + points[i + 1])) + (tetrimino_x/grid_block_w_h + points[i] + 1);
            let r = (tetrimino_x/grid_block_w_h + points[i] + 1);
            if (r > 9 || t > grid_blocks.length) {
                move_right = false;
            }
            else {
                if (t >= 0) {
                    if (grid_blocks[t].color != background_color) {
                        move_right = false;
                    }
                }
            }
        }
    
        if (move_right) {
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, background_color);
            tetrimino_x += grid_block_w_h;
            drawGridBackground();
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
            drawGridOutline();
        }

        checkStoppedTetrimino();
    }
}

function moveDown(requestor) {
    if (!pause && !shoot && game_active) {
        if (requestor == "player") {
            clearInterval(move_pieces);
        }
        const points = findBottomPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
        let move_down = true;
    
        for (let i = 0; i < points.length; i += 2) {
            let t = (grid_w * (tetrimino_y/grid_block_w_h + points[i + 1] + 1)) + (tetrimino_x/grid_block_w_h + points[i]);
    
            if (t >= grid_blocks.length) {
                move_down = false;
            }
            else {
                if (grid_blocks[t].color != background_color) {
                    move_down = false;
                }
            }
        }
    
        if (move_down) {
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, background_color);
            tetrimino_y += grid_block_w_h;
            drawGridBackground();
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
            drawGridOutline();

            if (requestor == "player") {
                player_points += 1;
                updateScoreboard();
            }
        }

        if (requestor == "player") {
            move_pieces = setInterval(animate, drop_speed * 1000);
        }

        checkStoppedTetrimino();
    }
}

function hold() {
    if (hold_disabled == 0 && !grab_hold) {
        next_tetrimino_timer = null;
        next_timer_active = false;
        drawHoldTetrimino();

        if (held_tetrimino != -1) {
            grab_hold = true;
            hold_disabled = 2;
            const set_current = held_tetrimino;
            held_tetrimino = current_tetrimino;
            current_tetrimino = set_current;
            prepareNextTetrimino();
        }
        else {
            hold_disabled = 1;
            held_tetrimino = current_tetrimino;
            prepareNextTetrimino();
        } 
    }
}

function hardDrop() {
    if (!pause && game_active) {
        shoot = true;
        window.requestAnimationFrame(animateHardDrop);
    }
}

function rotateTetrimino(direction) {
    if (current_tetrimino != 1 && !pause && game_active && !shoot) {
        let draw_rotation = true;
        tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, background_color);  
           
        if (direction == "right") {
            rotate++;
            if (rotate == 5) {
                rotate = 1;
            }
        }
        else {
            rotate--;
            if (rotate == 0) {
                rotate = 4;
            }
        }
       
        const new_w = findWidth(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
        const new_h = findHeight(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);

        //Check for collisions with another tetrimino
        draw_rotation = !checkTetriminoCollision();

        /*Deals with rotations at the left side of the canvas*/
        if (tetrimino_x + ((new_w[1]) * grid_block_w_h) < 0 && draw_rotation) {
            const previous_x = tetrimino_x;
            tetrimino_x = 0 - (new_w[1]);
            if (checkTetriminoCollision()) {
                tetrimino_x = previous_x;
                draw_rotation = false;
            }
        }
    
        /*Deals with rotations at the right side of the canvas*/
        if (tetrimino_x + (new_w[0] * grid_block_w_h) > canvas_w && draw_rotation) {
            const previous_x = tetrimino_x;
            tetrimino_x = canvas_w - ((new_w[0] + new_w[1])* grid_block_w_h) - grid_block_border;
            if (checkTetriminoCollision()) {
                tetrimino_x = previous_x;
                draw_rotation = false;
            }
        }
    
        /*Deals with rotations at the bottom of the canvas*/
        if (draw_rotation) {
            const points = findBottomPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
            
            for (let i = 0; i < points.length; i += 2) {
                let t = (grid_w * (tetrimino_y/grid_block_w_h + points[i + 1] + 1)) + (tetrimino_x/grid_block_w_h + points[i]);
        
                if (t >= grid_blocks.length) {
                    const previous_y = tetrimino_y;
                    tetrimino_y = canvas_h - ((new_h[0] + new_h[1] - rows_above_grid)* grid_block_w_h) - grid_block_border;
                    break;
                }
            }

            if (checkTetriminoCollision()) {
                tetrimino_y = previous_y;
                draw_rotation = false;
            }
        }
    
        /*Reset the rotation value if rotation is not possible*/
        if (!draw_rotation) {
            if (direction == "right") {
                rotate--;
                if (rotate == 0) {
                    rotate = 4;
                }
            }
            else {
                rotate++;
                if (rotate == 5) {
                    rotate = 1;
                }
            }
        }

        drawGridBackground();
        tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
        drawGridOutline();

        checkStoppedTetrimino();
    }
}

function checkTetriminoCollision() {
    let collision = false;
    let new_blocks = tetrimino[current_tetrimino].r1_blocks.slice();
    
    switch (rotate) {
        case 2:
            new_blocks = tetrimino[current_tetrimino].r2_blocks.slice();
            break;
        case 3:
            new_blocks = tetrimino[current_tetrimino].r3_blocks.slice();
            break;
        case 4:
            new_blocks = tetrimino[current_tetrimino].r4_blocks.slice();
            break;
    }

    for (let i = 0; i < tetrimino[current_tetrimino].h; i++) {
        for (let z = 0; z < tetrimino[current_tetrimino].w; z++) {
            for (let r = 0; r < new_blocks.length; r++) {
                if (rotate % 2 != 0 && !collision) {
                    if (z == new_blocks[r].x && i == new_blocks[r].y) {
                        let t = (grid_w * ((tetrimino_y / grid_block_w_h) + i)) + ((tetrimino_x / grid_block_w_h) + z)
                        if (t < grid_blocks.length && t >= 0) {
                            if (grid_blocks[t].color != background_color) {
                                collision = true;
                                break;
                            }
                        }
                    }
                }
                else if (!collision) {
                    if (z == new_blocks[r].y && i == new_blocks[r].x) {
                        let t = (grid_w * ((tetrimino_y / grid_block_w_h) + z)) + ((tetrimino_x / grid_block_w_h) + i);
                        if (t < grid_blocks.length && t >= 0) {
                            if (grid_blocks[t].color != background_color) {
                                collision = true;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    return collision;
}

function checkStoppedTetrimino() {
    if (!pause && !shoot) {
        const points = findBottomPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
        let stopped = false;
    
        for (let i = 0; i < points.length; i += 2) {
            let t = (grid_w * (tetrimino_y/grid_block_w_h + points[i + 1] + 1)) + (tetrimino_x/grid_block_w_h + points[i]);
    
            if (t >= grid_blocks.length) {
                stopped = true;
                break;
            }
            else {
                if (grid_blocks[t].color != background_color) {
                    stopped = true;
                    break;
                }
            }
        }
    
        if (stopped && next_tetrimino_timer == null) {
            next_tetrimino_timer = setTimeout(prepareNextTetrimino, drop_speed * 1000);
            next_timer_active = true;
        }
        else if (!stopped){
            clearTimeout(next_tetrimino_timer);
            next_tetrimino_timer = null;
            next_timer_active = false;
        }
    }
}

function findLeftPoints(r1_blocks, r2_blocks, r3_blocks, r4_blocks) {
    let current_blocks = r1_blocks.slice();

    switch (rotate) {
        case 2:
            current_blocks = r2_blocks.slice();
            break;
        case 3:
            current_blocks = r3_blocks.slice();
            break;
        case 4:
            current_blocks = r4_blocks.slice();
            break;
    }

    const left_points = [];
    let lowest_x = grid_w;
    let y = -1;
    for (let i = 0; i < current_blocks.length; i++) {
        if (current_blocks[i].y != y) {
            y = current_blocks[i].y;
            lowest_x = grid_w;
            for (let z = 0; z < current_blocks.length; z++) {
                if (current_blocks[z].y == y && current_blocks[z].x < lowest_x) {
                    lowest_x = current_blocks[z].x;
                }
            }
            left_points[left_points.length] = lowest_x;
            left_points[left_points.length] = y;
        }
    }

    return left_points;
}

function findRightPoints(r1_blocks, r2_blocks, r3_blocks, r4_blocks) {
    let current_blocks = r1_blocks.slice();

    switch (rotate) {
        case 2:
            current_blocks = r2_blocks.slice();
            break;
        case 3:
            current_blocks = r3_blocks.slice();
            break;
        case 4:
            current_blocks = r4_blocks.slice();
            break;
    }

    const right_points = [];
    let highest_x = 0;
    let y = -1;
    for (let i = 0; i < current_blocks.length; i++) {
        if (current_blocks[i].y != y) {
            y = current_blocks[i].y;
            highest_x = 0;
            for (let z = 0; z < current_blocks.length; z++) {
                if (current_blocks[z].y == y && current_blocks[z].x > highest_x) {
                    highest_x = current_blocks[z].x;
                }
            }
            right_points[right_points.length] = highest_x;
            right_points[right_points.length] = y;
        }
    }

    return right_points;
}

function findBottomPoints(r1_blocks, r2_blocks, r3_blocks, r4_blocks) {
    let current_blocks = r1_blocks.slice();

    switch (rotate) {
        case 2:
            current_blocks = r2_blocks.slice();
            break;
        case 3:
            current_blocks = r3_blocks.slice();
            break;
        case 4:
            current_blocks = r4_blocks.slice();
            break;
    }

    const bottom_points = [];
    let highest_y = 0;
    let x = -1;
    for (let i = 0; i < current_blocks.length; i++) {
        if (current_blocks[i].x != x) {
            x = current_blocks[i].x;
            highest_y = 0;
            for (let z = 0; z < current_blocks.length; z++) {
                if (current_blocks[z].x == x && current_blocks[z].y > highest_y) {
                    highest_y = current_blocks[z].y;
                }
            }
            bottom_points[bottom_points.length] = x;
            bottom_points[bottom_points.length] = highest_y;
        }
    }

    return bottom_points;
}

function findWidth(r1_blocks, r2_blocks, r3_blocks, r4_blocks) {
    let current_blocks = r1_blocks.slice();

    if (!draw_next && !draw_hold) {
        switch (rotate) {
            case 2:
                current_blocks = r2_blocks.slice();
                break;
            case 3:
                current_blocks = r3_blocks.slice();
                break;
            case 4:
                current_blocks = r4_blocks.slice();
                break;
        }
    }

    let x = current_blocks[0].x;
    let width = 1;
    const x_points = [];
    x_points[0] = x;

    for (let i = 1; i < current_blocks.length; i++) {
        if (current_blocks[i].x != x) {
            let add = true;
            for (let z = 0; z < x_points.length; z++) {
                if (x_points[z] == current_blocks[i].x) {
                    add = false;
                    break;
                }
            }

            if (add) {
                width++;
                x = current_blocks[i].x;
                x_points[x_points.length] = x;
            }
        }
    }

    let lowest_x = x_points[0];
    for (let i = 1; i < x_points.length; i++) {
        if (x_points[i] < lowest_x) {
            lowest_x = x_points[i];
        }
    }

    const return_info = [width, lowest_x];

    return return_info;
}

function findHeight(r1_blocks, r2_blocks, r3_blocks, r4_blocks) {
    let current_blocks = r1_blocks.slice();

    if (!draw_next && !draw_hold) {
        switch (rotate) {
            case 2:
                current_blocks = r2_blocks.slice();
                break;
            case 3:
                current_blocks = r3_blocks.slice();
                break;
            case 4:
                current_blocks = r4_blocks.slice();
                break;
        }
    }

    let y = current_blocks[0].y;
    let height = 1;
    const y_points = [];
    y_points[0] = y;

    for (let i = 1; i < current_blocks.length; i++) {
        if (current_blocks[i].y != y) {
            let add = true;

            for (let z = 0; z < y_points.length; z++) {
                if (y_points[z] == current_blocks[i].y) {
                    add = false;
                    break;
                }
            }

            if (add) {
                height++;
                y = current_blocks[i].y;
                y_points[y_points.length] = y;
            }
        }
    }

    let lowest_y = y_points[0];
    for (let i = 1; i < y_points.length; i++) {
        if (y_points[i] < lowest_y) {
            lowest_y = y_points[i];
        }
    }

    const return_info = [height, lowest_y];

    return return_info;
}

function findFilledRows() {
    let rows = 0;
    for (let y = 0; y < grid_h; y++) {
        let filled = true;
        for (let x = 0; x < grid_w; x++) {
            if (grid_blocks[(grid_w * y) + x].color == background_color) {
                filled = false;
                break;
            }
        }

        if (filled) {
            for (let x = 0; x < grid_w; x++) {
                grid_blocks[(grid_w * y) + x].color == background_color;
                grid_blocks[(grid_w * y) + x].outline_color1 == background_color;
                grid_blocks[(grid_w * y) + x].outline_color2 == background_color;
            }

            for (let r = y; r >= 0; r--) {
                for (let x = 0; x < grid_w; x++) {
                    if (r != 0) {
                        grid_blocks[(grid_w * r) + x].color = grid_blocks[(grid_w * (r - 1)) + x].color;
                        grid_blocks[(grid_w * r) + x].outline_color1 = grid_blocks[(grid_w * (r - 1)) + x].outline_color1;
                        grid_blocks[(grid_w * r) + x].outline_color2 = grid_blocks[(grid_w * (r - 1)) + x].outline_color2;
                    }
                    else {
                        grid_blocks[(grid_w * r) + x].color = background_color;
                        grid_blocks[(grid_w * r) + x].outline1 = background_color;
                        grid_blocks[(grid_w * r) + x].outline2 = background_color;
                    }
                }
            }
            rows += 1;
        }
    }

    if (rows == 0) {
        back_to_back = 0;
    }

    if (rows != 0) {
        num_rows_filled += rows;
        switch (rows) {
            case 1:
                player_points += 100 * current_level;
                back_to_back = 0;
                break;
            case 2:
                player_points += 300 * current_level;
                back_to_back = 0;
                break;
            case 3:
                player_points += 500 * current_level;
                back_to_back = 0;
                break;
            case 4:
                back_to_back++;
                if (back_to_back < 2) {
                    player_points += 800 * current_level;
                }
                else {
                    player_points += 1.5 * 800 * current_level;
                }
                break;
        }

        updateScoreboard();
    }    
}

function prepareNextTetrimino() {
    next_tetrimino_timer = null;
    next_timer_active = false;
    clearInterval(move_pieces);
    rotate = 1;
    let end_game = true;

    if (hold_disabled == 3) {
        hold_disabled++;
    }

    if (hold_disabled % 2 == 0) {
        hold_disabled = 0;
        if (!grab_hold) {
            current_tetrimino = next_tetrimino;
            next_tetrimino = second_next_tetrimino;
            second_next_tetrimino = third_next_tetrimino;
            third_next_tetrimino = Math.floor(Math.random() * 7);
            findFilledRows();
        }
        else {
            grab_hold = false;
            hold_disabled = 3;
        }
    }
    else {
        current_tetrimino = next_tetrimino;
        next_tetrimino = second_next_tetrimino;
        second_next_tetrimino = third_next_tetrimino;
        third_next_tetrimino = Math.floor(Math.random() * 7);
        hold_disabled++;
    }

    tetrimino_x =  tetrimino[current_tetrimino].start_x * grid_block_w_h;
    tetrimino_y = (rows_above_grid * grid_block_w_h);

    for (let i = 0; i < 2; i++) {
        if (!checkTetriminoCollision()) {
            shoot = false;
            drawNextTetriminos();
            drawGridBackground();
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
            drawGridOutline();
            end_game = false;
            move_pieces = setInterval(animate, drop_speed * 1000);
            break;
        }
        else {
            if (findHeight(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks)[0] != 1) {
                tetrimino_y -= grid_block_w_h;
            }
            else {
                if (tetrimino_y != -grid_block_w_h) {
                    tetrimino_y -= grid_block_w_h;
                }
            }
        }
    }
    
    if (end_game) {
        endGame();
    }
}

function pauseGame() {
    clearInterval(move_pieces);
    clearTimeout(next_tetrimino_timer);
    showPauseMenu();
}

function resumeGame() {
    closePauseMenu();
    move_pieces = setInterval(animate, drop_speed * 1000);
    if (shoot) {
        window.requestAnimationFrame(animateHardDrop);
    }
    if (next_timer_active) {
        setTimeout(prepareNextTetrimino, drop_speed * 1000);
    }
    pause = false;
}

function endGame() {
    clearInterval(move_pieces);
    game_active = false;
    showGameOverScreen();
}

function resetValues() {
    for (let i = 0; i < grid_blocks.length; i++) {
        grid_blocks[i].color = background_color;
        grid_blocks[i].outline_color1 = background_color;
        grid_blocks[i].outline_color2 = background_color;
    }

    current_tetrimino = Math.floor(Math.random() * 7);
    next_tetrimino = Math.floor(Math.random() * 7);
    second_next_tetrimino = Math.floor(Math.random() * 7);
    third_next_tetrimino = Math.floor(Math.random() * 7);
    tetrimino_x =  tetrimino[current_tetrimino].start_x * grid_block_w_h;
    tetrimino_y = (rows_above_grid * grid_block_w_h);
    rotate = 1;
    pause = false;
    game_active = false;
    next_tetrimino_timer = null;
    shoot = false;
    draw_next = false;
    draw_hold = false;
    hold_disabled = 0;
    grab_hold = false;
    held_tetrimino = -1;
    next_timer_active = false;
    player_points = 0;
    num_rows_filled = 0;
    back_to_back = 0;
    current_level = 1;
    drop_speed = 1;
    drawGrid();
    clearNext();
    clearHold();
    updateScoreboard();
}

function startGame() {
    drawGridBackground();
    tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
    drawGridOutline();
    drawNextTetriminos();
    move_pieces = setInterval(animate, drop_speed * 1000);
    game_active = true;
}

function animate() {
    if (next_tetrimino_timer == null) {
        moveDown("game");
    }
}

const animateHardDrop = () => {
    if (!pause && shoot) {
        clearTimeout(next_tetrimino_timer);
        next_timer_active = false;

        const points = findBottomPoints(tetrimino[current_tetrimino].r1_blocks, tetrimino[current_tetrimino].r2_blocks, tetrimino[current_tetrimino].r3_blocks, tetrimino[current_tetrimino].r4_blocks);
        let move_down = true;
    
        for (let i = 0; i < points.length; i += 2) {
            let t = (grid_w * (tetrimino_y/grid_block_w_h + points[i + 1] + 1)) + (tetrimino_x/grid_block_w_h + points[i]);
    
            if (t >= grid_blocks.length) {
                move_down = false;
                break;
            }
            else {
                if (grid_blocks[t].color != background_color) {
                    move_down = false;
                    break;
                }
            }
        }

        if (move_down) {
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, background_color);
            tetrimino_y += grid_block_w_h;
            drawGridBackground();
            tetrimino[current_tetrimino].draw(tetrimino_x, tetrimino_y, tetrimino[current_tetrimino].color);
            drawGridOutline();
            window.requestAnimationFrame(animateHardDrop);
            player_points += 2;
            updateScoreboard();
        }
        else {
            window.cancelAnimationFrame(animateHardDrop);
            prepareNextTetrimino();
        }
    }
}

function updateScoreboard() {
    scoreboard_score.innerHTML = player_points;
    scoreboard_lines.innerHTML = num_rows_filled;
    if (num_rows_filled % (current_level * 10) == 0 && num_rows_filled != 0) {
        current_level += 1;
        updateDropSpeed();
    }
    scoreboard_level.innerHTML = current_level;
}

function updateDropSpeed() {
    switch (current_level) {
        case 1:
            drop_speed = 1;
            break;
        case 2:
            drop_speed = .9;
            break;
        case 3:
            drop_speed = .8;
            break;
        case 4:
            drop_speed = .7;
            break;
        case 5:
            drop_speed = .6;
            break;
        case 6:
            drop_speed = .5;
            break;
        case 7:
            drop_speed = .4;
            break;
        case 8:
            drop_speed = .3;
            break;
        case 9:
            drop_speed = .2;
            break;
        case 10:
            drop_speed = .15;
            break;
        case 11:
            drop_speed = .1;
            break;
        case 12:
        case 13:
        case 14:
            drop_speed = .08;
            break;
        case 15:
        case 16:
        case 17:
            drop_speed = .06;
            break;
        case 18:
        case 19:
        case 20:
            drop_speed = .04;
            break;
        default:
            drop_speed = .02;
            break;
    }
    /*switch (current_level) {
        case 1:
            drop_speed = 1;
            break;
        case 2:
            drop_speed = .72;
            break;
        case 3:
            drop_speed = .64;
            break;
        case 4:
            drop_speed = .58;
            break;
        case 5:
            drop_speed = .5;
            break;
        case 6:
            drop_speed = .44;
            break;
        case 7:
            drop_speed = .36;
            break;
        case 8:
            drop_speed = .3;
            break;
        case 9:
            drop_speed = .22;
            break;
        case 10:
            drop_speed = .14;
            break;
        case 11:
            drop_speed = .1;
            break;
        case 12:
        case 13:
        case 14:
            drop_speed = .08;
            break;
        case 15:
        case 16:
        case 17:
            drop_speed = .06;
            break;
        case 18:
        case 19:
        case 20:
            drop_speed = .04;
            break;
        default:
            drop_speed = .02;
            break;
    }*/

    clearInterval(move_pieces);
    move_pieces = setInterval(animate, drop_speed * 1000);
}