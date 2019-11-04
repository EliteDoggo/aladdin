let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $end = document.querySelector('#end'),
    $tableName = document.querySelector('#tableName'),
    $tableHP = document.querySelector('#tableHP'),
    $tableBananas = document.querySelector('#tableBananas'),
    $tableTime = document.querySelector('#tableTime'),
    $forAl = document.querySelector('#forAl'),
    $forJa = document.querySelector('#forJa'),
    $playerName = document.querySelector('#playerName'),
    $tablePlayer1 = document.querySelector('#tablePlayer1'),
    $tablePlayer2 = document.querySelector('#tablePlayer2');


let canv,
    ctx,
    name,
    hp,
    bananas,
    time,
    interval,
    startTime,
    images = {},
    width,
    height,
    keys = [],
    friction = 0.8,
    gravity = 0.2;

canv = document.createElement('canvas');
ctx = canv.getContext('2d');
width = canv.width = window.innerWidth;
height = canv.height = window.innerHeight;
document.body.appendChild(canv);


let player = {
    x: 0,
    y: height-50,
    width: 27,
    height: 62,
    speed: 3,
    velX: 0,
    velY:0,
    jumping:false
};
//начало игры
$forJa.onclick = function() {
    $start.style.display ='none';
    $game.style.display = 'block';
    if (bg.onload) {
        init();
    }
    
};
$forAl.onclick = function() {
    $start.style.display ='none';
    $game.style.display = 'block';
    if (bg.onload) {
        init();
    }
};



let bg = new Image();
let alStand = new Image();
let alRun = new Image();

bg.onload = e=> {
    return true;
};

bg.src = '../media/bg/bg.png';
alStand.src = '../media/sprites/aladdin1.png';
alRun.src = '../media/sprites/aladdinRun.png';


function init() {
    name = $playerName.value;
    hp = 100;
    bananas = 0;
    startTime = new Date().getTime();
    $tableName.innerHTML = name;


    updateTimer();
    interval = setInterval(() => {
        hp--;
        updateTimer();
        if (hp<=0) {
            clearInterval(interval);
            die();
        }
    },1000);

    loop();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function update() {
    if (keys['ArrowUp']){
        if (!player.jumping) {
            player.jumping = true;
            player.velY = -player.speed * 2;
        }
    }
    if (keys['ArrowRight']) {
        if (player.velX < player.speed) {
            player.velX++;
            
        
        if (aAA < 365) {
            for (let i= 0; i < 12; i++){
                aAA = alRunPoints[i];
                
            }
        }else aAA = 0;
            
            
           
           
        }
    }
    if (keys['ArrowLeft']) {
        if (player.velX > -player.speed) {
            player.velX--;
        }
    }
    
    player.velX *= friction;
    player.velY += gravity;
    
    player.x += player.velX;
    player.y += player.velY;

    if (player.x >= width-player.width) {
        player.x = width - player.width;    
    }else if (player.x <= 0) {
        player.x= 0;
    }

    if(player.y >= height - player.height-30){
        player.y = height - player.height-30;
        player.jumping = false;
    }

    if (player.x >= width/2 ) {
        bgWidth+=5;
        player.x = width/2-5;
    }
}
let bgWidth = 0;
let aAA= 0;

let alRunPoints=[
    3,35,68,93,127,166,203,234,262,291,325,365
];

function draw() {
    ctx.drawImage(bg, bgWidth, 0, width, bg.height,   0, 0, width, height);
      
    // ctx.drawImage(alStand, player.x,  player.y, player.width, player.height);
    // тест 
    ctx.drawImage(alRun, aAA, 0,35,player.height, player.x, player.y,35,player.height );
    // тест
}


function updateTimer() {
    $tableTime.innerText = Math.floor( (new Date().getTime() - startTime) / 1000);
    $tableHP.innerText = hp;
}

function die() {
    $game.style.display = 'none';
    $end.style.display = 'block';
}

document.onkeydown = e=>{
    keys[e.key] = true;
};
document.onkeyup = e=>{
    keys[e.key] = false;
};