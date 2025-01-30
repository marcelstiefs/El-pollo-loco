class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 60;
    isPlayingDeadAnimation = false;

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

        this.x = 2500;
        this.animate();

    }
/*
    animate() {

        setInterval(() => {


            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.hurtEndboss(endboss)()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
    


    animate() {
        setInterval(() => {
            // Überprüfen, ob der Endboss tot ist
            if (this.endbossIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            // Überprüfen, ob der Endboss verletzt ist
            else if (this.isHurt() && !this.endbossdead) {
                this.playAnimation(this.IMAGES_HURT);
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
}*/


    animate(){
        setInterval(() => {
            this.moveLeft();

        }, 1000 / 60);
     
        setInterval(() => {
            // Überprüfen, ob der Endboss tot ist
            if (this.endbossIsDead()) {
                if (!this.isPlayingDeadAnimation) {
                    this.isPlayingDeadAnimation = true;  // Todesanimation starten
                    this.playDeadAnimationOneTime();       // Todesanimation abspielen
                }
              //  this.playAnimation(this.IMAGES_DEAD);  // Spielt nur die Tot-Animation
                //this.endScreen();
                //this.loadImage(this.winPic);
            }
            // Überprüfen, ob der Endboss verletzt ist, aber noch lebt
            else if (this.isHurt() && !this.endbossIsDead()) {
                
                this.playAnimation(this.IMAGES_HURT);  // Spielt die Verletzungsanimation
            }
            // Wenn der Endboss nicht tot oder verletzt ist, normale Animation
            else if (!this.endbossIsDead()){
               
                this.playAnimation(this.IMAGES_WALKING);  // Spielt die Laufanimation
            }
        }, 150);
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