// Flags
let dead = false;

// Globals
let background;
let hits = [];
let healthBar;

// Character info
let character;
let characterHealth = 100;
let killPoints = 0;

// Scrolls info
let scrolls = [];       // Array to hold all active scrolls
let scrollTimer = 0;    // Timer to track when to spawn
let scrollSpawn = 100;  // 300 = 5 seconds

/////////////////

let bumpers = [];

function Bumper(sprite, direction) {
    this.sprite = sprite;
    this.direction = direction;
}

Bumper.prototype.getSprite = function(){
    return this.sprite;
}
Bumper.prototype.getDirection = function(){
    return this.direction;
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Determine PixiJS platform
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

//Create a Pixi Application
let app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1       // default: 1
});

// Set the renderer appearance
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById('game').appendChild(app.view);

// Load assets
PIXI.loader
.add("assets/images/map.png")
.add("assets/images/tree.png")
.add("assets/images/tree.json")
.add("assets/images/scroll.png")
.add("assets/images/scroll.json")
.add("assets/images/hit.png")
.add("assets/images/character.png")
.add("assets/images/bumper.png")
.load(setup);

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

function setup() {
    //Set the game state
    state = play;
    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => gameLoop(delta));

    // Add background
    background = new PIXI.Sprite(PIXI.loader.resources["assets/images/map.png"].texture);
    background.height = window.innerHeight;
    background.width = background.height;
    app.stage.addChild(background);

    // Spawn bumpers
    spawnBumpers();

    //Make the trees
    spawnTree(20, 350);
    spawnTree(180, 420);
    spawnTree(315, 350);

    // Add character sprite
    spawnCharacter();

    // Adds health bar
    createHealthBar();

    //Left arrow key `press` method
    left.press = () => {
        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/hit.png"].texture);
        hit.x = 428;
        hit.y = 448;
        app.stage.addChild(hit);
        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit);
            });
            hits = [];
        }
        hits.push(hit);
    };
    left.release = () => {
        // Remove the hitbox
        hits.forEach(function(hit) {
            app.stage.removeChild(hit);
        });
        hits = [];
    };

    //Right
    right.press = () => {
        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/hit.png"].texture);
        hit.x = 498;
        hit.y = 448;
        app.stage.addChild(hit);
        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit);
            });
            hits = [];
        }
        hits.push(hit);
    };
    right.release = () => {
        // Remove the hitbox
        hits.forEach(function(hit) {
            app.stage.removeChild(hit);
        });
        hits = [];
    };

    /*
    //Up
    up.press = () => {
        man.vy = -5;
        man.vx = 0;
    };
    up.release = () => {
        if (!down.isDown && man.vx === 0) {
            man.vy = 0;
        }
    };


    //Down
    down.press = () => {
        man.vy = 5;
        man.vx = 0;
    };
    down.release = () => {
        if (!up.isDown && man.vx === 0) {
            man.vy = 0;
        }
    };
    */

    
}

function gameLoop(delta){
    //Update the current game state:
    state(delta);
}

function play(delta) {
    // Update 
    scrollTimer += delta;

    // Spawn scrolls if player isn't dead
    if (!dead) {
        // Spawn scroll based on spawn times
        if (scrollTimer >= scrollSpawn) {
            spawnScroll();
        }
    }
    

    scrolls.forEach(function(scroll) {
        // Run if player isn't dead
        if (!dead) {
            //console.log(scroll.x)
            //Move the scroll
            scroll.x += scroll.vx;
            scroll.y += scroll.vy;
            
            //console.log(scroll.y);

            bumpers.forEach(function(bumper) {
                if ( hitTestRectangle(scroll, bumper.getSprite()) ) {
                    if (bumper.getDirection() == "up") {
                        scroll.vx = 0;
                        scroll.vy = -0.4;
                    }
                    if (bumper.getDirection() == "down") {
                        scroll.vx = 0;
                        scroll.vy = 0.4;
                    }
                    if (bumper.getDirection() == "left") {
                        scroll.vx = -0.4;
                        scroll.vy = 0;
                    }
                    if (bumper.getDirection() == "right") {
                        scroll.vx = 0.4;
                        scroll.vy = 0;
                    }
                }
            });

            // Scroll death by player
            if (hits.length != 0 && hitTestRectangle(scroll, hit)) {
                index = scrolls.indexOf(scroll);    // Locate scroll in question
                app.stage.removeChild(scroll);      
                if (index > -1) {
                    scrolls.splice(index, 1); 
                }

                hits.forEach(function(hit) {
                    app.stage.removeChild(hit);
                });
                hits = [];
                
                // Increment kill points and publish
                killPoints++;
                $('#killPoints').text("Kill Points: " + killPoints);
            }
            // Scroll death by hitting player
            if (hitTestRectangle(scroll, character)) {
                index = scrolls.indexOf(scroll);    // Locate scroll in question
                app.stage.removeChild(scroll);      // Despawn scroll
                if (index > -1) {
                    scrolls.splice(index, 1); // Remove scroll from active array
                }

                // Reduce player health
                healthBar.outer.width -= 10;
                characterHealth -= 10;
            }
        }
        // Game Over
        else {
            // Halt all enemey movement
            scroll.vx = 0;
            scroll.vy = 0;
        }

        // Check for character death
        if (characterHealth == 0) {
            dead = true;
        }
    });
}

/********************/
/* Spawns Character */
/********************/
function spawnCharacter() {
    character = new PIXI.Sprite(PIXI.loader.resources["assets/images/character.png"].texture);
    character.x = 448;
    character.y = 448;
    app.stage.addChild(character);
}

/*******************/
/* Spawns Scroll   */
/*******************/
let flipper = 0;
function spawnScroll() {
    // Reset the scroll timer
    scrollTimer = 0;

    // Load resources and create sprite
    sheet = PIXI.loader.resources["assets/images/scroll.json"].spritesheet;
    sheet = PIXI.loader.resources["assets/images/scroll.json"].spritesheet;
    scroll = new PIXI.extras.AnimatedSprite(sheet.animations["scroll"]);

    // Scale scroll to correct size
    scroll.scale.x = 0.2;
    scroll.scale.y = 0.2;

    if (flipper == 0) {
        // Spawn location
        scroll.x = 0;
        scroll.y = 435;

        // Initial speeds
        scroll.vx = 0.4;
        scroll.vy = 0;
    }
    if (flipper == 1) {
        // Spawn location
        scroll.x = background.width - 50;
        scroll.y = 435;

        // Initial speeds
        scroll.vx = -0.4;
        scroll.vy = 0;
    }

    // Start the animation
    scroll.animationSpeed = 0.3;
    scroll.play();

    // Store scroll into the collection
    scrolls.push(scroll);

    // Add to the scene
    app.stage.addChild(scroll);

    flipper++;
    if (flipper == 2)
        flipper = 0;
}

function spawnTree(x, y) {
    sheet = PIXI.loader.resources["assets/images/tree.json"].spritesheet;
    tree = new PIXI.extras.AnimatedSprite(sheet.animations.tree);
    
    tree.scale.x = 0.8;
    tree.scale.y = 0.8;

    tree.x = x;
    tree.y = y;

    tree.animationSpeed = 0.1;
    
    setTimeout(function(tree){
        tree.play();
    }, randomInt(1, 200), tree);

    app.stage.addChild(tree);
}

/*********************/
/* Create Health Bar */
/*********************/
function createHealthBar() {
    //Create the health bar
    healthBar = new PIXI.Container();
    healthBar.position.set(background.width - 170, 4);
    app.stage.addChild(healthBar);

    //Create the black background rectangle
    let innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, characterHealth, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    //Create the front red rectangle
    let outerBar = new PIXI.Graphics();
    outerBar.beginFill(0xFF3300);
    outerBar.drawRect(0, 0, characterHealth, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);

    healthBar.outer = outerBar;
}

/*********************/
/* Spawn Bumpers     */
/*********************/
function spawnBumpers() {
    // Left Side
    createBumper("up", 160, 445);
    createBumper("right", 115, 325);
    createBumper("down", 295, 380);
    createBumper("right", 245, 500);

    // Right Side
    createBumper("down", 735, 445);
    createBumper("left", 780, 570);
    createBumper("up", 605, 510);
    createBumper("left", 650, 390);
}

function createBumper(direction, x, y) {
    bumper = new PIXI.Sprite(PIXI.loader.resources["assets/images/bumper.png"].texture);
    bumper.x = x;
    bumper.y = y;
    app.stage.addChild(bumper);
    bumperObject = new Bumper(bumper, direction);
    bumpers.push(bumperObject);
}