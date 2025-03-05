class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    sound
    keyboard;
    camera_x = 0;
    statusBar = new HealthStatusbar();
    salsaStatusBar = new SalsaStatusbar();
    coinStatusBar = new StatusBar();
    throwableObjects = [];
    collectedBottles = 0;
    maxBottles = 6;
    collectedCoins = 0;
    bottle;
    endbosshit = 0;
    hashit = false;
    endbossKilled = false;
    chickenDieSound = new Audio('sounds/chicken die.mp3');
    coinSound = new Audio('sounds/coin-sound.mp3')
    bottlePickupSound = new Audio('sounds/bottle-pickup.mp3')

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

    }

    /**
    * Sets the reference to the world in the character.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts various intervals for collision detection and object throwing.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsBottle();
            this.checkCollisionsCoins();
            this.checkCollisionsSalsa();
            this.checkCollisionsArea();
        }, 10);
        setInterval(() => {
            this.checkCollisions();
        }, 30);
        setInterval(() => {
            this.checkThrowObjects();
        }, 180);
    }

    /**
     * Checks if a thrown object collides with an enemy.
     */
    checkThrowCollisions() {
        if (this.throwableObject.isColliding(enemy, 0)) {
            this.hitEnemyFromAbove(enemy);
        }
    }

    /**
     * Checks if the player is within the alert or rage area of the Endboss.
     * If so, updates the Endboss's state accordingly.
     * This function only affects the Endboss and does not modify other enemies.
     */
    checkCollisionsArea() {
        let alertArea = 450;
        let rageArea = 350;
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                if (enemy.isColliding(this.character, alertArea)) {
                    enemy.setAlert(true);
                } else {
                    enemy.setAlert(false);
                }
                if (enemy.isColliding(this.character, rageArea)) {
                    enemy.setRage(true);
                } else {
                    enemy.setRage(false);
                }
            }
        });
    }

    /**
     * Checks collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if ((enemy instanceof Chicken || enemy instanceof SmallChicken) &&
                this.jumpOnEnemy(this.character, enemy) &&
                this.character.isColliding(enemy, 0)) {

                this.hitEnemyFromAbove(enemy);
            } else if (this.character.isColliding(enemy, 0)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks collisions between thrown bottles and enemies.
     */
    checkCollisionsBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.checkEnemyCollisions(bottle);
            this.checkEndbossCollision(bottle);
        });
    }

    /**
     * Checks collisions between bottles and normal enemies.
     */
    checkEnemyCollisions(bottle) {
        this.level.enemies.forEach((enemy) => {
            if ((enemy instanceof Chicken || enemy instanceof SmallChicken) && bottle.isColliding(enemy, 0)) {
                this.hitEnemyFromAbove(enemy);
                bottle.hashit = true;
            }
        });
    }

    /**
     * Checks collisions between bottles and the Endboss.
     */
    checkEndbossCollision(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && bottle.isColliding(enemy, 0) && !bottle.hashit) {
                enemy.hurtEndboss(enemy);
                this.endbosshit++;
                bottle.hashit = true;
            }
        });
        this.checkEndbossDefeated();
        this.deleteBottleAfterHit(bottle);
    }

    /**
     * Checks if the Endboss has been defeated.
     */
    checkEndbossDefeated() {
        if (this.endbosshit === 4) {
            this.endbossKilled = true;
            endScreenWin();
        }
    }

    /**
     * Removes an enemy that has been hit.
     */
    hitEnemyFromAbove(enemy) {
        if (notMute) {
            this.chickenDieSound.play();
        }
        enemy.loadImage(enemy.IMAGE_DEAD);
        setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 10);
    }

    /**
     * Deletes a bottle after it has hit something.
     */
    deleteBottleAfterHit(bottle) {
        if (bottle.hashit) {
            setTimeout(() => {
                let index = this.throwableObjects.indexOf(bottle);
                if (index > -1) {
                    this.throwableObjects.splice(index, 1);
                }
            }, 300);
        }
    }

    /**
     * Checks collisions between the character and coins.
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin, 0)) {
                this.collectCoins(coin);
            }
        });
    }

    /**
     * Checks collisions between the character and salsa bottles.
     */
    checkCollisionsSalsa() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle, 0)) {
                this.collectBottle(bottle);
            }
        });
    }

    /**
     * Adds a collected bottle to the inventory.
     */
    collectBottle(bottle) {
        if (this.collectedBottles < this.maxBottles) {
            let index = this.level.bottles.indexOf(bottle);
            this.level.bottles.splice(index, 1);
            this.collectedBottles++;
            if (notMute) {
                this.bottlePickupSound.play();
            }
        }
        this.salsaStatusBar.setPercentage(this.collectedBottles);

    }

    /**
     * Checks if a bottle should be thrown.
     */
    checkThrowObjects() {
        if (this.keyboard.SPACE && this.collectedBottles > 0 && !this.throwCooldown) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 130);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.salsaStatusBar.setPercentage(this.collectedBottles);
            this.throwCooldown = true;
            setTimeout(() => {
                this.throwCooldown = false;
            }, 1000);
            setTimeout(() => {
                this.removeBottle(bottle);
            }, 2000);
        }
    }

    /**
     * Removes a thrown bottle after a certain time.
     */
    removeBottle(bottle) {
        const index = this.throwableObjects.indexOf(bottle);
        if (index !== -1) {
            this.throwableObjects.splice(index, 1);
        }
        if (bottle.element) {
            bottle.element.remove();
        }
        bottle = null;
    }

    /**
     * Adds a collected coin.
     */
    collectCoins(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
        this.collectedCoins++;
        this.character.energy = Math.min(this.character.energy + 20, 100);
        this.statusBar.setPercentage(this.character.energy);
        this.coinStatusBar.setPercentage(this.collectedCoins);
        if (notMute) {
            this.coinSound.play();
        }
    }

    /**
     * Checks if the character has jumped on an enemy.
     */
    jumpOnEnemy(character, enemy) {
        return character.y + character.height < enemy.y + enemy.height;
    }

    /**
     * Draws the game by rendering the background, status bars, and objects.
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.drawGameObjects();
        this.requestNextFrame();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
    }

    /**
     * Clears the canvas.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws the background.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws the status bars.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.salsaStatusBar);
        this.addToMap(this.coinStatusBar);
    }

    /**
     * Draws game characters and objects.
     */
    drawGameObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * Resets the camera.
     */
    resetCamera() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Requests the next animation frame for drawing.
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds multiple objects to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    /**
     * Adds a single object to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            let translateX = mo instanceof BackgroundObject ? -1 : mo.width;
            this.ctx.translate(translateX, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    /**
     * Removes the Endboss from the game.
     */
    removeEndboss(endboss) {
        let index = this.level.enemies.indexOf(endboss);
        if (index !== -1) {
            this.level.enemies.splice(index, 1);
        }
        if (endboss.element) {
            endboss.element.remove();
        }
        endboss = null;
    }
}
