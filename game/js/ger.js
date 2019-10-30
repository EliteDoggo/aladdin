let $start = document.querySelector('#start'),
		$game = document.querySelector('#game'),
		$end = document.querySelector('#end'),
		$tableName = document.querySelector('#tableName'),
		$tableHP = document.querySelector('#tableHP'),
		$tableBananas = document.querySelector('#tableBananas'),
		$tableTime = document.querySelector('#tableTime');



let G = 1;
let bananas,
		hp,
		startTime,
		name,
		interval;




init();


function init() {
	bananas = 0;
	hp = 5;
	startTime = new Date().getTime();
	name = 'asd';
	$tableName.innerText = name;


	updateTimer();
	interval = setInterval(() => {
		hp--;
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
