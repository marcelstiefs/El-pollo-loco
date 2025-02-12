class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 60;
    isPlayingDeadAnimation = false;
    activeIntervals;

    offset = {
        top: 130,
        left: 40,
        right: 20,
        bottom: 0
    };
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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImage(this.winPic);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
  this.activeIntervals = [];
        this.x = 2500;
        this.animate();
      

    }

    animate() {
        // Speichert das Intervall für Bewegung
        this.activeIntervals.push(setInterval(() => {
            this.moveLeft();
        }, 1000 / 60));

        // Speichert das Intervall für die Animationen
        this.activeIntervals.push(setInterval(() => {
            if (this.endbossIsDead()) {
                if (!this.isPlayingDeadAnimation) {
                    this.isPlayingDeadAnimation = true;
                    this.playDeadAnimationOneTime();
                }
            } else if (this.isHurt() && !this.endbossIsDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!this.endbossIsDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150));
    }

    /** Funktion zum Stoppen aller Intervalle */
    stopAllIntervals() {
        this.activeIntervals.forEach(clearInterval);
        this.activeIntervals = []; // Array leeren
        
    }

    playDeadAnimationOneTime() {

        let currentImageIndex = 0;
        const interval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
            } else {
                clearInterval(interval);
                this.characterIsDead = false;
                //this.isPlayingDeadAnimation = false;  // Flag zurücksetzen
            }
        }, 200);
        //this.endScreenLose();
       // this.endScreenWin();
    }







}