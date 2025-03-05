class StatusBar extends DrawableObjekt {
  
    IMAGES_COINS_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    percentage = 0;

    constructor() {
        super();
        this.x = 30;
        this.y = 95;
        this.width=200;
        this.height = 60;
        
        this.loadImages(this.IMAGES_COINS_BAR);
        this.setPercentage(0);
    }

    /**
     * Sets the health percentage and updates the corresponding health bar image.
     * 
     * @param {number} percentage - The new health percentage (0-100).
     */
    setPercentage(collectedCoins) {
        this.percentage = collectedCoins *21;
        let path = this.IMAGES_COINS_BAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index for the health bar image based on the current percentage.
     * 
     * @returns {number} The index of the health bar image.
     */ 
    resolveImageIndex() {
        if (this.percentage > 100) {
            return 5;
        } else if (this.percentage > 80) {
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
}