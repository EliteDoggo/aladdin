class Banana {
	constructor() {
		this.x = platforms[randInt(0, platforms.length - 1)].x;
		this.y = 200;
		this.w = 40;
		this.h = 40;
		this.colided = false;
		this.toRemove= false;
	}

	
	
	update() {
		this.checkCollide();

	}
	draw() {
		ctx.drawImage(images.banana, this.x - shift , this.y, this.w, this.h);
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
			w: this.w,
			h: this.h
		};

		if (
            (B.x + B.w >= A.x) &&
            (A.x + A.w >= B.x) &&
            (B.y + B.h >= A.y) &&
            (A.y + A.h >= B.y)
        ) {
			if (!this.colided) {
				this.toRemove = true;
				this.colided = true;
				hp += 5;
			}
			else{
				this.colided = false;
			}
			
			
		}






	}

}