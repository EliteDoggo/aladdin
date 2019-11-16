class Player {
	constructor(x, y, w, h, velocity) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.hp = 100;
		this.velocity = {x: velocity, y: 0};
		this.jumping = false;
		this.running = false;
		this.frame = 0;
		this.frames = 0;
		this.spf = 2; // sprite per frame
		this.keys = {
			37: false,
			38: false,
			39: false
		};
	}



	update() {
		bgShift = Math.max(0, Math.min(bgShift, images.bg.width - width));


		if (this.keys[37]) {
			if ((bgShift === 0 && this.x + this.w/2 <= width/2) || 
					(bgShift === images.bg.width - width && this.x + this.w/2 >= width/2)) {

				if (Math.sign(this.velocity.x) === 1) this.velocity.x *= -1;
				this.x += this.velocity.x;
			} else {
				this.x = width/2 - this.w/2;
				if (Math.sign(this.velocity.x) === 1) this.velocity.x *= -1;
				bgShift += this.velocity.x;
			}
			this.running = true;
		}


		if (this.keys[39]) {
			if ((bgShift === 0 && this.x + this.w/2 <= width/2) || 
					(bgShift === images.bg.width - width && this.x + this.w/2 >= width/2)) {

				if (Math.sign(this.velocity.x) === -1) this.velocity.x *= -1;
				this.x += this.velocity.x;
			} else {
				this.x = width/2 - this.w/2;
				if (Math.sign(this.velocity.x) === -1) this.velocity.x *= -1;
				bgShift += this.velocity.x;
			}
			this.running = true;
		}

		if (this.keys[37] === false && this.keys[39] === false) {
			this.running = false;
		}


		if (this.keys[38] && this.jumping === false) {
			this.jumping = true;
			this.velocity.y = -11;
		}

		this.velocity.y += G;
		this.y += this.velocity.y;

		if (this.y + this.h > height) {
			this.jumping = false;
		}

		this.x = Math.min(width - this.w, Math.max(0, this.x));
		this.y = Math.min(this.y, height - this.h);
	}


	draw() {
		if (this.running === true) {

			if (this.frames >= this.spf) {
				this.frames = 0;
				this.frame = (this.frame + 1) % aladdinRun.length;
			} else {
				this.frames++;
			}

			let img = images.playerRun;
			let p = aladdinRun[this.frame];

			this.w = p.w;
			if (this.velocity.x >= 0) {
				ctx.drawImage(img, p.x, 0, p.w, img.height, 
										this.x, this.y, this.w, this.h);
			} else {
				ctx.save();
				ctx.scale(-1, 1);
				ctx.drawImage(img, p.x, 0, p.w, img.height, 
										-this.x - this.w, this.y, this.w, this.h);
				ctx.restore();
			}

		} else {

			this.w = images.playerIdle.width;

			if (this.velocity.x >= 0) {
				ctx.drawImage(images.playerIdle, this.x, this.y, this.w, this.h);
			} else {
				ctx.save();
				ctx.scale(-1, 1);
				ctx.drawImage(images.playerIdle, -this.x - this.w, this.y, this.w, this.h);
				ctx.restore();
			}
		}
	}
}