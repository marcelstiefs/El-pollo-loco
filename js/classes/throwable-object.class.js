class ThrowableObject extends MovableObject {
    otherDirection = false;

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



    animate() {

        setInterval(() => {
            if (this.hashit){
                this.playAnimation(this.SPLASH_BOTTLE);
            }else{this.playAnimation(this.THROW_BOTTLE);
            }
        }, 80);
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }




isColliding(mo) {
    return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height

}
}