// Constructor
function GameObject() {}

/********************/
/* Spawns Character */
/********************/
GameObject.prototype.spawnCharacter = function() {
    character = new PIXI.Sprite(PIXI.loader.resources["assets/images/character.png"].texture);
    character.x = scale(430);
    character.y = scale(430);
    character.scale.x = scale(1);
    character.scale.y = scale(1);
    app.stage.addChild(character);
};

/*******************/
/* Spawns Scroll   */
/*******************/
let flipper = 0;
GameObject.prototype.spawnScroll = function() {
    // Reset the scroll timer
    scrollTimer = 0;

    // Load resources and create sprite
    sheet = PIXI.loader.resources["assets/images/scroll.json"].spritesheet;
    sheet = PIXI.loader.resources["assets/images/scroll.json"].spritesheet;
    scroll = new PIXI.extras.AnimatedSprite(sheet.animations["scroll"]);

    // Scale scroll to correct size
    scroll.scale.x = scale(0.3);
    scroll.scale.y = scale(0.3);

    if (flipper == 0) {
        // Spawn location
        scroll.x = scale(0);
        scroll.y = scale(415);

        // Initial speeds
        scroll.vx = scale(scrollSpeed);
        scroll.vy = 0;
    }
    if (flipper == 1) {
        // Spawn location
        scroll.x = background.width / 2 - scale(30);
        scroll.y = 0;

        // Initial speeds
        scroll.vx = 0;
        scroll.vy = scale(scrollSpeed);
    }
    if (flipper == 2) {
        // Spawn location
        scroll.x = background.width - scale(50);
        scroll.y = scale(415);

        // Initial speeds
        scroll.vx = scale(-(scrollSpeed));
        scroll.vy = 0;
    }
    if (flipper == 3) {
        // Spawn location
        scroll.x = background.width / 2 - scale(30);
        scroll.y = background.height  - scale(60);

        // Initial speeds
        scroll.vx = 0;
        scroll.vy = scale(-(scrollSpeed));
    }

    // Start the animation
    scroll.animationSpeed = 0.3;
    scroll.play();

    // Store scroll into the collection
    scrolls.push(scroll);

    // Add to the scene
    app.stage.addChild(scroll);

    flipper++;
    if (flipper == 4)
        flipper = 0;
};

// Bumper class declaration
function Bumper(sprite, direction) {
    this.sprite = sprite;
    this.direction = direction;
}

Bumper.prototype.getSprite = function(){
    return this.sprite;
};
Bumper.prototype.getDirection = function(){
    return this.direction;
};

/*********************/
/* Spawn Bumpers     */
/*********************/
GameObject.prototype.spawnBumpers = function() {
    // Left Side
    this.createBumper("up", 160, 465);
    this.createBumper("right", 115, 300);
    this.createBumper("down", 295, 350);
    this.createBumper("right", 245, 500);

    // Right Side
    this.createBumper("down", 735, 415);
    this.createBumper("left", 780, 570);
    this.createBumper("up", 605, 530);
    this.createBumper("left", 650, 370);
};

// Create Bumper
GameObject.prototype.createBumper = function(direction, x, y) {
    bumper = new PIXI.Sprite(PIXI.loader.resources["assets/images/bumper.png"].texture);
    bumper.x = scale(x);
    bumper.y = scale(y);
    bumper.scale.x = scale(1);
    bumper.scale.y = scale(1);
    app.stage.addChild(bumper);
    bumperObject = new Bumper(bumper, direction);
    bumpers.push(bumperObject);
};

/*********************/
/* Spawn Tree        */
/*********************/
GameObject.prototype.spawnTree = function(x, y) {
    sheet = PIXI.loader.resources["assets/images/tree.json"].spritesheet;
    tree = new PIXI.extras.AnimatedSprite(sheet.animations.tree);
    
    tree.scale.x = scale(0.8);
    tree.scale.y = scale(0.8);

    tree.x = scale(x);
    tree.y = scale(y);

    tree.animationSpeed = 0.1;
    
    setTimeout(function(tree){
        tree.play();
    }, randomInt(1, 200), tree);

    app.stage.addChild(tree);
};

/*********************/
/* Spawn Rock        */
/*********************/
GameObject.prototype.spawnRock = function(x, y) {
    sheet = PIXI.loader.resources["assets/images/rock.json"].spritesheet;
    rock = new PIXI.extras.AnimatedSprite(sheet.animations.rock);
    
    rock.scale.x = scale(0.1);
    rock.scale.y = scale(0.1);

    rock.x = scale(x);
    rock.y = scale(y);

    rock.animationSpeed = 0.05;
    
    setTimeout(function(rock){
        rock.play();
    }, randomInt(1, 200), rock);

    app.stage.addChild(rock);
};

/*********************/
/* Spawn Trees/Rocks */
/*********************/
GameObject.prototype.spawnTerrain = function() {
    randomRock = randomInt(1, 7);
    x = 0;
    y = 0;
    // Q1
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 30);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(0 + y, 30 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(70 + y, 80 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(120 + y, 130 + y));
    }
    randomRock = randomInt(1, 7);
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 210 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(170 + y, 180 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(220 + y, 230 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(270 + y, 280 + y));
    }

    x = 500;
    // Q2
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(0 + y, 30 + y));
    }
    randomRock = randomInt(1, 7);
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 100 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(70 + y, 80 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(120 + y, 130 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(170 + y, 180 + y));
    }
    randomRock = randomInt(1, 7);
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 250 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(220 + y, 230 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(270 + y, 280 + y));
    }
    x = 600;
    for (i = 0; i < 5; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(330 + y, 340 + y));
    }

    x = 0;
    y = 500;
    // Q3
    randomRock = randomInt(1, 7);
    for (i = 0; i < 6; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 30 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(0 + y, 30 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(70 + y, 80 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(120 + y, 130 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(170 + y, 180 + y));
    }
    randomRock = randomInt(1, 7);
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 250 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(220 + y, 230 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(270 + y, 280 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(320 + y, 330 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(370 + y, 380 + y));
    }

    x = 500;
    y = 500;
    // Q4
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(70 + y, 80 + y));
    }
    randomRock = randomInt(1, 7);
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 150 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(120 + y, 130 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(170 + y, 180 + y));
    }
    randomRock = randomInt(1, 7);
    for (i = 0; i < 7; i++) {
        if (i == randomRock)
            this.spawnRock((randomInt(60, 65) * i) + x, 250 + y);
        else
            this.spawnTree((randomInt(60, 65) * i) + x, randomInt(220 + y, 230 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(270 + y, 280 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(320 + y, 330 + y));
    }
    for (i = 0; i < 7; i++) {
        this.spawnTree((randomInt(60, 65) * i) + x, randomInt(370 + y, 380 + y));
    }

    this.spawnTree(20, 350);
    this.spawnTree(180, 420);
    this.spawnTree(315, 350);

    this.spawnTree(585, 500);
    this.spawnTree(720, 420);
    this.spawnTree(850, 500);
};