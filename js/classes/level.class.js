class Level {
    enemies;
    pickUps;
    clouds;
    backgroundObjects;
    level_end_x = 2200;


    constructor(enemies, pickUps, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.pickUps = pickUps;
    }
}