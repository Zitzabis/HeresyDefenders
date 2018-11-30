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
            <div class="card">
                <h5 class="card-header">Stats</h5>
                <div class="card-body">
                    <p class="card-text">
                        <span id="health">Health: 100/100</span>
                        <br>
                        <span id="killPoints">Kill Points: 0</span>
                        <br>
                        <button id="spawnWave">Spawn Wave</button>
                    </p>
                </div>
            </div>
            <div class="card">
                <h5 class="card-header">Instructions</h5>
                <div class="card-body">
                    <p class="card-text">Use your arrow keys to attack.<br>Only left and right attacks are enabled right now.</p>
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