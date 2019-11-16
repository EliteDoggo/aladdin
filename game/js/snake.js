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
        this.maxLeftMove = 0;
        this.maxRightMove = 0;
        this.snakeSpawnXCoordinate  = 0;
<<<<<<< HEAD
       
=======
        this.collided = false;
        this.hit = false; // hit player in this second
>>>>>>> 7ed10bcdbdd9120ae4b6e3168535f4ef7d1cdcc4
    }

    snakePos(min=500, max=images.bg.width-500){
        this.x = Math.floor(Math.random() * (max - min) + min);
    }

    snakeSpawn(){
        this.snakePos();
        this.snakeSpawnXCoordinate = this.x;
        this.maxLeftMove = this.snakeSpawnXCoordinate - 500;
        this.maxRightMove = this.snakeSpawnXCoordinate + 500;
    }
    update() {

        if (this.y >= this.ground ) { 
            this.y = this.ground;
        }
        if (this.x <= this.maxLeftMove) {
            this.movingDir = 'right';
        }
        if (this.x >= this.maxRightMove) {
            this.movingDir = 'left';
        }
        if (this.movingDir === 'left'){
            this.x-=this.speed;
        }else if (this.movingDir = 'right') {
            this.x += this.speed;
        }

         this.checkCollide();
    }


    draw() {
        ctx.drawImage(this.path, this.x - shift, this.y, this.width, this.height );
    }
    
    checkCollide(){
        let A = {
            x: player.x + shift,
            y: player.y,
            w: player.width,
            h: player.height
        };
        let B = {
            x: this.x,
            y: this.y,
            h: this.width,
            w: this.height
        };
        if (
            (B.x + B.w >= A.x) &&
            (A.x + A.w >= B.x) &&
            (B.y + B.h >= A.y) &&
            (A.y + A.h >= B.y)    
        ) {
            if (!this.collided) {
                this.collided = true;
                this.hit = true;
                hp -= 30;
            }
        } else {
            this.collided = false;
        }
    }






}






