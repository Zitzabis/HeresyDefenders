// Flags
let dead = false;
let spawnEnemy = false;

// Globals
let background;
let healthBar;
let baseSize = 948;
let scalePercent;
let gui = new GUI();        // GUI control object
let keys = new Keys();      // Key press event object
let GO = new GameObject();  // Game object spawning object
let music = new Music();

// Character info
let health = 100;
let killPoints = 0;
let character;
let characterHealth = health;
let healthPlus = 0;
let armour = 0;

// Scrolls info
let scrollAttack = 10;
let scrollSpeed = 0.6;
let scrolls = [];       // Array to hold all active scrolls
let scrollTimer = 0;    // Timer to track when to spawn
let scrollSpawn = 100;  // 300 = 5 seconds
let waves = [0, 20, 30];
let waveIndex = 0;
let activeWaveCount = 0;
$(document).ready(function() {
    $( "#spawnWave" ).click(function() {
        spawnEnemy = true;
        waveIndex++;

        // Switch music playing to in-game
        music.stopSong();
        music.playMusic();
    });
});

// Bumper info
let bumpers = [];

// Shop info
let armourCost = 20;
let healthCost = 30;
$(document).ready(function() {
    $( "#buyArmour" ).click(function() {
        if (killPoints >= armourCost) {
            killPoints -= armourCost;
            gui.updateKillPoints();

            armour += 3;
            gui.updateArmour();

            gui.checkShop();
        }
    });
    $( "#buyHealth" ).click(function() {
        if (killPoints >= healthCost) {
            killPoints -= healthCost;
            gui.updateKillPoints();

            health += 30;

            characterHealth = health;
            gui.resetHealth();
            gui.checkShop();
        }
    });
});

//////////////////

let hits = [];
let hitBoxes = [];

function Hit(sprite, direction) {
    this.sprite = sprite;
    this.direction = direction;
}

Hit.prototype.getSprite = function(){
    return this.sprite;
}
Hit.prototype.getDirection = function(){
    return this.direction;
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

// Setup GUI
$(document).ready(function() {
    gui.setup();
});

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
    resolution: window.devicePixelRatio       // default: 1
});

// Set the renderer appearance
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.getElementById('game').appendChild(app.view);

// Load assets
loadAssets();

// Play starting song
$(document).ready(function() {
    music.playSong(0);
});

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
    
    // Calculate scaling values
    if (background.height < baseSize) {
        scalePercent = background.height / baseSize; // Determine percentage for scaling
    }
    else {
        // If equal or above base size, lock to base size and set scaling to 1:1
        background.height = baseSize;
        background.width = baseSize;
        scalePercent = 1;
    }

    // Add background
    app.stage.addChild(background);

    // Spawn bumpers
    GO.spawnBumpers();

    // Spawn surrounding terrain
    GO.spawnTerrain();

    // Add character sprite
    GO.spawnCharacter();

    // Adds health bar
    createHealthBar();

    // Create key press events
    keys.setup();
}

function gameLoop(delta) {
    //Update the current game state:
    state(delta);
}

function play(delta) {
    // Update 
    scrollTimer += delta;

    // Spawn scrolls if player isn't dead
    if (!dead) {
        if (activeWaveCount != waves[waveIndex] && spawnEnemy) {
            // Spawn scroll based on spawn times
            if (scrollTimer >= scrollSpawn) {
                GO.spawnScroll();
                activeWaveCount++;
            }
        }
        else {
            spawnEnemy = false;
            activeWaveCount = 0;

            if (scrolls.length == 0) {
                characterHealth = health;
                gui.updateHealth();
            }
        }
    }

    // Hits hitbox handling
    if (hitBoxes.length != 0) {
        hit = hitBoxes[0];
        // Left
        if (keyPressed[0]) {
            if (hitBoxScale < 2.5) {
                // x shifting because of anchor points
                hit.x -= 2.5;
                hitBoxScale += 0.2;
            }
            else {
                // Remove the hitbox
                hitBoxes.forEach(function(hit) {
                    app.stage.removeChild(hit);
                });
                hitBoxes = [];
            }
        }
        // Right
        if (keyPressed[2]) {
            if (hitBoxScale < 1.5) {
                // Scale x shifting since right in stable
                hit.scale.x += 0.1;
                hitBoxScale += 0.1;
            }
            else {
                // Remove the hitbox
                hitBoxes.forEach(function(hit) {
                    app.stage.removeChild(hit);
                });
                hitBoxes = [];
            }
        }
    }

    // Hits animation handling
    if (hits.length != 0) {
        hit = hits[0];
        hitSprite = hit.getSprite();
        if (hit.getDirection() == "left") {
            if (hitSprite.rotation > -1.5) {
                hitSprite.rotation -= 0.1;
            }
            else {
                // Remove the animation
                hits.forEach(function(hit) {
                    app.stage.removeChild(hit.getSprite());
                });
                hits = [];
            }
        }
        if (hit.getDirection() == "right") {
            if (hitSprite.rotation < 1.5) {
                hitSprite.rotation += 0.1;
            }
            else {
                // Remove the animation
                hits.forEach(function(hit) {
                    app.stage.removeChild(hit.getSprite());
                });
                hits = [];
            }
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
                        scroll.vy = scale(-(scrollSpeed));
                    }
                    if (bumper.getDirection() == "down") {
                        scroll.vx = 0;
                        scroll.vy = scale(scrollSpeed);
                    }
                    if (bumper.getDirection() == "left") {
                        scroll.vx = scale(-(scrollSpeed));
                        scroll.vy = 0;
                    }
                    if (bumper.getDirection() == "right") {
                        scroll.vx = scale(scrollSpeed);
                        scroll.vy = 0;
                    }
                }
            });

            // Scroll death by player
            if (hitBoxes.length != 0) {
                hitBoxes.forEach(function(hit) {
                    if (hitTestRectangle(hit, scroll)) {
                        index = scrolls.indexOf(scroll);    // Locate scroll in question
                        app.stage.removeChild(scroll);      
                        if (index > -1) {
                            scrolls.splice(index, 1); 
                        }
    
                        // Remove animation and hitboxes
                        hits.forEach(function(hit) {
                            app.stage.removeChild(hit.getSprite());
                        });
                        hits = [];
                        hitBoxes.forEach(function(hit) {
                            app.stage.removeChild(hit);
                        });
                        hitBoxes = [];
                        
                        // Increment kill points and publish
                        killPoints++;
                        gui.updateKillPoints();
                    }
                });
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
                characterHealth -= scrollAttack - armour;
                gui.updateHealth();
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

function loadAssets() {
    PIXI.loader
    .add("assets/images/map.png")
    .add("assets/images/tree.png")
    .add("assets/images/tree.json")
    .add("assets/images/scroll.png")
    .add("assets/images/scroll.json")
    .add("assets/images/rock.png")
    .add("assets/images/rock.json")
    .add("assets/images/swordLeft.png")
    .add("assets/images/swordRight.png")
    .add("assets/images/swordUp.png")
    .add("assets/images/swordDown.png")
    .add("assets/images/hit.png")
    .add("assets/images/character.png")
    .add("assets/images/bumper.png")
    .load(setup);
}