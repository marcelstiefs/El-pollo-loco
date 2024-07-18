class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new HealthStatusbar();
    salsaStatusBar = new SalsaStatusbar();
    throwableObjects = [];
    collectedBottles = 0;
    maxBottles = 6;
    collectedCoins = 0;
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisiions();
            this.checkThrowObjects();
            this.checkCollisiionsCoins();
            this.checkCollisiionsSalsa();
           // this.collectBottle();
                }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 120);
            this.throwableObjects.push(bottle);
        }
    }


    checkCollisiions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {

                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log(this.character.energy);
            }
        });
    }


    checkCollisiionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {

                //this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                console.log(coin);
                this.collectCoins(coin);
            }
        });
    }


    checkCollisiionsSalsa() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);

                console.log(bottle);
            }
        });
    }


   /* collectBottle(bottle) {
        if (this.collectedBottles < this.maxBottles) {
            let index = this.level.bottles.indexOf(bottle);
            
                this.level.bottles.splice(index, 1);
                this.collectedBottles++;
                console.log('Bottle collected:', this.collectedBottles);
            }
        }
   

    collectBottle(bottle) {
       let index = this.level.bottles.indexOf(bottle);
        if (this.collectedBottles < this.maxBottles){
             
           
                this.level.bottles.splice(index, 1);
            
        }
        this.collectedBottles ++;
    }
*/ 
    collectBottle(bottle) {
        if (this.collectedBottles < this.maxBottles) {
            let index = this.level.bottles.indexOf(bottle);
           
                this.level.bottles.splice(index, 1);
                setTimeout(() => {
                  //this.level.bottles.push(bottle);
                }, 5000);
            }
           this.collectedBottles++;
            this.salsaStatusBar.setPercentage(this.collectedBottles);
        
    }
    
   /* throwCounter(){
        if(this.collectedBottles > 0  && this.keyboard.SPACE){
            this.collectBottle--;
            this.salsaStatusBar.setPercentage(this.collectedBottles);
        }
    }
        */  

    checkThrowObjects() {
        if (this.keyboard.SPACE && this.collectedBottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 70, this.character.y + 130);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.salsaStatusBar.setPercentage(this.collectedBottles);
        }
    }
     collectCoins(coin){
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
     }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.widt, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        //----- Space for fixed Objects-------
        this.addToMap(this.statusBar);
        this.addToMap(this.salsaStatusBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}