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

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.utils.TextureCache["assets/images/man.png"];

let background;
let tree;
let man;
let message;
let scrolls = [];

let scrollTimer = 0;
let scrollSpawn = 300; // 300 = 5 seconds

PIXI.loader
.add("assets/images/background.png")
.add("assets/images/tree.png")
.add("assets/images/tree.json")
.add("assets/images/scroll.png")
.add("assets/images/scroll.json")
.add("assets/images/man.png")
.load(setup);

function setup() {
    //Set the game state
    state = play;
    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    app.ticker.add(delta => gameLoop(delta));

    //Capture the keyboard arrow keys
    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    background = new PIXI.Sprite(PIXI.loader.resources["assets/images/background.png"].texture);
    app.stage.addChild(background);

    //Make the trees
    let numberOfTrees = 9,
    spacing = 70,
    xPositions = [0, 850, 0, 850];
    xIndex = 0;
    yPositions = [0, 100, 200, 0, 100, 200, 500, 600, 700, 500, 600, 700];
    sheet = PIXI.loader.resources["assets/images/tree.json"].spritesheet;
    for (r = 0; r < yPositions.length; r++) {
        for (let i = 0; i < numberOfTrees; i++) {
            tree = new PIXI.extras.AnimatedSprite(sheet.animations["tree"]);
    
            tree.scale.x = 1.2;
            tree.scale.y = 1.2;
    
            let x = xPositions[xIndex] + (spacing * i);
            let y = yPositions[r] + randomInt(0,60);
    
            tree.x = x;
            tree.y = y;
    
            tree.animationSpeed = 0.1;
            
            setTimeout(function(tree){
                tree.play();
            }, randomInt(1, 200), tree);
    
            app.stage.addChild(tree);
        }
        if (r % 3 == 0)
            xIndex++;
    }


    man = new PIXI.Sprite(PIXI.loader.resources["assets/images/man.png"].texture);
    man.vx = 0;
    man.vy = 0;

    message = new PIXI.Text("Hello Pixi!");
    message.x = 10;
    message.y = 10;
    message.style = {fill: "white"};

    //Left arrow key `press` method
    left.press = () => {
        //Change the man's velocity when the key is pressed
        man.vx = -5;
        man.vy = 0;
    };
    left.release = () => {
        //If the left arrow has been released, and the right arrow isn't down,
        //and the man isn't moving vertically:
        //Stop the man
        if (!right.isDown && man.vy === 0) {
            man.vx = 0;
        }
    };

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

    //Right
    right.press = () => {
        man.vx = 5;
        man.vy = 0;
    };
    right.release = () => {
        if (!left.isDown && man.vy === 0) {
            man.vx = 0;
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

    //app.stage.addChild(man);
}

function gameLoop(delta){
    //Update the current game state:
    state(delta);
}

function play(delta) {
    // Update 
    scrollTimer += delta;

    //Use the cat's velocity to make it move
    man.x += man.vx;
    man.y += man.vy;

    if (scrollTimer >= scrollSpawn) {
        spawnScroll();
    }

    scrolls.forEach(function(scroll) {
        //console.log(scroll.x)
        //Move the scroll
        scroll.x += scroll.vx;
        scroll.y += scroll.vy;

        if (scroll.x >= 150)
            scroll.vy = 0.05;
        if (scroll.x >= 350)
            scroll.vy = -0.05;
        if (scroll.x >= 500)
            scroll.vy = 0;
        
        //Check the scroll's screen boundaries
        let scrollHitsWall = contain(scroll, {x: 28, y: 10, width: background.width, height: background.height});
        
        //If the scroll hits the top or bottom of the stage, reverse
        //its direction
        if (scrollHitsWall === "right" || scrollHitsWall === "left") {
            scroll.vx *= -1;
        }
    });

    if (hitTestRectangle(man, tree)) {
        message.text = "Hit!"
    } else {
        message.text = "Miss!"
    }
}

/*******************/
/* Spawns Scroll   */
/*******************/
function spawnScroll() {
    // Reset the scroll timer
    scrollTimer = 0;

    // Load resources and create sprite
    sheet = PIXI.loader.resources["assets/images/scroll.json"].spritesheet;
    sheet = PIXI.loader.resources["assets/images/scroll.json"].spritesheet;
    scroll = new PIXI.extras.AnimatedSprite(sheet.animations["scroll"]);

    // Scale scroll to correct size
    scroll.scale.x = 0.3;
    scroll.scale.y = 0.3;

    // Spawn location
    scroll.x = 0;
    scroll.y = 410;

    // Initial speeds
    scroll.vx = 0.3;
    scroll.vy = -0.1;

    // Start the animation
    scroll.animationSpeed = 0.3;
    scroll.play();

    // Store scroll into the collection
    scrolls.push(scroll);

    // Add to the scene
    app.stage.addChild(scroll);
}


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

//The `randomInt` helper function
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function contain(sprite, container) {

    let collision = undefined;

    //Left
    if (sprite.x < container.x) {
        sprite.x = container.x;
        collision = "left";
    }

    //Top
    if (sprite.y < container.y) {
        sprite.y = container.y;
        collision = "top";
    }

    //Right
    if (sprite.x + sprite.width > container.width) {
        sprite.x = container.width - sprite.width;
        collision = "right";
    }

    //Bottom
    if (sprite.y + sprite.height > container.height) {
        sprite.y = container.height - sprite.height;
        collision = "bottom";
    }

    //Return the `collision` value
    return collision;
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
        }
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
        }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
        "keydown", downListener, false
    );
    window.addEventListener(
        "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };
    
    return key;
}

function hitTestRectangle(r1, r2) {
    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    //hit will determine whether there's a collision
    hit = false;

    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;

    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;

    //Calculate the distance vector between the sprites
    vx = r1.centerX - r2.centerX;
    vy = r1.centerY - r2.centerY;

    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = r1.halfWidth + r2.halfWidth;
    combinedHalfHeights = r1.halfHeight + r2.halfHeight;

    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

        //There's definitely a collision happening
        hit = true;
    } else {

        //There's no collision on the y axis
        hit = false;
    }
    } else {

    //There's no collision on the x axis
    hit = false;
    }

    //`hit` will be either `true` or `false`
    return hit;
}