class Character extends MovableObject {
    height = 280;
    y = 150;
    speed = 2.5;
    chill = false;
    idleTimeout;
    ouchPlayed = false;
    jumpAnimate = false;
    characterIsDead = false;
    isPlayingDeadAnimation = false;
    activeIntervals;
    soundsEnabled = false;
    offset = {
        top: 120,
        left: 20,
        right: 20,
        bottom: 15
    };
    IMAGES_IDLE = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
    ];
    IMAGES_LONG_IDELE = [
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
        "img/2_character_pepe/1_idle/long_idle/I-16.png",
        "img/2_character_pepe/1_idle/long_idle/I-17.png",
        "img/2_character_pepe/1_idle/long_idle/I-18.png",
        "img/2_character_pepe/1_idle/long_idle/I-19.png",
        "img/2_character_pepe/1_idle/long_idle/I-20.png",
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];
    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    world;
    sounds;
    allsounds = {
        walking_sound: new Audio('sounds/walking.mp3'),
        snorring_sound: new Audio('sounds/snorring_sound.mp3'),
        ouch_sound: new Audio('sounds/ouch_sound.mp3'),
        jumping_sound: new Audio('sounds/jump.mp3'),
        death_sound: new Audio('sounds/pain_sound.mp3')
    };
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDELE);
        this.applyGravity();
        this.activeIntervals = [];
        this.animate();
    }

    /**
    * Initializes animation intervals for movement, idle, and jumping.
    */
    animate() {
        this.activeIntervals.push(setInterval(() => {
            this.handleWalkingAndJumping();
            this.updateCameraPosition();
        }, 1000 / 60));

        this.activeIntervals.push(setInterval(() => {
            this.handleIdleAndDamage();
        }, 100));

        this.activeIntervals.push(setInterval(() => {
            this.handleJumpAnimation();
        }, 180));
    }

    /**
     * Handles movement and plays walking/jumping sounds.
     */
    handleWalkingAndJumping() {
        this.allsounds.walking_sound.pause();
        this.allsounds.jumping_sound.pause();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isHurt()) {
            this.moveRightWithSound()
        }
        if (this.world.keyboard.LEFT && this.x > -400) {
            this.moveLeftWithSound()
        }
        if (this.world.keyboard.UP && !this.isAboveGround() && !this.isHurt()) this.jump();
        this.playJumpingSound();
    }

    /**
     * Moves the character to the right and plays the walking sound.
     */
    moveRightWithSound() {
        this.moveRight();
        this.otherDirection = false;
        this.playWalkingSound();
    }

    /**
     * Moves the character to the left and plays the walking sound.
     */
    moveLeftWithSound() {
        this.moveLeft();
        this.otherDirection = true;
        this.playWalkingSound();
    }

    /**
     * Plays walking sound if not muted and on the ground.
     */
    playWalkingSound() {
        if (!this.isAboveGround() && notMute) this.allsounds.walking_sound.play();
    }

    /**
     * Plays jumping sound if not muted and in the air.
     */
    playJumpingSound() {
        if (this.isAboveGround() && notMute) this.allsounds.jumping_sound.play();
    }

    /**
     * Updates camera position based on player location.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
    * Handles idle, damage, and death animations.
    */
    handleIdleAndDamage() {
        this.firstKeyPress();
        this.allsounds.snorring_sound.pause();
        if (this.shouldPlayIdleAnimation()) this.playIdleAnimation();
        else if (this.shouldPlayShortIdleAnimation()) this.playShortIdleAnimation();
        else if (this.isDead()) this.handleDeathAnimation();
        else if (this.isHurt()) {
            if (notMute) this.allsounds.ouch_sound.play();
            if (!this.hasTakenDamage) this.damagePush();
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.shouldPlayWalkingAnimation()) this.playAnimation(this.IMAGES_WALKING);
    }

    /**
    * Pushes the character back once when hurt.
    * Splits the logic into multiple smaller functions to improve readability and modularity.
    */
    damagePush() {
        if (this.isInvincible) return;
        this.hasTakenDamage = true;
        this.isInvincible = true;
        this.startPushInterval();
    }

    /**
     * Starts the push interval for the damage push.
     */
    startPushInterval() {
        let pushSpeed = 5;
        let pushDuration = 200;
        this.pushStartTime = Date.now();
        this.pushInterval = setInterval(() => {
            this.applyPush(pushSpeed);
        }, 20);
        this.stopPushAfterDuration(pushDuration);
    }

    /**
     * Applies the push (moves the character backward).
     * @param {number} pushSpeed - The speed of the push.
     */
    applyPush(pushSpeed) {
        this.x -= pushSpeed; // Charakter bewegt sich nach links (Rückstoß)
    }

    /**
     * Stops the push after a certain duration.
     * @param {number} pushDuration - The duration of the push in milliseconds.
     */
    stopPushAfterDuration(pushDuration) {
        setTimeout(() => {
            clearInterval(this.pushInterval);
            this.resetDamageStatus();
        }, pushDuration);
    }

    /**
     * Resets the damage and invincibility status after the push.
     */
    resetDamageStatus() {
        setTimeout(() => {
            this.hasTakenDamage = false;
            this.isInvincible = false;
        }, 50);
    }

    /**
     * Checks if idle animation should be played.
     */
    shouldPlayIdleAnimation() {
        return this.idleCountDown() && !this.isHurt() && !this.isDead();
    }

    /**
     * Plays idle animation and snoring sound.
     */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDELE);
        this.playSnoringSound();
    }

    /**
     * Checks if walking animation should be played.
     */
    shouldPlayWalkingAnimation() {
        return !this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT);
    }

    /**
     * Plays snoring sound if not muted.
     */
    playSnoringSound() {
        if (notMute) this.allsounds.snorring_sound.play();
    }

    /**
     * Handles death animation and sound.
     */
    handleDeathAnimation() {
        if (!this.isPlayingDeadAnimation) {
            this.isPlayingDeadAnimation = true;
            this.playDeadAnimationOneTime();
            if (notMute) this.allsounds.death_sound.play();
        }
    }

    /**
     * Handles hurt animation and plays ouch sound.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.ouchPlayed) {
            if (notMute) {
                this.allsounds.ouch_sound.play();
                this.ouchPlayed = true;
            }
        }
    }

    /**
     * Handles jump animation.
     */
    handleJumpAnimation() {
        if (this.isAboveGround() && !this.jumpAnimate) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Stops the Character Intervals.
     */
    stopAllIntervals() {
        this.allsounds.snorring_sound.pause();
        this.activeIntervals.forEach(clearInterval);
        this.activeIntervals = [];

    }

    /**
    * Activates idle mode after 3s of inactivity.
    * Resets on key press.
    * @returns {boolean} Player idle state.
    */
    idleCountDown() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE && !this.isHurt()) {
            if (!this.idleTimeout) {
                this.idleTimeout = setTimeout(() => {
                    this.chill = true;
                }, 4000);
            }
        } else {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
            this.chill = false;
        }
        return this.chill
    }

    /**
    * Activates idle mode after 0.5s of inactivity.
    * Resets on key press.
    * @returns {boolean} Player idle state.
    */
    idleShortCountDown() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE) {
            if (!this.shortIdleTimeout) {
                this.shortIdleTimeout = setTimeout(() => {
                    this.shortChill = true;
                }, 300);
            }
        } else {
            clearTimeout(this.shortIdleTimeout);
            this.shortIdleTimeout = null;
            this.shortChill = false;
        }
        return this.shortChill;
    }

    /**
     * Checks if the short idle animation should be played.
     */
    shouldPlayShortIdleAnimation() {
        return this.idleShortCountDown() && !this.isHurt() && !this.isDead();
    }

    /**
     * Plays short idle animation.
     */
    playShortIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Enables sounds when a key is pressed.
     */
    firstKeyPress() {
        if (!this.soundsEnabled && this.isAnyKeyPressed()) this.soundsEnabled = true;
    }

    /**
     * Checks if any movement or action key is currently pressed.
     * @returns {boolean} - True if any relevant key is pressed, otherwise false.
     */
    isAnyKeyPressed() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT ||
            this.world.keyboard.UP || this.world.keyboard.SPACE;
    }

    /**
     * Handles character death animation.
     */
    approachToDead() {
        this.characterIsDead = true;
        this.playDeadAnimationOnce();
        this.characterIsDead = false;
    }

    /**
     * Plays the death animation once and stops all intervals.
     */
    playDeadAnimationOneTime() {
        let index = 0;
        const interval = setInterval(() => {
            if (index < this.IMAGES_DEAD.length) this.loadImage(this.IMAGES_DEAD[index++]);
            else {
                clearInterval(interval);
                this.characterIsDead = false;
            }
        }, 100);
        this.stopAllIntervals();
        this.endScreenLose();
    }
}