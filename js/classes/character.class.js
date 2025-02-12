class Character extends MovableObject {
    height = 300;
    y = 128
    speed = 2.5;
   chill = false;
   idleTimeout;
  ouchPlayed = false; 
   
    jumpAnimate = false;
    characterIsDead = false
    isPlayingDeadAnimation = false;
    activeIntervals;
    soundsEnabled = false; 
 // keyPressed = false;
 

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
        //   "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        //   "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        //  "img/2_character_pepe/3_jump/J-37.png",
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
  /*
    walking_sound = new Audio('sounds/walking.mp3');
    snorring_sound = new Audio('sounds/snorring_sound.mp3');
    ouch_sound = new Audio('sounds/ouch_sound.mp3');
    jumping_sound = new Audio('sounds/jump.mp3');
 */
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
       // this.disableAllSounds();
        //this.idleCountDown();
    }
    
    
    animate() {
        this.activeIntervals.push(setInterval(() => {
            this.allsounds.walking_sound.pause();
            this.allsounds.jumping_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround() && notMute) {
                    this.allsounds.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > -400) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround() && notMute) {
                    this.allsounds.walking_sound.play();
                }
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (this.isAboveGround() && notMute) {
                this.allsounds.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60));

        this.activeIntervals.push(setInterval(() => {
            this.firstKeyPress();
            this.allsounds.snorring_sound.pause();

            if (!this.soundsEnabled) return; // Falls Sound aus ist, beende die Funktion direkt!

            if (this.idleCountDown() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_LONG_IDELE);
                if(notMute) {                    
                this.allsounds.snorring_sound.play();
            }
            } else if (this.isDead()) {
                if (!this.isPlayingDeadAnimation) {
                    this.isPlayingDeadAnimation = true;
                    this.playDeadAnimationOneTime();
                    if(notMute){
                        this.allsounds.death_sound.play();
                    }
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.ouchPlayed && notMute) {
                    this.allsounds.ouch_sound.play();
                    this.ouchPlayed = true;
                }
            } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 70));

        this.activeIntervals.push(setInterval(() => {
            if (this.isAboveGround() && !this.jumpAnimate) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 180));
    }
/*
    animate() {
        // Speichert alle Intervalle, um sie später zu löschen
        this.activeIntervals.push(setInterval(() => {
            this.allsounds.walking_sound.pause();
            this.allsounds.jumping_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()) this.allsounds.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > -400) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) this.allsounds.walking_sound.play();
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (this.isAboveGround()) this.allsounds.jumping_sound.play();

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60));

        this.activeIntervals.push(setInterval(() => {
            this.firstKeyPress();
            this.allsounds.snorring_sound.pause();
            if (!this.soundsEnabled) return;

            if (this.idleCountDown() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_LONG_IDELE);
                this.allsounds.snorring_sound.play();
            } else if (this.isDead()) {
                if (!this.isPlayingDeadAnimation) {
                    this.isPlayingDeadAnimation = true;
                    this.playDeadAnimationOneTime();
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.ouchPlayed) {
                    this.allsounds.ouch_sound.play();
                    this.allsounds.ouchPlayed = true;
                }
            } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 70));

        this.activeIntervals.push(setInterval(() => {
            if (this.isAboveGround() && !this.jumpAnimate) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 180));
    }

    * Funktion zum Stoppen aller Intervalle */
    stopAllIntervals() {
        this.allsounds.snorring_sound.pause();
        this.activeIntervals.forEach(clearInterval);
        this.activeIntervals = []; // Array leeren
        
    }



    idleCountDown() {
        
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE) {
            
            if (!this.idleTimeout) {  
                this.idleTimeout = setTimeout(() => {
                    this.chill = true;  
                    
                }, 2000);
            }
        } else {
            
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
            this.chill = false;
        }
        return this.chill
    } 
    
    firstKeyPress() {
        if (!this.soundsEnabled && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.SPACE)) {
            this.soundsEnabled = true;  // Sounds freigeben, wenn eine Taste gedrückt wird
        }
    }


     approachtodead(){
   // if (!this.characterIsDead){
            
            this.characterIsDead = true;
            this.playDeadAnimationOnce();
         this.characterIsDead = false;
     //   } 
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
        this.stopAllIntervals();
        this.endScreenLose();
        }
    }
   /* 
    soundMute() {
        const soundOn = document.getElementById("soundOn");
        const soundOff = document.getElementById("soundOff");

        // Toggle soundsEnabled-Status
        this.soundsEnabled = !this.soundsEnabled;

        // Alle Sounds ein- oder ausschalten
       // for (let sound in character.allsounds) {
         //   character.allsounds[sound].muted = !character.soundsEnabled;
      //  }

        // Icon wechseln
        if (this.soundsEnabled) {
            soundOn.classList.remove("d-none");
            soundOff.classList.add("d-none");
        } else {
            soundOn.classList.add("d-none");
            soundOff.classList.remove("d-none");
        }
    }

}


document.getElementById('soundIcon').addEventListener('click', function () {
    soundMute();
});   */