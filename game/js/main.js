let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $end = document.querySelector('#end'),
    $tableName = document.querySelector('#tableName'),
    $tableHP = document.querySelector('#tableHP'),
    $tableBananas = document.querySelector('#tableBananas'),
    $tableTime = document.querySelector('#tableTime'),
    $forAl = document.querySelector('#forAl'),
    $forJa = document.querySelector('#forJa'),
    $playerName = document.querySelector('#playerName');

let indexFrame = 0;
let numberFrame = 12;

let G = 1;
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
    height;

// let player = new Player(images.alStand, 10, 500,100,  200);

let x = 0;
let keys = {
    37: 'false',
    39: 'false'
}


//начало игры
$forJa.onclick = function() {
    $start.style.display ='none';
    $game.style.display = 'block';
    init();
}

$forAl.onclick = function() {
    $start.style.display ='none';
    $game.style.display = 'block';
    init();
}



load();

async function load() {
    
    images.bg = await loadImage('../media/bg/bg.png');
    images.ground = await loadImage('../media/clipart/194900.png');
    images.alStand = await loadImage('../media/sprites/aladdin1.png')
    // images.aladdinRun = [];
    images.aladdinRun = await loadImage('../media/sprites/aladdinRun.png');

    // init();
}

function loadImage(path){
    return new Promise(res => {
        let img = new Image();
        img.onload = res(img);
        img.src = path;
    });
}


function init() {
    name = $playerName.value;
    hp = 100;
    bananas = 0;
    startTime = new Date().getTime();
    $tableName.innerHTML = name;
    

    canv = document.createElement('canvas');
    ctx = canv.getContext('2d');
    width = canv.width = window.innerWidth;
    height = canv.height = window.innerHeight;
    document.body.appendChild(canv);



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

 if (keys['37']) {
        x-=10;
    }
    if (keys['39']) {
        x+=10;
    }



    // player.update();

}

function draw() {
    ctx.drawImage(images.bg, 0, 0, width, images.bg.height,
                                0, 0, width, height);

    // ctx.drawImage(images.ground,  50,  height-100,  100, 70);

   
    // ctx.drawImage(images.alStand, x,  height-(images.alStand.height *2.5), 
    //                               images.alStand.width*2,  images.alStand.height*2);
    ctx.drawImage(images.aladdinRun,
                  images.aladdinRun.width / numberFrame,  
                  height-(images.alStand.height *2.5),
                  0,0,
                 indexFrame * images.aladdinRun.width / numberFrame,
                  images.alStand.height*2,
                  images.aladdinRun.width / numberFrame,  
                  height-(images.alStand.height *2.5));
   
if (x<=0) {
    x=10;
} 
if (x>window.innerWidth) {
    x=window.innerWidth-101;
}


    // player.draw();
}

function updateTimer() {
    $tableTime.innerText = Math.floor( (new Date().getTime() - startTime) / 1000);
    $tableHP.innerText = hp;

}

function die() {
    $game.style.display = 'none';
    $end.style.display = 'block';
}


document.addEventListener('keydown', e => {
    keyPress(e.keyCode);

});


document.addEventListener('keyup', e => {
    keyRelease(e.keyCode);

});

       

function keyPress(keycode) {
    if (keys[keycode]!==undefined){
        keys[keycode]=true;    
    }
}


function keyRelease(keycode){
    if (keys[keycode]!==undefined){
        keys[keycode]=false;
    }
}
