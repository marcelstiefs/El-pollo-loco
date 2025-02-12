class MovableObject extends DrawableObjekt {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.5;
    energy = 100;
    lastHit = 0;
    endbosshits = 0;
    hashit = false;
    endbossdead = false;
    endbossEnergy = 100;
    soundsilence = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }

    isAboveGround() { 
        if (this instanceof ThrowableObject ) {
           
            return this.y < 390;
            //return true;
        } else {
            return this.y < 128;
        }
    }



/*
    isAboveGround() {
       
            return this.y < 128;
        
    } 

    isAboveGroundBottle() {

        return this.y < 2000;

    }


    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height

    }



    isCollidingWithBottle(obj) {
        console.log(this.x + 'bottle', obj.x + 'enemy');


        return this.x + this.width + 10 > obj.x && 
            this.y + this.height > obj.y &&
            this.x < obj.x &&
            this.y < obj.y + obj.height + 100
    }
    */

    isCollidingWithBottle(obj) {
        

        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom;
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    
    /*
    isColliding(mo) {
        return (this.x) + (this.width + this.offsetWidth) > (mo.x) &&
            (this.y) + (this.height + this.offsetHeight) > (mo.y) &&
            (this.x) < (mo.x + mo.width + mo.offsetWidth) &&
            (this.y) < (mo.y + mo.height + mo.offsetHeight);
    }

      isCollidingCoin(obj) {
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

        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

/*
    hurtEndboss(endboss) {
         this.endbosshits++;
        // Hier kannst du die Logik für die Verletzung des Endbosses einfügen
        this.endbossEnergy -= 25;  // Beispiel: Endboss verliert 20 Gesundheitspunkte
        console.log(this.endbossEnergy)
       // if (this.endbossEnergy <= 0) {
           // this.endbossEnergy = 0
        if (this.endbossEnergy == 0){
            this.endbossdead = true;
          //  this.endbossIsDead();
             console.log(this.endbosshit)
             return true;
        } else {
           endboss.lastHit = new Date().getTime();  // Zeit des letzten Treffers setzen
           
           
        }
       // return true;
    }*/
    hurtEndboss() {
        this.endbosshits++;

        // Endboss verliert 25 Gesundheitspunkte
        this.endbossEnergy -= 25;
    

        // Überprüfen, ob der Endboss tot ist
        if (this.endbossEnergy < 0 ) {  // Prüfen, ob Energie <= 0 und ob der Endboss noch lebt
            this.endbossEnergy = 0;       // Setze Energie auf 0, falls sie negativ wurde
            this.endbossdead = true;      // Setze den Status auf tot
           
        }

        // Setzt die Zeit des letzten Treffers, falls der Endboss noch lebt
        else {
            this.lastHit = new Date().getTime();
        }
    }



    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }
/*
    isHurtEndboss() {
        if (this.endbossdead == true){
        let timepassed = new Date().getTime() - this.lastHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed < 1;
    }}
*/
    isDead() {
       // this.approachtodead();
       // this.endScreenLose();
         return this.energy == 0;
    }

/*
    endbossIsDead() {
        if (this.endbosshits == 4) {
            this.endbossdead = true;
            console.log("endboss ist tot");
            return true;
           
        }
        
    }

    endbossIsDead() {
        console.log("Endboss Treffer: " + this.endbosshits); // Zeigt an, wie viele Treffer der Endboss hat
        if (this.endbosshits == 4) {
            this.endbossdead = true;
            console.log("Endboss ist tot!"); // Überprüft, ob der Endboss als tot erkannt wird
            return this.endbossEnergy == 0;
            
        }
        //return false;
    }
    endbossIsDead() {
        
        console.log(this.endbossdead)
        return this.endbossEnergy == 0;
    
    }*/

    endbossIsDead() {
        return this.endbossEnergy == 0;  // Gibt nur den aktuellen Status von endbossdead zurück
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



    endScreenLose() {
        //let startbtn = document.getElementById("startbtn");
        let navbar = document.getElementById('navbar');
       let canvas = document.getElementById('canvas');
        let losescreen = document.getElementById('endscreenLose');
        let mobileIcons = document.getElementById('mobileIcons');
        if(this.isDead()){
            this.endscreenfail = true;
        }

        if (this.endscreenfail) {
            setTimeout(() => {
                 mobileIcons.classList.add('d-none');
               canvas.classList.add('d-none');
                losescreen.classList.remove('d-none');
                navbar.classList.add('d-none');
              //  startbtn.classList.remove('d-none');
               // this.world = null;
            }, 1500);
        }
        gameIsRunning = false;
    }

/*
    soundMute(){

     
        let soundOn = document.getElementById('soundOn');
        let soundOff = document.getElementById('soundOff');

if (this.soundsilence){
    soundOn.classList.remove('d-none');
    soundOff.classList.add('d-none');
    this.soundsilence = false;
}
if (!this.soundsilence){
    soundOn.classList.add('d-none');
    soundOff.classList.remove('d-none');
    this.soundsilence = true;
}
    }
}
document.getElementById('soundIcon').addEventListener('click', function () {
    movableObjectInstance.soundMute();
}); */}