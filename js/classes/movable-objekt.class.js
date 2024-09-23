class MovableObject extends DrawableObjekt {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {//Throwable Objekt shut always fall
            return true;
        } else {
            return this.y < 128;
        }
    }




    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
            
    }

    isCollidingWithBottle(obj) {
        console.log(this.x + 'bottle', obj.x + 'enemy');


        return this.x + this.width + 10 > obj.x && // was tut es
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height + 100
    }


 /*   isCollidingCoin(obj) {
        return (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
            (this.Y + this.offsetY + this.height) >= obj.Y &&
            (this.Y + this.offsetY) <= (obj.Y + obj.height)
    }

    checkCollisionsWithCoins(coins) {
        for (let i = this.coins.length - 1; i >= 0; i--) {
            if (this.isCollidingCoin(coins[i])) {
                coins.splice(i, 1); // Remove the coin from the array
                console.log('Coin collected!');
            }
        }
    }
*/

    hit() {

        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    hurtEndboss(endboss) {
        // Hier kannst du die Logik für die Verletzung des Endbosses einfügen
        endboss.health -= 20;  // Beispiel: Endboss verliert 20 Gesundheitspunkte
        if (endboss.health <= 0) {
            endboss.die();  // Endboss stirbt, wenn Gesundheit <= 0 ist
        } else {
            endboss.lastHit = new Date().getTime();  // Zeit des letzten Treffers setzen
        }
        return true;
    }
     
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }
    /*isHurtEndboss() {
        // endbosshits + 1;
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }*/

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveLeft() {
        this.x -= this.speed;


    }

    moveRight() {
        //  setInterval(() => {
        this.x += this.speed;
    }//, 1000 / 60);}


    jump() {
        this.speedY = 30;
    }
   
}