let canv = document.createElement('canvas');
let ctx = canv.getContext('2d');
canv.width = window.innerWidth;
canv.height = window.innerHeight;
document.body.appendChild(canv);

let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $end = document.querySelector('#end'),
    $tableName = document.querySelector('#tableName'),
    $tableHP = document.querySelector('#tableHP'),
    $tableBananas = document.querySelector('#tableBananas'),
    $tableTime = document.querySelector('#tableTime');


let name,
    hp,
    bananas,
    time,
    interval,
    startTime;

init();

function init() {
    name = '';
    hp = 100;
    bananas = 0;
    startTime = new Date().getTime();
    $tableName.innerText = name;

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

}

function updateTimer() {
    $tableTime.innerText = Math.floor( (new Date().getTime() - startTime) / 1000);
    $tableHP.innerText = hp;

}

function die() {
    $game.style.display = 'none';
    $end.style.display = 'block';
}