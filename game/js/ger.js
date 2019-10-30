let $start = document.querySelector('#start'),
		$game = document.querySelector('#game'),
		$end = document.querySelector('#end'),
		$tableName = document.querySelector('#tableName'),
		$tableHP = document.querySelector('#tableHP'),
		$tableBananas = document.querySelector('#tableBananas'),
		$tableTime = document.querySelector('#tableTime');



const G = 1;
let images = {},
		width,
		height,
		canvas,
		ctx,
		bananas,
		hp,
		startTime,
		name,
		interval;



load();


async function load() {
	images.bg = await loadImage('media/bg/bg.png');
	images.ground = await loadImage('media/clipart/194900.png');
	// images.aladdin = await loadImage('...');
	// images.aladdinRun = [];
	// images.aladdinRun[0] = await loadImage('aladdinRun1.png');
	// images.aladdinRun[1] = await loadImage('aladdinRun2.png');
	// images.aladdinRun[2] = await loadImage('aladdinRun3.png');
	// images.aladdinRun[3] = await loadImage('aladdinRun4.png');
	// images.aladdinRun[4] = await loadImage('aladdinRun5.png');

	init();
}



function loadImage(path) {
	return new Promise(res => {
		let img = new Image();
		img.onload = res(img);
		img.src = path;
	});
}






function init() {
	bananas = 0;
	hp = 100;
	startTime = new Date().getTime();
	name = 'asd';
	$tableName.innerText = name;

	canvas = document.createElement('canvas');
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);


	updateTimer();
	interval = setInterval(() => {
		// hp--;
		updateTimer();
		// addSnake();
		
		if (hp < 0) {
			clearInterval(interval);
			die();
		}
	}, 1000);

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
}



function updateTimer() {
	$tableTime.innerText = Math.floor((new Date().getTime() - startTime) / 1000);
	$tableHP.innerText = hp;
}



function die() {
	// alert('game ended!');
	$game.style.display = 'none';
	$end.style.display = 'block';
}





