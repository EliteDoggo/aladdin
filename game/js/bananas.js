class Banana {
	constructor() {
		this.x = platforms[randInt(0, platforms.length - 1)].x + 15;
		this.y = 200;
		this.w = 40;
		this.h = 40;
		this.colided = false;
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
			w: this.width,
			h: this.height
		};

		if (
            (A.x + A.w >= B.x) &&
            (B.x + B.w >= A.x) &&
            (A.y + A.h >= B.y) &&
            (B.y + B.h >= A.y)
        ) {
			if (!this.colided) {
				this.colided = true;
				hp += 5; 				
			}
			else{
				this.colided = false;
			}
			
			
		}






	}

}