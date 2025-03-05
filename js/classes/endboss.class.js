class Endboss extends MovableObject {

    height = 350;
    width = 250;
    y = 100;
    isPlayingDeadAnimation = false;
    activeIntervals;
    offset = {
        top: 130,
        left: 40,
        right: 20,
        bottom: 0
    };
    alertArea = 450;
    rageArea = 350;

    IMAGES_WALKING = [
        "img/4_enemie_boss_chicken/1_walk/G1.png",
        "img/4_enemie_boss_chicken/1_walk/G2.png",
        "img/4_enemie_boss_chicken/1_walk/G3.png",
        "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
    IMAGES_ALERT = [
        "img/4_enemie_boss_chicken/2_alert/G5.png",
        "img/4_enemie_boss_chicken/2_alert/G6.png",
        "img/4_enemie_boss_chicken/2_alert/G7.png",
        "img/4_enemie_boss_chicken/2_alert/G8.png",
        "img/4_enemie_boss_chicken/2_alert/G9.png",
        "img/4_enemie_boss_chicken/2_alert/G10.png",
        "img/4_enemie_boss_chicken/2_alert/G11.png",
        "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];

    IMAGES_ATTACK = [
        "img/4_enemie_boss_chicken/3_attack/G13.png",
        "img/4_enemie_boss_chicken/3_attack/G14.png",
        "img/4_enemie_boss_chicken/3_attack/G15.png",
        "img/4_enemie_boss_chicken/3_attack/G16.png",
        "img/4_enemie_boss_chicken/3_attack/G17.png",
        "img/4_enemie_boss_chicken/3_attack/G18.png",
        "img/4_enemie_boss_chicken/3_attack/G19.png",
        "img/4_enemie_boss_chicken/3_attack/G20.png",
    ]

    IMAGES_HURT = [
        "img/4_enemie_boss_chicken/4_hurt/G21.png",
        "img/4_enemie_boss_chicken/4_hurt/G22.png",
        "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];

    IMAGES_DEAD = [
        "img/4_enemie_boss_chicken/5_dead/G24.png",
        "img/4_enemie_boss_chicken/5_dead/G25.png",
        "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];
    winPic = "img/9_intro_outro_screens/win/win_2.png";
    lostPic = "img/9_intro_outro_screens/game_over/oh no you lost!.png";
    winSound = new Audio("sounds/win-sound.mp3")
    angryRooster = new Audio('sounds/angry-rooster.mp3')
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImage(this.winPic);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.isAlert = false;
        this.isRage = false;
        this.speed = 1.5;
        this.activeIntervals = [];
        this.x = 2500;
        this.animate();
    }

    /**
    * Initializes animation intervals for movement and state-based animations.
    */
    animate() {
        this.toggleMovementDirection();
        this.activeIntervals.push(setInterval(() => this.handleAnimationState(), 150));
    }

    /**
    * Alternates between moving left and right every 6 seconds unless in alert mode.
    */
    toggleMovementDirection() {
        let movingLeft = true;
        this.speedInterval = setInterval(() => {
            if (!this.isAlert) {
                this.otherDirection = movingLeft ? false : true;
                movingLeft ? this.moveLeft() : this.moveRight();
            }
            if (this.rage() && this.rageJump) {
                this.moveLeftRage();
            }
        }, 1000 / 30);
        this.activeIntervals.push(this.speedInterval);
        this.directionInterval = setInterval(() => {
            if (!this.isAlert) movingLeft = !movingLeft;
        }, 6000);
        this.activeIntervals.push(this.directionInterval);
    }

    /**
     * Handles the attack animation state.
     */
    handleAttackState() {
        if (this.rage() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.otherDirection = false;
            if (notMute) {
                this.angryRooster.play();
            }
            return true;
        }
        return false;
    }

    /**
     * Handles the alert animation state.
     */
    handleAlertState() {
        if (this.alert() && !this.rage() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_ALERT);
            this.otherDirection = false;
            return true;
        }
        return false;
    }

    /**
     * Handles the death animation state.
     */
    handleDeathState() {
        if (this.endbossIsDead()) {
            this.playEndbossDeathAnimation();
            return true;
        }
        return false;
    }

    /**
     * Handles the hurt animation state.
     */
    handleHurtState() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            return true;
        }
        return false;
    }

    /**
     * Determines and plays the appropriate animation based on character state.
     */
    handleAnimationState() {
        if (this.handleAttackState()) return;
        if (this.handleAlertState()) return;
        if (this.handleDeathState()) return;
        if (this.handleHurtState()) return;

        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Plays death animation once if not already playing.
     */
    playEndbossDeathAnimation() {
        this.winSound.pause();
        if (!this.isPlayingDeadAnimation) {
            this.isPlayingDeadAnimation = true;
            this.playDeadAnimationOneTime();
            world.character.stopAllIntervals();
            this.stopAllIntervals();
            if (notMute) {
                this.winSound.play();
            }
        }
    }

    /**
    * Clears all active intervals and resets the activeIntervals array.
     */
    stopAllIntervals() {
        this.activeIntervals.forEach(clearInterval);
        this.activeIntervals = [];
    }

    /**
     * Plays the "dead" animation once by cycling through images in IMAGES_DEAD.
     * Resets the character's death state after completion.
     */
    playDeadAnimationOneTime() {
        let currentImageIndex = 0;
        const interval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(interval);
                this.characterIsDead = false;
            }
        }, 200);
    }

    /**
     * Setzt den Alarm-Zustand des Endbosses.
     * @param {boolean} isAlert - Gibt an, ob der Endboss alarmiert ist.
     */
    setAlert(isAlert) {
        this.isAlert = isAlert;

    }

    /**
     * Gibt zurück, ob der Endboss aktuell alarmiert ist.
     * @returns {boolean}
     */
    alert() {
        return this.isAlert;
    }

    /**
  * Sets the rage state of the character.
  * @param {boolean} isRage - Determines if the character is in rage mode.
  */
    setRage(isRage) {
        this.isRage = isRage;
    }

    /**
     * Checks if the character is in rage mode.
     * @returns {boolean} - True if the character is in rage mode, otherwise false.
     */
    rage() {
        return this.isRage;
    }
}