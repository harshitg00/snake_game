const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

const box = 32;

//images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//audio files
const dead = new Audio();
dead.src = "audio/dead.mp3";
const left = new Audio();
left.src = "audio/left.mp3";
const right = new Audio();
right.src = "audio/right.mp3";
const up = new Audio();
up.src = "audio/up.mp3";
const down = new Audio();
down.src = "audio/down.mp3";


//snake
let snake = [];
snake[0] = {
    x:9*box,
    y:10*box
}

//food
let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
}

//score
let score = 0;

//control the snake

let d;
document.addEventListener("keydown",direction);
function direction(event){
    let key = event.keyCode;
    if(key == 37 && d!="right"){
        d="left";
        left.play();
    } else if(key == 38 && d!="down"){
        d="up";
        up.play();
    }else if(key == 39 && d!="left"){
        d= "right";
        right.play();
    }else if(key == 40 && d!="up"){
        d="down";
        down.play();
    }
}
//check collision function
function collision(head,array){
    for(let i=0;i<array.length;i++){
        if(head.x ==array[i].x && head.y == array[i].y){
            return true;
        }
    }
}
//draw on canvas
function draw(){
    ctx.drawImage(ground,0,0);
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = (i==0)? "green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg,food.x,food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    

    //which direction
    if(d=="left") snakeX -=box;
    if(d=="up") snakeY -=box;
    if(d=="right") snakeX +=box;
    if(d=="down") snakeY +=box;

    //if th snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
        x: Math.floor(Math.random()*17+1)*box,
        y: Math.floor(Math.random()*15+3)*box
        }
    } else {
        //remove the tail
        snake.pop();
    }

    
    //add new head
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    //gameover
    if(snakeX < box || snakeX>17*box || snakeY < 3*box || snakeY > 17*box ||collision(newHead,snake)){
        dead.play();
        setTimeout(function(){ 
            alert("Game Over!!"); 
            document.location.reload();
        }, 0);
        clearInterval(game);
    }
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);