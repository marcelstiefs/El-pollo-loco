class ThrowableObject extends MovableObject {
    otherDirection = false;

    THROW_BOTTLE = [
'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.THROW_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.animate();
        this.throw();
    }

    throw() {
       
        this.speedY = 30;
        //this.speedX = 20;
        this.applyGravity();
        setInterval(() => {

            this.x += 10;
        
            
        }, 25);
      
    }




    animate() {

        setInterval(() => {
            this.playAnimation(this.THROW_BOTTLE);
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