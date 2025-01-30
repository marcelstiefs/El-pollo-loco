class Character extends MovableObject {
    height = 300;
    y = 128
    speed = 2.5;
   chill = false;
   idleTimeout;
  ouchPlayed = false; 
    soundsEnabled = false;
    jumpAnimate = false;
    characterIsDead = false
    isPlayingDeadAnimation = false;
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
    walking_sound = new Audio('sounds/walking.mp3');
    snorring_sound = new Audio('sounds/snorring_sound.mp3');
    ouch_sound = new Audio('sounds/ouch_sound.mp3');
    jumping_sound = new Audio('sounds/jump.mp3');
 
    sounds;

    constructor() {

        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDELE);

        this.applyGravity();
        this.animate();
       // this.disableAllSounds();
        //this.idleCountDown();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
           
            this.jumping_sound.pause();
           
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                //this.x += this.speed;
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()){
                this.walking_sound.play();}
            }
            if (this.world.keyboard.LEFT && this.x > -400) {
                this.moveLeft();
                this.otherDirection = true;

                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }

            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                
                //this.speedY = 30;
            }
            if (this.isAboveGround()){
                this.jumping_sound.play();}

            this.world.camera_x = -this.x + 100
        }, 1000 / 60);




        setInterval(() => {
            this.firstKeyPress();  // Überprüft, ob Sounds freigegeben werden sollen
            this.snorring_sound.pause();
            if (!this.soundsEnabled) {
                // Alle Sounds pausieren, wenn die Freigabe noch nicht erfolgt ist
                this.snorring_sound.pause();
                this.ouch_sound.pause();
                return;  // Den Rest der Schleife überspringen, wenn Sounds deaktiviert sind
            }

            // Spielcode, wenn die Sounds aktiviert sind
            if (this.idleCountDown() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_LONG_IDELE);
                if (this.soundsEnabled) {
                    this.snorring_sound.play();
                }
            //else if(this.energy = 0){
               // approachtodead();
            
        } else if (this.isDead()) {
                if (!this.isPlayingDeadAnimation) {
                    this.isPlayingDeadAnimation = true;  // Todesanimation starten
                    this.playDeadAnimationOneTime();       // Todesanimation abspielen
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.ouchPlayed) {
                    this.ouch_sound.play();
                    this.ouchPlayed = true;  // Ouch-Sound nur einmal abspielen
                }
            } else/* if (this.isAboveGround() && !this.jumpAnimate) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.jumpAnimate = true;
                this.jumpAnimate = false;
            } else*/ if (!this.isAboveGround() &&      this.world.keyboard.RIGHT || this.world.keyboard.LEFT ) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 70); 


        setInterval(() => {
            
        if (this.isAboveGround() && !this.jumpAnimate) {
            this.playAnimation(this.IMAGES_JUMPING);
          //  this.jumpAnimate = true;
           // this.jumpAnimate = false;
        }
        }, 180);}
   

/* 
        setInterval(() => {
            //this.snorring_sound.volume = 0;
            this.snorring_sound.pause();
            if (!this.isHurt()) {
                this.ouch_sound.pause();
                this.ouchPlayed = false
            }
            if (this.idleCountDown() && !this.isHurt() && !this.isDead()){
                this.playAnimation(this.IMAGES_LONG_IDELE)
                if (this.pressKeyDetect()){
                this.snorring_sound.play();}
            }

             else if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
               //this.ouch_sound.play();
            }
            if (!this.ouchPlayed && this.isHurt() && this.pressKeyDetect()) {
                this.ouch_sound.play();
                this.ouchPlayed = false;  // Flag setzen, damit der Sound nicht erneut startet
            }

            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 70);

    }

idleCountDown(){
    if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.SPACE ){
        setTimeout(() => {
           
            this.chill = true;
        }, 2000);
    }else{
        this.chill =  false;
    }   

 console.log(this.chill)

} */



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
        this.endScreenLose();
        }
    

/*
    playDeadAnimationOnce() {
        if (this.characterIsDead){
        let currentImageIndex = 0;
        const interval = setInterval(() => {
            if (currentImageIndex < this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[currentImageIndex]);
                currentImageIndex++;
                this.characterIsDead = false;
            } else {
               clearInterval(interval);
            }
        }, 50);
    }
    }
     
    pressKeyDetect(){
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.SPACE){
            this.keyPressed = true;
            return this.keyPressed
        }
    }

  returnChill(){
        if(this.chill){
            return true;
        }
    }
    disableAllSounds() {
        sounds = [this.snorring_sound, this.ouch_sound, this.splash_sound]; // Alle Sounds in ein Array
        this.sounds.forEach(sound => {
            this.sounds.pause();      // Sound pausieren
            
        });
}*/
}