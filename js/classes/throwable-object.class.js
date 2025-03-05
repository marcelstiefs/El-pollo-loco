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

    /**
    * Throws the object with an initial upward speed and forward motion. 
    * Stops when it hits something or reaches the ground.
    */
    throw() {
        this.speedY = 18;
        this.applyGravity();

        let intervalId = setInterval(() => {
            this.x += 10;
            if (this.hashit || this.y > 390) {
                clearInterval(intervalId);
            }
        }, 25);
        this.animate();
    }

    /**
     * Starts the bottle animation loop.
     */
    animate() {
        this.splashPlayed = false;
        this.animationInterval = setInterval(() => {
            this.handleSplashSound();
            this.handleCollision();
        }, 80);
    }

    /**
     * Pauses the splash sound if the bottle hasn't hit anything.
     */
    handleSplashSound() {
        if (!this.hashit && !this.splash_sound.paused) {
            this.splash_sound.pause();
        }
    }

    /**
     * Handles the collision logic and plays the appropriate animation.
     */
    handleCollision() {
        if (this.hashit || !this.isAboveGround()) {
            this.onCollision();
        } else {
            this.playAnimation(this.THROW_BOTTLE);
        }
        this.stopAnimationIfNeeded();
    }

    /**
     * Plays the splash animation and sound when the bottle hits something.
     */
    onCollision() {
        this.speedY = 0;
        this.hashit = true;
        this.playAnimation(this.SPLASH_BOTTLE);
        this.playSplashSound();
        this.removeBottleAfterSplash();
    }

    /**
     * Plays the splash sound if it hasn't been played yet.
     */
    playSplashSound() {
        if (!this.splashPlayed && notMute) {
            this.splash_sound.play();
            this.splashPlayed = true;
        }
    }

    /**
     * Removes the bottle from the throwable objects after the splash animation.
     */
    removeBottleAfterSplash() {
        setTimeout(() => {
            if (this.throwableObjects) {
                let index = this.throwableObjects.indexOf(this);
                if (index > -1) {
                    this.throwableObjects.splice(index, 1);
                    this.splash_sound.pause();
                }
            }
            clearInterval(this.animationInterval);
        }, this.SPLASH_BOTTLE.length * 80);
    }

    /**
     * Stops the animation if the bottle is on the ground or has hit something.
     */
    stopAnimationIfNeeded() {
        if (this.y > 390 || this.hashit) {
            clearInterval(this.animationInterval);
        }
    }

    /**
     * Cycles through an array of images to create an animation effect.
     * 
     * @param {string[]} images - An array of image paths to be displayed in sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}