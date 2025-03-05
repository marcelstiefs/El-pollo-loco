class PickableObject extends DrawableObjekt {
    width = 120;
    height = 120;

    /**
     * Starts the animation loop for the coin by cycling through IMAGES_COIN.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }

    /**
     * Plays an animation by cycling through a given array of images.
     * 
     * @param {string[]} images - The array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
}