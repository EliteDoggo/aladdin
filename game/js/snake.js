class Snake {
    constructor(path, x, y, width, height, speed, shift) {
        this.path = path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed= speed;
        this.ground = window.innerHeight*0.98 - this.height - 40;
        this.movingDir = 'left';
        this.shift = shift;
       
    }
    snakePos(){
        this.x = Math.floor(Math.random() * window.innerWidth);
        // this.x = window.innerWidth-this.width;

    }
    snakeSpawn(){
        this.snakePos();
    }
    update() {
        
        if (this.y >= this.ground ) { 
            this.y = this.ground;
            
        }

        if (this.x <=0){
            this.movingDir = 'right';
            this.x += this.speed;
        }
        if (this.x >= window.innerWidth - this.width ) {
            this.movingDir = 'left';
            this.x-=this.speed;
        }
        if (this.movingDir === 'left'){
            this.x-=this.speed;
        }else if (this.movingDir = 'right') {
            this.x += this.speed;
        }   
        if (this.shift > 0 && this.movingDir==='left' ){
            this.x -=shift;
        }


    }
    draw() {
        ctx.drawImage(this.path, this.x, this.y, this.width, this.height );

    }
    




}