class Player {
	constructor(p,x,y,a,b) {
		this.p=p;
		this.x=x;
		this.y=y;
		this.a=a;
		this.b=b ;
		this.x = x;
			this.keys = {
				37:'false',
				39:'false'
			};
	}




	draw(){
		ctx.drawImage(this.p, this.x, this.y );
	}


	update() {
		if (this.keys['37']) {
			this.x-=20;
		}
		if (this.keys['39']) {
			this.x+=20;
		}
		
	}
	keyPress(keycode) {
		if (this.keys[keycode]!==undefined){
			this.keys[keycode]=true;	
		}
	}


	keyRelease(keycode){
		if (this.keys[keycode]!==undefined){
			this.keys[keycode]=false;
		}
	}

	
}

