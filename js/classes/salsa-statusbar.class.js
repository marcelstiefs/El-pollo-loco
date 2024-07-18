class SalsaStatusbar extends DrawableObjekt {

    IMAGES_BOTTLES_BAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

 percentage = 0;



    constructor() {
        super();
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height = 60;
       // this.loadImages(this.IMAGES_HEALTH_BAR);
       // this.loadImages(this.IMAGES_COINS_BAR);
        this.loadImages(this.IMAGES_BOTTLES_BAR);
        this.setPercentage(0);
    }




    setPercentage(collectedBottles) {
        let percentage = collectedBottles * 20;
        this.percentage = percentage
        let path = this.IMAGES_BOTTLES_BAR[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }
/* 
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        }
        else if (this.percentage > 20) {
            return 1;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 80) {
            return 4;
        } else {
            return 5;
        }
    }
*/
   resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage > 0 && this.percentage <= 20) {
            return 1;
        } else if (this.percentage > 20 && this.percentage <= 40) {
            return 2;
        } else if (this.percentage > 40 && this.percentage <= 60) {
            return 3;
        } else if (this.percentage > 60 && this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}