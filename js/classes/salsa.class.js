class Salsa extends PickableObject {
    width = 60;
    height = 60;
    y = 360


    offset = {
        top: 10,
        left: 20,
        right: 10,
        bottom: 10
    };

    IMAGES_SALSA_PICK_UP = [
        "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
        "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ]

    constructor() {
        super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
       // this.loadImages(this.IMAGES_SALSA_PICK_UP);
        this.x = 200 + Math.random() * 2000;
        //this.y = 80 + Math.random() * 250;
        //this.speed = 0.15 + Math.random() * 0.25
       // this.animate()



    }
}