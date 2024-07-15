class Coins extends PickableObject {
    width = 120;
    height = 120;
    IMAGES_COIN = [
        "img/8_coin/coin_1.png",
        "img/8_coin/coin_2.png",
    ]

    constructor() {
        super().loadImage("img/8_coin/coin_1.png");
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 2000;
        this.y = 80 + Math.random() * 250;
        //this.speed = 0.15 + Math.random() * 0.25
        this.animate()

  
  
    }


}