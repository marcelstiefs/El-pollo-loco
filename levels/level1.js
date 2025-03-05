/**
 * Initializes the first level by setting up the enemies, collectible items, power-ups, clouds, and background objects.
 * 
 * This function creates a `Level` instance with predefined objects:
 * - Enemies: Small Chickens, Chickens, and an Endboss.
 * - Collectibles: Coins.
 * - Power-ups: Salsa items.
 * - Clouds: Several cloud objects with different positions.
 * - Background objects: Layered background with multiple images.
 * 
 * The function initializes `level1` by passing the arrays of objects to the `Level` constructor.
 */
function initLevel() {
    level1 = new Level(
        [
           new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
        ], [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
    ], [
        new Salsa(),
        new Salsa(),
        new Salsa(),
        new Salsa(),
        new Salsa(),
        new Salsa(),
        new Salsa(),
        new Salsa(),
    ],
        [
            new Cloud(-719),
            new Cloud(719),
            new Cloud(719 * 2),
            new Cloud(719 * 3),
        ],
        [
            // Air Layer
            new BackgroundObject('img/5_background/layers/air.png', -718 * 2),
            new BackgroundObject('img/5_background/layers/air.png', -718),
            new BackgroundObject('img/5_background/layers/air.png', 2),
            new BackgroundObject('img/5_background/layers/air.png', 721),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/air.png', 720 * 4),

            // Third Layer
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -720 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 1),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 721),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 4),

            // Second Layer
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -720 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 1),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 721),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 4),

            // First Layer
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -720 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 1),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 721),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 4),
        ]
    );
}
