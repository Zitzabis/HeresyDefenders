let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

//Create a Pixi Application
let app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
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

PIXI.loader
.add("assets/images/background.png")
.add("assets/images/tree.png")
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

    //background = new PIXI.Sprite(PIXI.loader.resources["assets/images/background.png"].texture);
    tree = new PIXI.Sprite(PIXI.loader.resources["assets/images/tree.png"].texture);
    tree.x = 300;//Math.floor(Math.random() * 500);
    tree.y = 300;//Math.floor(Math.random() * 500);

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

    app.stage.addChild(tree, man, message);
}

function gameLoop(delta){
    //Update the current game state:
    state(delta);
}

function play(delta) {
    //Use the cat's velocity to make it move
    man.x += man.vx;
    man.y += man.vy

    if (hitTestRectangle(man, tree)) {
        message.text = "Hit!"
    } else {
        message.text = "Miss!"
    }
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