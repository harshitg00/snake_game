const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
const lowestScore = document.getElementById('lowestScore').textContent;
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
const eat = new Audio();
eat.src = "audio/eat.mp3";


//snake
let snake = [];
snake[0] = {
    x:9*box,
    y:10*box
}
function init(){
    snake = [];
    snake[0] = {
        x:9*box,
        y:10*box
    }
    score = 0;
    last = "null";
    d = "null";
    game = setInterval(draw,100);
}

//food
let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
}

//score
let score = 0;

//control the snake

let last;
let d;
document.addEventListener("keydown",direction);

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

function direction(event){
    let key = event.keyCode;
    if(key == 37 && last!="right" && last!="left"){
        d="left";
        left.play();
    } else if(key == 38 && last!="down" && last!="up"){
        d="up";
        up.play();
    }else if(key == 39 && last!="left" && last!= "right"){
        d= "right";
        right.play();
    }else if(key == 40 && last!="up" && last!="down"){
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
    while(collision(food,snake) == true){
        food = {
            x: Math.floor(Math.random()*17+1)*box,
            y: Math.floor(Math.random()*15+3)*box
        }
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
    last = d;

    //if th snake eats food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
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
            if(score>lowestScore){
                var Name = prompt('High Score!!  Woohooo!! \nEnter your name: ',"")
                clearInterval(game);
                if(Name){
                    updatePlayers(Name,score)
                    setTimeout(loadPlayers,1000);
                    setTimeout(loadPlayers,2000);
                    init();
                    // window.open('/submit/'+Name+'/'+score,"_self");
                } else {
                    init();
                }
            } else {
                alert("Game Over Champ, Try again?");
                clearInterval(game);
                init();
            }
        },0);
    }
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px changa one";
    ctx.fillText(score,2*box,1.6*box);
}

let game = setInterval(draw,100);

function loadPlayers(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/data',true);
    xhr.onload = function(){
        if(this.status == 200){
            var players = JSON.parse(this.responseText);
            output = '';
            for(i in players){
                output += `<li><div class="list_num"> ${players[i].score} </div><div class="hname">${players[i].name}</div></li>`;
            }
            // console.log(output)
            document.getElementById('lowestScore').textContent = players[players.length-1].score;
            document.getElementById('leaderboard').innerHTML = output;
        }
    }
    xhr.send();
}
function updatePlayers(name,score){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','/submit/'+name+'/'+score,true);
    xhr.send();
}