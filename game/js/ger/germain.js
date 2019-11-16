let $start = document.querySelector('#start'),
		$game = document.querySelector('#game'),
		$end = document.querySelector('#end'),
		$tableName = document.querySelector('#tableName'),
		$tableHP = document.querySelector('#tableHP'),
		$tableBananas = document.querySelector('#tableBananas'),
		$tableTime = document.querySelector('#tableTime');



const G = 0.5;
let images = {},
		width,
		height,
		canvas,
		ctx,
		bananas,
		startTime,
		name,
		interval,
		player,
		bgShift,
		snakes = [],
		time;


let aladdinRun = [
    {x: 3, w: 35},
    {x: 35, w: 33},
    {x: 68, w: 28},
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




load();


async function load() {
	images.bg = await loadImage('media/bg/bg.png');
	images.ground = await loadImage('media/clipart/194900.png');
	images.playerIdle = await loadImage('img/aladdin1.png');
	images.playerRun = await loadImage('img/aladdinRun.png');
	images.snake = await loadImage('media/clipart/Snake_Jafar.png');
	// images.aladdin = await loadImage('...');
	// images.aladdinRun = [];
	// images.aladdinRun[0] = await loadImage('aladdinRun1.png');
	// images.aladdinRun[1] = await loadImage('aladdinRun2.png');
	// images.aladdinRun[2] = await loadImage('aladdinRun3.png');
	// images.aladdinRun[3] = await loadImage('aladdinRun4.png');
	// images.aladdinRun[4] = await loadImage('aladdinRun5.png');

	setTimeout(() => {
		init();
	}, 30);
}



function loadImage(path) {
	return new Promise(res => {
		let img = new Image();
		img.onload = res(img);
		img.src = path;
	});
}






function init() {
	time = 0;
	bgShift = 0;
	bananas = 0;
	startTime = new Date().getTime();
	name = 'asd';
	$tableName.innerText = name;

	canvas = document.createElement('canvas');
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	ctx.font = '20px sans-serif';
	$game.append(canvas);

	let pw = images.playerIdle.width,
			ph = images.playerIdle.height;
	player = new Player(0, height-ph, pw, ph, 6);


	for (let i = 0; i < 4; i++) {
		snakes.push(new Snake());
	}

	updateTimer();
	loop();
}



function loop() {
	update();
	draw();

	requestAnimationFrame(loop);
}



function update() {
	for (let s of snakes) s.update();

	player.update();

	let t = new Date().getTime();
	if (time <= t) {

		for (let s of snakes) {
			if (s.collided === true && s.hit !== true) {
				player.hp -= 30;
			} else {
				s.hit = false;
			}
		}


		player.hp--;

		if (player.hp < 0) {
			player.hp = 0;
			// die();
		}

		updateTimer();
		time = t + 1000;
	}
}



function draw() {
	ctx.drawImage(images.bg, bgShift, 0, width, images.bg.height,
								0, 0, width, height);

	for (let s of snakes) s.draw();

	player.draw();
}



function updateTimer() {
	$tableTime.innerText = Math.floor((new Date().getTime() - startTime) / 1000);
	$tableHP.innerText = player.hp;
}



function die() {
	// alert('game ended!');
	$game.style.display = 'none';
	$end.style.display = 'block';
}



document.onkeydown = e => {
	if (e.keyCode === 37 && player.keys[37] !== undefined)
		player.keys[37] = true;

	if (e.keyCode === 38 && player.keys[38] !== undefined)
		player.keys[38] = true;

	if (e.keyCode === 39 && player.keys[39] !== undefined)
		player.keys[39] = true;
};


document.onkeyup = e => {
	if (e.keyCode === 37 && player.keys[37] !== undefined)
		player.keys[37] = false;

	if (e.keyCode === 38 && player.keys[38] !== undefined)
		player.keys[38] = false;

	if (e.keyCode === 39 && player.keys[39] !== undefined)
		player.keys[39] = false;
};



function randInt(min=0, max=10) {
	return Math.floor(Math.random() * (max - min) + min);
}



function randFloat(min=0, max=10) {
	return Math.random() * (max - min) + min;
}

