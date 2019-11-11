class Snake {
    constructor(path, x, y, width, height, speed) {
        this.path = path;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed= speed;
        this.ground = window.innerHeight*0.98 - this.height - 40;
       
    }
    snakePos(){
        this.x = Math.floor(Math.random() * window.innerWidth);

    }
    snakeSpawn(){
        this.snakePos();
    }
    update() {
        

        if (this.y >= this.ground ) { 
            this.y = this.ground;
        }



    }
    draw() {
        ctx.drawImage(this.path, this.x, this.y, this.width, this.height );

    }
    




}