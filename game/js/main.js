let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $end = document.querySelector('#end'),
    $tableName = document.querySelector('#tableName'),
    $tableHP = document.querySelector('#tableHP'),
    $tableBananas = document.querySelector('#tableBananas'),
    $tableTime = document.querySelector('#tableTime');

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



load();

async function load() {
    
    images.bg = await loadImage('../media/bg/bg.png');
    images.ground = await loadImage('../media/clipart/194900.png');

    init();
}

function loadImage(path){
    return new Promise(res => {
        let img = new Image();
        img.onload = res(img);
        img.src = path;
    });
}



function init() {
    name = '';
    hp = 100;
    bananas = 0;
    startTime = new Date().getTime();
    $tableName.innerText = name;

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

}

function draw() {
    ctx.drawImage(images.bg, 0, 0, width, images.bg.height,
                                0, 0, width, height);

    ctx.drawImage(images.ground, 50, height - 100, 100, 70);

}

function updateTimer() {
    $tableTime.innerText = Math.floor( (new Date().getTime() - startTime) / 1000);
    $tableHP.innerText = hp;

}

function die() {
    $game.style.display = 'none';
    $end.style.display = 'block';
}

