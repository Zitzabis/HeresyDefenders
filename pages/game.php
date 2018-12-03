<style>
    * { padding: 0; margin: 0; overflow:hidden; }
    html,body {
        height: 100%;
    }
    body {
        background: #212529;
    }
    .card {
        margin-top: 2rem;
    }
</style>

<div class="container-fluid h-100" style="margin: 0; padding: 0;">
    <div class="row h-100" style="margin: 0; padding: 0;">
        <div id="game" class="col h-100" style="margin: 0; padding: 0;">
                <script src="js/game.js"></script>
        </div>
        <div class="col h-100">
            <div class="row">
                <div class="col">
                    <div class="card">
                        <h5 class="card-header">Stats</h5>
                        <div class="card-body">
                            <div class="row">
                                <div class="col border-right">
                                    <p class="card-text">
                                        Health: <span id="health"></span>
                                        <br>
                                        Kill Points: <span id="killPoints"></span>
                                        <br>
                                        <button class="btn btn-primary" id="spawnWave">Spawn Wave</button>
                                    </p>
                                </div>
                                <div class="col text-center border-left">
                                    <img src="assets/images/characterOriginal.png" class="img-fluid">
                                    <br>
                                    Bob Brown
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <h5 class="card-header">Shop</h5>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <p class="card-text">
                                        <div class="row">
                                            <div class="col text-center border-right">
                                                <span id="armourCost"></span> Kill Points
                                                <br>
                                                <button class="btn btn-dark" id="buyArmour">Buy Armour</button>
                                            </div>
                                            <div class="col text-center border-left">
                                                <span id="healthCost"></span> Kill Points
                                                <br>
                                                <button class="btn btn-dark" id="buyHealth">Buy Health</button>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <h5 class="card-header">Instructions</h5>
                <div class="card-body">
                    <p class="card-text">
                    Use your arrow keys to attack enemies.
                    <br>
                    <br>
                    Buying health from the shop will increase your total health bar.
                    <br>
                    Buying armour from the shop will cause you to take less damage from enemies.
                    </p>
                </div>
            </div>
            <div class="card">
                <h5 class="card-header">Credits</h5>
                <div class="card-body">
                    <p class="card-text">
                        <b>Programming/Game Design/Art</b>
                        <br>
                        Stephen Floyd
                        <br><br>
                        <b>Hero Art</b>
                        <br>
                            Rox
                        <br><br>
                        <b>Music</b>
                        <br>
                        Aaron Brickle
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>