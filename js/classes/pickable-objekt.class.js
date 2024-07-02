class PickableObject extends DrawableObjekt {
    width = 120;
    height = 120;
   // y = 80;





    animate() {

        setInterval(() => {
           this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}