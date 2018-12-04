let keyPressed = [false, false, false, false]; // L, U, R, D
let hitBoxScale = 0;

function Keys() { }

Keys.prototype.setup = function() {
    //Left arrow key `press` method
    left.press = () => {
        keyPressed[0] = true;

        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit.getSprite());
            });
            hits = [];
        }

        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/swordLeft.png"].texture);
        hit.x = scale(438);
        hit.y = scale(488);
        hit.scale.x = scale(1);
        hit.scale.y = scale(1);
        hit.anchor.set(0, 0.9);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "left");
        hits.push(hitObject);

        // Spawn hit hitbox
        hitBox = new PIXI.Sprite(PIXI.loader.resources["assets/images/hit.png"].texture);
        hitBox.x = scale(418);
        hitBox.y = scale(450);
        hitBox.scale.x = scale(1);
        hitBox.scale.y = scale(1);
        app.stage.addChild(hitBox);
        hitBoxes.push(hitBox);
    };
    left.release = () => {
        keyPressed[0] = false;
        hitBoxScale = 0;

        // Remove the hit animation
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
        // Remove the hitbox
        hitBoxes.forEach(function(hit) {
            app.stage.removeChild(hit);
        });
        hitBoxes = [];
    };

    //Right
    right.press = () => {
        keyPressed[2] = true;

        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit.getSprite());
            });
            hits = [];
        }

        // Spawn hit animation
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/swordRight.png"].texture);
        hit.x = scale(508);
        hit.y = scale(490);
        hit.scale.x = scale(1);
        hit.scale.y = scale(1);
        
        hit.anchor.set(1, 0.9);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "right");
        hits.push(hitObject);

        // Spawn hit hitbox
        hitBox = new PIXI.Sprite(PIXI.loader.resources["assets/images/hit.png"].texture);
        hitBox.x = scale(508);
        hitBox.y = scale(448);
        hitBox.scale.x = scale(1);
        hitBox.scale.y = scale(1);
        app.stage.addChild(hitBox);
        hitBoxes.push(hitBox);
    };
    right.release = () => {
        keyPressed[2] = false;
        hitBoxScale = 0;

        // Remove the hit animation
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
        // Remove the hitbox
        hitBoxes.forEach(function(hit) {
            app.stage.removeChild(hit);
        });
        hitBoxes = [];
    };

    
    //Up
    up.press = () => {
        keyPressed[1] = true;

        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit.getSprite());
            });
            hits = [];
        }

        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/swordUp.png"].texture);
        hit.x = scale(470);
        hit.y = scale(380);
        hit.scale.x = scale(1);
        hit.scale.y = scale(1);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "up");
        hits.push(hitObject);
        hitBoxes.push(hit);
    };
    up.release = () => {
        keyPressed[1] = false;

        // Remove the hit animation
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
        // Remove the hitbox
        hitBoxes.forEach(function(hit) {
            app.stage.removeChild(hit);
        });
        hitBoxes = [];
    };

    //Down
    down.press = () => {
        keyPressed[3] = true;

        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit.getSprite());
            });
            hits = [];
        }

        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/swordDown.png"].texture);
        hit.x = scale(470);
        hit.y = scale(520);
        hit.scale.x = scale(1);
        hit.scale.y = scale(1);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "down");
        hits.push(hitObject);
        hitBoxes.push(hit);
    };
    down.release = () => {
        keyPressed[3] = false;

        // Remove the hit animation
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
        // Remove the hitbox
        hitBoxes.forEach(function(hit) {
            app.stage.removeChild(hit);
        });
        hitBoxes = [];
    };
};