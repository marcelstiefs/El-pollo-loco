class MovableObject extends DrawableObjekt {

    speed = 0.3;
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
    alertMode;
    rageJump;
    rageSpeed = 5;

    /**
     * Applies gravity to the object by decreasing its Y position over time.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelaration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        return this instanceof ThrowableObject ? this.y < 390 : this.y < 128;
    }

    /**
 * Checks if the given object is within a specified area.
 * 
 * @param {MovableObject} mo - The object to check.
 * @param {number} area - The extra area to consider (e.g., alertArea or rageArea).
 * @returns {boolean} True if the object is within the specified area, otherwise false.
 */
   isColliding(mo, area) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left - area < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
    * Reduces the object's energy when hit, but only if not invincible.
    */
    hit() {
        if (this.isInvincible) return;
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
    * Checks if the character is in alert mode.
    * @returns {boolean} True if the character is alert, otherwise false.
    */
    alert() {
        return this.isAlert;
    }

    /**
     * Damages the end boss and updates its energy.
     */
    hurtEndboss() {
        this.endbosshits++;
        this.endbossEnergy -= 25;
        if (this.endbossEnergy < 0) {
            this.endbossEnergy = 0;
            this.endbossdead = true;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object was recently hit.
     * 
     * @returns {boolean} True if hit within the last second.
     */
    isHurt() {
        return (new Date().getTime() - this.lastHit) / 1000 < 1;
    }

    /**
     * Checks if the object is dead.
     * 
     * @returns {boolean} True if energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the end boss is dead.
     * 
     * @returns {boolean} True if the end boss energy is 0.
     */
    endbossIsDead() {
        return this.endbossEnergy == 0;
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
        this.rageJump = (i >= 4 && i <= 5);
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Moves the object to the right.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
    * Moves the character to the left at rage speed.
    */
    moveLeftRage() {
        this.x -= this.rageSpeed;
    }

    /**
     * Displays the losing screen when the player dies.
     */
    endScreenLose() {
        if (this.isDead()) {
            this.endscreenfail = true;
        }
        if (this.endscreenfail) {
            setTimeout(() => {
                mobileIcons.classList.add('d-none');
                canvas.classList.add('d-none');
                closeFullscreen();
                endscreenLose.classList.remove('d-none');
                navbar.classList.add('d-none');
            }, 1500);
        }
        gameIsRunning = false;
    }
}