class HealthStatusbar extends DrawableObjekt{
    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    IMAGES_COINS_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    percentage = 100;

    constructor() {
        
    
        super();
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.loadImages(this.IMAGES_COINS_BAR);
        //this.loadImages(this.IMAGES_BOTTLES_BAR);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
       
        this.percentage = percentage
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }

    addcoin(collectedCoins){
        this.collectedCoins = collectedCoins * 21;
        if (this.collectedCoins > -1 ){
           let percentagePlusCoin = this.collectedCoins + this.percentage
            this.setPercentage(percentagePlusCoin);
            this.collectedCoins = 0;
        }

    }
    /*
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        }
        else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
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