class Player {
	constructor(p,a,b,c,d,e,f,g,h) {
		this.p = p;
		this.a = a;
		this.c = c;
		this.b = b;
		this.d = d;
		this.e = e;
		this.f = f; 
		this.g = g;
		this.h = h;
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

