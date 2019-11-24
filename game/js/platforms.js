class Platform {
	constructor() {
		this.x = randFloat(500, bg.width - 500);
		this.y = ground - player.height * 3;
		this.width = 70;
		this.height = 50;
	}


	update() {
		this.checkCollide();

	}
	draw() {
		ctx.drawImage(images.platform, this.x - shift, this.y, this.width, this.height);
		ctx.strokeRect(this.x - shift, this.y, this.width, this.height);
		

	}
	checkCollide() {
		let A = {
			x: player.x + shift,
			y: player.y,
			w: player.width,
			h: player.height
		};
		let B = {
			x: this.x,
			y: this.y,
			w: this.width,
			h: this.height
		};
		// сверху
		if ((player.jumping ||
				player.climbed) &&
			player.velY > 0 &&
			A.y + A.h > B.y &&
			A.x + A.w > B.x &&
			A.x < B.x + B.w &&
			A.y + A.h <= B.y + 30) {

			player.climbed = true;
			player.jumping = false;
			player.y = this.y - player.height + 25;
			player.velY = 0;
		}
		// снизу
		if ((player.jumping) &&
			player.velY < 0 &&
			A.x + A.w > B.x &&
			A.x < B.x + B.w &&
			A.y > B.y + B.h
		) {
			player.y = B.y + B.h;
			player.velY *= -0.001;
			player.jumping = true;
		}
		// // слева 
		// if (player.jumping &&
		// 	B.y > A.y+A.h && 

			
		// 	// A.x+A.w <B.x
			

		// ) {
		// 	console.log(true);
		// }




	}

}