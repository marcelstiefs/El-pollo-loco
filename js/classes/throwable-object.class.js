class ThrowableObject extends MovableObject {
    otherDirection = false;

    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };
    THROW_BOTTLE = [
'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];     

    SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    splash_sound = new Audio('sounds/bottle break.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.THROW_BOTTLE);
        this.loadImages(this.SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.throw();
    }
/*
    throw() {
       
        this.speedY = 30;
        //this.speedX = 20;
        this.applyGravity();
        setInterval(() => {

            this.x += 10;
        
            
        }, 25);
      
    }

*/

    throw() {
        this.speedY = 30;
        this.applyGravity();

        // Speichern des Intervalls in einer Variablen
        let intervalId = setInterval(() => {
            this.x += 10;

            // Prüfen, ob die Flasche den Splash-Zustand erreicht hat
            if (this.hashit) {
               
                clearInterval(intervalId);  // Stoppt das Intervall, wenn die Flasche getroffen hat
            }
        }, 25);

        // Animation für das Werfen und den Splash-Zustand
        this.animate();
    }

/*

    animate() {

        setInterval(() => {
            if (this.hashit){
                this.speedY = 0;
                this.playAnimation(this.SPLASH_BOTTLE);
            }else{this.playAnimation(this.THROW_BOTTLE);
            }
        }, 80);
    }
  
    animate() {
        setInterval(() => {
           this.splash_sound.pause();

            if (this.hashit || !this.isAboveGround() ) {
                this.speedY = 0;  // Flasche bleibt nach dem Treffer stehen
                
                this.hashit = true
                this.playAnimation(this.SPLASH_BOTTLE);
                this.splash_sound.play();
               // this.splash_sound.pause();
                // Das 'this' außerhalb von setTimeout referenziert das Bottle-Objekt korrekt
                setTimeout(() => {
                    // Verwende das 'this'-Kontext des Bottle-Objekts korrekt
                    if (this.throwableObjects) { // Überprüfe, ob throwableObjects definiert ist
                        let index = this.throwableObjects.indexOf(this);  // Finde den Index der aktuellen Flasche
                        if (index > -1) {
                            this.throwableObjects.splice(index, 1);  // Flasche aus dem Array entfernen
                           // this.splash_sound.pause();
                        }
                    }
                }, this.SPLASH_BOTTLE.length * 80);  // Zeit für die Animation (Frame-Dauer * Anzahl der Frames)
            } else {
                this.playAnimation(this.THROW_BOTTLE);
            }
           ;
        }, 80);
    }

    splaschSoundPause(){
        if (this.hashit){
            setTimeout(() => {
                 this.splash_sound.pause();
            }, 2000);
        }
    }


    animate() {
        setInterval(() => {
            // `pause` nur unter spezifischen Bedingungen aufrufen
            if (!this.hashit && !this.splash_sound.paused) {
                this.splash_sound.pause();
            }

            if (this.hashit || !this.isAboveGround()) {
                this.speedY = 0;  // Flasche bleibt nach dem Treffer stehen
                this.hashit = true;
                this.playAnimation(this.SPLASH_BOTTLE);

                // Sound nur abspielen, wenn er pausiert ist, um doppelten Aufruf zu vermeiden
                if (this.splash_sound.paused) {
                   this.splash_sound.play();
                }

                // Verzögerung für das Entfernen des Objekts und Pause des Sounds
                setTimeout(() => {
                    if (this.throwableObjects) { // Überprüfe, ob throwableObjects definiert ist
                        let index = this.throwableObjects.indexOf(this);  // Finde den Index der aktuellen Flasche
                        if (index > -1) {
                            this.throwableObjects.splice(index, 1);  // Flasche aus dem Array entfernen
                            this.splash_sound.pause();
                        }
                    }
                }, this.SPLASH_BOTTLE.length * 80);  // Zeit für die Animation (Frame-Dauer * Anzahl der Frames)
            } else {
                this.playAnimation(this.THROW_BOTTLE);
            }
        }, 80);
    }*/

    animate() {
        this.splashPlayed = false;  // Flag, um zu überprüfen, ob der Sound bereits abgespielt wurde

        setInterval(() => {
            if (!this.hashit && !this.splash_sound.paused) {
                this.splash_sound.pause();
            }

            if (this.hashit || !this.isAboveGround()) {
                this.speedY = 0;  // Flasche bleibt nach dem Treffer stehen
                this.hashit = true;
                this.playAnimation(this.SPLASH_BOTTLE);

                // Prüfen, ob der Sound bereits abgespielt wurde
                if (!this.splashPlayed) {
                    this.splash_sound.play();
                    this.splashPlayed = true;  // Setze die Flag auf true, damit der Sound nicht erneut abgespielt wird
                }

                setTimeout(() => {
                    if (this.throwableObjects) {
                        let index = this.throwableObjects.indexOf(this);
                        if (index > -1) {
                            this.throwableObjects.splice(index, 1);
                            this.splash_sound.pause();  // Pausieren, nachdem die Flasche entfernt wurde
                        }
                    }
                }, this.SPLASH_BOTTLE.length * 80);  // Zeit für die Animation (Frame-Dauer * Anzahl der Frames)
            } else {
                this.playAnimation(this.THROW_BOTTLE);
            }
        }, 80);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }



/*
isColliding(mo) {
    return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height

}*/
}