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

let shift=0;

let frameCurrent = 0,
    framePerStep = 2,
    frames = 0,
    dir = 'right',
    ground = height * .98;

let player = {
    x: 0,
    y: ground,
    width: 27,
    height: 62,
    speed: 3,
    velX: 0,
    velY:0,
    jumping:false
};

let snake = {
    x : 0,
    y : ground,
    width : 50,
    height : 50,
    speed : 3,
    // bg.width : bg.width,
    // posx : 0,
    // posy : ground,
    // widthx : 50,
    // heighty : 50
};

ctx.font = '20px sans-serif';

let leftPos,
    rightPos;

let alRunPoints=[
    {x: 3, w: 33},
    {x: 35, w: 33},
    {x: 68, w: 27},
    {x: 93, w: 34},
    {x: 127, w: 39},
    {x: 166, w: 37},
    {x: 203, w: 31},
    {x: 234, w: 28},
    {x: 262, w: 29},
    {x: 291, w: 34},
    {x: 325, w: 40},
    {x: 365, w: 36}
];


//начало игры
$forJa.onclick = function() {
    $start.style.display = 'none';
    $game.style.display = 'block';
    if (images.onload) {
        init();
    }
};
$forAl.onclick = function() {
    $start.style.display = 'none';
    $game.style.display = 'block';
    if (images.onload) {
        init();
    }
};
// END

// ПИКЧИ ГРУЖУ 
let bg = new Image();
let alStand = new Image();
let alRun = new Image();
let snakeSprite = new Image();

images.bg = bg;
images.alStand = alStand;
images.alRun = alRun;
images.snakeSprite = snakeSprite;

images.onload = e=> {
    return true;
};
// END

bg.src = '../media/bg/bg.png';
alStand.src = '../media/sprites/aladdin1.png';
alRun.src = '../media/sprites/aladdinRun.png';
snakeSprite.src = '../media/sprites/snake.png';



function getRandomInt(value) {
    return Math.floor(Math.random() * Math.floor(value));
}
snake.posx =  getRandomInt(width);



let snakeOne = new Snake(images.snakeSprite, snake.x, snake.y, snake.width, snake.height, snake.speed,snake.shift);
let snakeTwo = new Snake(images.snakeSprite, snake.x, snake.y, snake.width, snake.height, snake.speed,snake.shift);

snakeSpawning();
function snakeSpawning() {
    snakeOne.snakeSpawn();
    snakeTwo.snakeSpawn();
    
}

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
            dir = 'right';
            
            
            if (frames >= framePerStep) {
                frames = 0;
                frameCurrent = (frameCurrent + 1) % alRunPoints.length;
            } else {
                frames++;
            }
        }
    }

    if (keys['ArrowLeft']) {
        if (player.velX > -player.speed) {
            player.velX--;
            dir = 'left';

            if (frames >= framePerStep) {
                frames = 0;
                frameCurrent = (frameCurrent + 1) % alRunPoints.length;
            } else {
                frames++;
            }
        }
    }
    
    player.velX *= friction;
    player.velY += gravity;
    
    // player.x += player.velX;
    player.y += player.velY;

    if(player.y >= ground - player.height-30){
        player.y = ground - player.height-30;
        player.jumping = false;
    }


    shift =Math.min(bg.width - width,Math.max(0,shift));
    leftPos = (shift == 0 && player.x<= width/2);

    rightPos = (shift == bg.width-width && player.x>=width/2);


    if (leftPos || rightPos) {
        player.x+= player.velX * 3;
    }else{
        shift+=player.velX * 3;
        player.x = width/2;
    }
   

    if (player.x >= width-alRunPoints[frameCurrent].w) {
        player.x = width - alRunPoints[frameCurrent].w;    
    }else if (player.x <= 0) {
        player.x= 0;
    }
    snakeOne.update();
    snakeTwo.update();

}

function draw() {
    ctx.drawImage(bg, shift, 0, width, bg.height,   0, 0, width, height);

    let c = alRunPoints[frameCurrent];
    if (dir === 'right') {
        ctx.drawImage(alRun, c.x, 0, c.w, player.height, player.x, player.y, c.w,player.height );
    } else if (dir === 'left') {
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(alRun, c.x, 0, c.w, player.height, -player.x - c.w, player.y, c.w, player.height );
        ctx.restore();
    }
    snakeOne.draw();
    snakeTwo.draw();

    ctx.fillText(`leftPos: ${leftPos}; rightPos: ${rightPos}; shift: ${Math.trunc(shift)}; px: ${player.x}; `, 200, 200);
}




function updateTimer() {
    $tableTime.innerText = Math.floor( (new Date().getTime() - startTime) / 1000);
    $tableHP.innerText = hp;
}

function die() {
    $game.style.display = 'none';
    $end.style.display = 'block';
    $tablePlayer1.innerText = `Name: ${name} | Time: ${$tableTime.innerText}`;
}

document.onkeydown = e=>{
    keys[e.key] = true;
};
document.onkeyup = e=>{
    keys[e.key] = false;
};