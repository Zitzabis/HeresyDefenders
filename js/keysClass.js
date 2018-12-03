function Keys() { }

Keys.prototype.setup = function() {
    //Left arrow key `press` method
    left.press = () => {
        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit.getSprite());
            });
            hits = [];
        }

        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/swordLeft.png"].texture);
        hit.x = scale(428);
        hit.y = scale(488);
        hit.scale.x = scale(0.1);
        hit.scale.y = scale(0.1);
        hit.pivot.set(hit.width, hit.y + hit.height);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "left");
        hits.push(hitObject);
    };
    left.release = () => {
        // Remove the hitbox
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
    };

    //Right
    right.press = () => {
        if (hits.length != 0) {
            hits.forEach(function(hit) {
                app.stage.removeChild(hit.getSprite());
            });
            hits = [];
        }

        // Spawn hitbox
        hit = new PIXI.Sprite(PIXI.loader.resources["assets/images/swordRight.png"].texture);
        hit.x = scale(508);
        hit.y = scale(468);
        hit.scale.x = scale(0.1);
        hit.scale.y = scale(0.1);
        hit.pivot.set(0, hit.y + hit.height);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "right");
        hits.push(hitObject);
    };
    right.release = () => {
        // Remove the hitbox
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
    };

    
    //Up
    up.press = () => {
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
        hit.scale.x = scale(0.1);
        hit.scale.y = scale(0.1);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "up");
        hits.push(hitObject);
    };
    up.release = () => {
        // Remove the hitbox
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
    };

    //Down
    down.press = () => {
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
        hit.scale.x = scale(0.1);
        hit.scale.y = scale(0.1);
        app.stage.addChild(hit);
        hitObject = new Hit(hit, "down");
        hits.push(hitObject);
    };
    down.release = () => {
        // Remove the hitbox
        hits.forEach(function(hit) {
            app.stage.removeChild(hit.getSprite());
        });
        hits = [];
    };
};