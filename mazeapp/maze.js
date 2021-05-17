'use strict'


let rows, 
    cols, 
    current,
    date,
    currentTime;
let w           = 50;
let grid        = [];
let stack       = [];
let gridBuilt   = false;
let started     = false;
let gameOver    = false;
let win         = false;
let playedMove  = false;
let moveCnt     = 0;


function setup() {
    createCanvas(500, 500);
    rows = floor(height/w);
    cols = floor(width/w);

    // frameRate(5);

    for(let j = 0; j < rows; j++) {
        for(let i = 0; i < cols; i++) {
            let c = new Cell(i, j);
            grid.push(c);
        }
    }

    current = grid[0];
}

function draw() {

    if(playedMove && (!gameOver)) {

        currentTime = new Date();
        let timeCnt = floor((currentTime.getTime()-date.getTime())/1000);
        document.querySelector(".timeClass").innerHTML = 'Time left: ' + (30 - timeCnt);
        document.querySelector(".MoveCnt").innerHTML = 'No of Moves: ' + moveCnt;

        if(current.i == cols-1 && current.j == rows-1 && (currentTime.getSeconds() <= (date.getSeconds() + 30))) {
            // console.log("Congratulations! You won");
            gameOver = true;
            win = true;
        } else if(timeCnt >= 30) {
            // console.log('over');
            gameOver = true;
        }
    }

    background(200);
    if(gameOver) {
        textSize(50);
        if(win) {
            fill(91, 68, 155);
            text('You Won!!', 150, 100, 250, 300);
        } else {
            fill(241, 14, 14);
            text('Oops! You Lose', 200, 100, 250, 300);
        }
        text('Game Over', 150, 300, 250, 300);
    } else if(gridBuilt && (!gameOver)) {
        for(let i = 0; i < grid.length; i++) {
            grid[i].show();
        }
    }

    current.visited = true;
    if(gridBuilt && (!gameOver)) {
        current.highlight();
    } else if(!gameOver) {
        textSize(50);
        text('Loading The Window', 150, 150, 200, 200);
    }



    // *****************************************************
    let next = current.checkNeighbors();
    if(next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
    } else if(stack.length > 0) {
        // stuck(current);
        current = stack.pop();
    } else if(stack.length == 0) {
        gridBuilt = true;

        if(!started) {
            // console.log('On');
            let startX = floor(random(0, cols/2));
            let startY = floor(random(0, rows/2));
            // console.log(index(startX, startY));
            current = grid[index(startX, startY)];
            started = true;
        }
    }

}

function index(i, j) {
    if(i < 0 || j < 0 || j >= rows || i >= cols) {
        return -1;
    }
    return i + j*rows;
}

function removeWalls(a, b) {
    
    let x = a.i - b.i;

    if(x == 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if(x == -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    
    let y = a.j - b.j;
    
    if(y == 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if(y == -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }

}

function stuck(a) {
    let x = a.i * w;
    let y = a.j * w;
    noStroke();
    fill(255, 0, 0, 255);
    rect(x, y, w, w);
}


function keyPressed() {
    if(started && gridBuilt && (!gameOver)) {

        if(!playedMove) {
            playedMove = true;
            let timeIndicator = document.createElement('div');
            timeIndicator.className = 'timeClass';
            document.querySelector('body').appendChild(timeIndicator);

            let moveCounter =  document.createElement('div');
            moveCounter.className = 'MoveCnt';
            document.querySelector('h1').insertAdjacentElement('afterend', moveCounter);
        }

        moveCnt += 1;
        if(!date) {
            date = new Date();
        }
        let pos = current;
        switch(keyCode) {
            case UP_ARROW:
                if(current.walls[0] === false) {
                    pos = grid[index(current.i, current.j-1)];
                }
                break;
            case RIGHT_ARROW:
                if(current.walls[1] === false) {
                    pos = grid[index(current.i+1, current.j)];
                }
                break;
            case DOWN_ARROW:
                if(current.walls[2] === false) {
                    pos = grid[index(current.i, current.j+1)];
                }
                break;
            case LEFT_ARROW:
                if(current.walls[3] === false) {
                    pos = grid[index(current.i-1, current.j)];
                }
                break;
        }
        current.moved = true;
        current = pos;
        current.moved = false;
    }
}
