class Platform {
	constructor() {
		this.x = 300;
		this.y = ground - player.height*3 ;
		this.width = 70;
		this.height = 50;
	}

	update() {
		this.checkCollide();

	}
	draw() {
		ctx.drawImage(images.platform, this.x-shift, this.y, this.width, this.height);
		ctx.strokeRect(this.x-shift, this.y, this.width, this.height);
		ctx.fillText(`player:${player.y}, platform:${this.y}`,200,100);

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
			(B.x + B.w >= A.x) &&
			(A.x + A.w >= B.x) &&
			(B.y + B.h >= A.y) &&
			(A.y + A.h >= B.y)

		) {
			
			if (player.y >= B.y - player.height+ 25 ) {
				player.y = B.y - player.height+ 25 ;
				player.jumping = false;
			}
			
		}
            
        
    }

}