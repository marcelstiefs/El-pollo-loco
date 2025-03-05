class Level {
    enemies;
    coins;
    bottles;
    clouds;
    backgroundObjects;
    level_end_x = 3000;
 
    constructor(enemies, coins, bottles, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}