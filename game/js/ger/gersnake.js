class Snake {
	constructor() {
		this.img = images.snake;
		this.w = 50;
		this.h = 50;
		this.x = randFloat(500, images.bg.width - 500);
		this.y = height - this.h;
		this.maxLeft = this.x - 500;
		this.maxRight = this.x + 500;
		this.vel = 3;
		this.dir = randInt(0, 2) === 0 ? -1 : 1;
		this.collided = false;
		this.hit = false; // hit player in this second
	}



	update() {
		this.x += this.vel * this.dir;

		if (this.x <= this.maxLeft) this.dir = 1;
		if (this.x >= this.maxRight) this.dir = -1;

		this.checkCollide();
	}


	checkCollide() {
		let A = {
			x: player.x + bgShift,
			y: player.y,
			w: player.w,
			h: player.h
		};

		let B = {
			x: this.x,
			y: this.y,
			w: this.w,
			h: this.h
		};


		if (
				B.x + B.w >= A.x &&
				A.x + A.w >= B.x &&
				B.y + B.h >= A.y &&
				A.y + A.h >= B.y 
			) {

			if (!this.collided) {
				this.collided = true;
				this.hit = true;
				player.hp -= 30;
			}
		} else {
			this.collided = false;
		}
	}



	draw() {
		ctx.drawImage(this.img, this.x - bgShift, this.y, this.w, this.h);
	}
}



