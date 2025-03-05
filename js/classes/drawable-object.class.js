class DrawableObjekt{
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads a single image.
     * @param {string} path - Image source path.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Loads multiple images into cache.
    * @param {string[]} arr - Array of image paths.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the character on the canvas.
     * @param {CanvasRenderingContext2D} ctx - Canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //this.drawFrame(ctx);

    }


    // This section is reserved for future maintenance or expansion.
/*
drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coins || this instanceof Salsa || this instanceof ThrowableObject ) {
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
// red with offset

        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, (this.x + this.width - this.offset.right) - (this.x + this.offset.left), (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
        ctx.stroke();

        if (this instanceof Endboss){

            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x + this.offset.left - this.alertArea, this.y + this.offset.top, (this.x + this.width + this.alertArea) - (this.x + this.offset.left - this.alertArea), (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
        if (this instanceof Endboss){

            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'green';
            ctx.rect(this.x + this.offset.left - this.rageArea, this.y + this.offset.top, (this.x + this.width + this.rageArea) - (this.x + this.offset.left - this.alertArea), (this.y + this.height - this.offset.bottom) - (this.y + this.offset.top));
            ctx.stroke();
        }
    }
}
*/}