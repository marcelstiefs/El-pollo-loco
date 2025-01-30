class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    sound
    keyboard;
    camera_x = 0;
    statusBar = new HealthStatusbar();
    salsaStatusBar = new SalsaStatusbar();
    throwableObjects = [];
    collectedBottles = 0;
    maxBottles = 6;
    collectedCoins = 0;
    //throwableObject = new ThrowableObject();
    bottle;
    endbosshit= 0;
    //endboss = new Endboss;//this.level.enemies[5];
    hashit = false;
    endbossKilled = false;


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
           // this.checkCollisiions();
            this.checkCollisionsBottle();
            //this.checkthrowCollissoins();
            this.checkCollisiionsCoins();
            this.checkCollisiionsSalsa();
            // this.collectBottle();
        }, 10);
        setInterval(() => {

            this.checkCollisiions();
        }, 30);
        setInterval(() => {
            
            this.checkThrowObjects();
           // this.endScreen();
        }, 180);
    }

    /*   checkThrowObjects() {
           if (this.keyboard.SPACE) {
               let bottle = new ThrowableObject(this.character.x + 30, this.character.y + 120);
               this.throwableObjects.push(bottle);
           }
       }
   */
    checkthrowCollissoins() {
        if (this.throwableObject.isColliding(enemy)) {
            this.hitEnemyFromAbove(enemy);
        }
    }

    checkCollisiions() {
        this.level.enemies.forEach((enemy) => {
            if ((enemy instanceof Chicken || enemy instanceof SmallChicken) &&
                this.jumpOnEnemy(this.character, enemy) &&
                this.character.isColliding(enemy)) {

                this.hitEnemyFromAbove(enemy);  // Nur ausführen, wenn es sich um Chicken oder SmallChicken handelt
            }
            // if (this.throwableObject.isColliding(enemy)){
            //         this.hitEnemyFromAbove(enemy);
            //    }
            else if (this.character.isColliding(enemy)) {

                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                //console.log(this.character.energy);
            }
            // if (this.throwableObject.forEach.isColliding(enemy)) {
            //    this.hitEnemyFromAbove(enemy);}
            // if (this.jumpOnEnemy(this.throwableObject,enemy)){
            //      this.hitEnemyFromAbove(enemy); }

        });
    }
    /*
     checkCollisionsBottle(){
         this.throwableObjects.forEach((bottle) => {
             this.level.enemies.forEach((enemy) => {
                 if (this.throwableObjects.bottle.isCollidingWithBottle(bottle)){
                     this.hitEnemyFromAbove(enemy);
                 }
         })
         })}*/



    checkCollisionsBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                // Überprüft, ob die Flasche (bottle) den Feind (enemy) trifft
                if ((enemy instanceof Chicken || enemy instanceof SmallChicken) && bottle.isColliding(enemy)) {
                    console.log("Kollision");
                    this.hitEnemyFromAbove(enemy);
                    bottle.hashit = true;
                }
                // Kollision mit Endboss überprüfen
                if (enemy instanceof Endboss && bottle.isColliding(enemy) && !bottle.hashit) {
                    console.log("Kollision Endboss");
                    // Verletzung des Endbosses
                    enemy.hurtEndboss(enemy);  // Hier den Endboss verletzen
                    this.endbosshit ++;
                    console.log(this.endbosshit)
                    bottle.hashit = true;
                    
                }
                if (this.endbosshit == 4){
                    this.endbossKilled = true;
                    this.endScreenWin();
                }
                //if (bottle.isAboveGround() && !bottle.hashit){
                  // bottle.hashit = true;
             // }
                this.deleteBottleAfterHit(bottle);
            });
        });
    }
    /*
        checkCollisionsBottle() {
            
            this.throwableObjects.forEach((bottle) => {
                this.level.enemies.forEach((enemy) => {
                    // Überprüft, ob die Flasche (bottle) den Feind (enemy) trifft
                    if ((enemy instanceof Chicken || enemy instanceof SmallChicken) && bottle.isColliding(enemy)) {
                        console.log("Kollision")
                        this.hitEnemyFromAbove(enemy);
                    }
                    if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                     //   endboss = this.level.enemies[5];
                        console.log("Kollision Endboss")
                       // this.level.enemies.isHurtEndboss();
                      // this.hurtEndboss(enemy);
                      this.endboss.hit();
                    }
                });
            });
        }
        
            hitEnemyFromAbove(enemy) {
                enemy.loadImage(enemy.IMAGE_DEAD);
                let index = this.level.enemies.indexOf(enemy);
        
                this.level.enemies.splice(index, 1);
            }
           
                */



    hitEnemyFromAbove(enemy){
    
       // if (this instanceof Chicken || this instanceof SmallChicken) {
        
      
        enemy.loadImage(enemy.IMAGE_DEAD);
        setTimeout(() => {

            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);

            }
        }, 10);
   // }
    }

    deleteBottleAfterHit(bottle) {
        // Setze die Splash-Animation ab, nachdem die Flasche getroffen hat
        //bottle.playAnimation(bottle.SPLASH_BOTTLE);
        if (bottle.hashit) {
        // Nach einer kurzen Verzögerung die Flasche löschen
        setTimeout(() => {
            let index = this.throwableObjects.indexOf(bottle);
            if (index > -1) {
                this.throwableObjects.splice(index, 1);  // Flasche aus dem Array entfernen
            }
        }, 300);  // Wartezeit von 500ms, um die Splash-Animation abzuspielen
    }
    }
    /*
    
        isHurtEndboss() {
           // endbosshits + 1;
            let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
            timepassed = timepassed / 1000; //Difference in s
            return timepassed < 1;
        }
    */




    checkCollisiionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {

                //this.character.hit();
                // this.statusBar.setPercentage(this.character.energy);
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
            console.log(bottle.y);
        }
    }


    collectCoins(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
        this.collectedCoins++;
        this.statusBar.addcoin(this.collectedCoins);
        this.collectedCoins = 0
        // this.statusBar.setPercentage(percentage);
    }

    jumpOnEnemy(character, enemy) {

        return character.y + character.height < enemy.y + enemy.height;
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


 endScreenWin() {
    let canvas = document.getElementById('canvas');
     let winscreen = document.getElementById('endscreenWin');
     let mobileIcons = document.getElementById('mobileIcons');
     setTimeout(() => {
         mobileIcons.classList.add('d-none');
        canvas.classList.add('d-none');
        winscreen.classList.remove('d-none');
     }, 1500);
     this.world = null;
}
/*
    endScreenLose() {
        let canvas = document.getElementById('canvas');
        let losescreen = document.getElementById('endscreenLose');
        if (this.isDead()){
        setTimeout(() => {
            canvas.classList.add('d-none');
            losescreen.classList.remove('d-none');
            
        }, 1500);
    }
    }

*/
}