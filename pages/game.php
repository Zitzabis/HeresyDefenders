<style>
    * { padding: 0; margin: 0;}
    html,body {
        height: 100%;
    }
    body {
        background: #212529;
    }
    .card {
        margin-top: 2rem;
    }
    .hideOverflow {
        overflow:hidden;
    }
    .mute {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
</style>

<div class="mute btn btn-dark" style="padding: 0.2rem" id="muteButton"><span id="mute" class="mdi mdi-volume-high mdi-36px mdi-light"></span></div>
<script>
    $(document).ready(function() {
        $( "#muteButton" ).click(function() {
            music.toggleMute();
        });
    });
</script>

<div class="container-fluid h-100" style="margin: 0; padding: 0;">
    <div class="row h-100" style="margin: 0; padding: 0;">
        <div id="game" class="col h-100 hideOverflow" style="margin: 0; padding: 0;">
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
                                        Armour: +<span id="armour"></span>
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
                        Buying armour from the shop will cause you to take less damage from enemies. Each point of armour is one point less from attacks.
                        <br>
                        <br>
                        You can mute/unmute the music using the button found in the top-left of the screen.
                    </p>
                </div>
            </div>
            <div class="card">
                <h5 class="card-header">Credits</h5>
                <div class="card-body">
                    <p class="card-text">
                        <div class="row">
                            <div class="col-4">
                                <b>Programming/Game Design/Art</b>
                                <br>
                                Stephen Floyd
                                <br><br>
                                <b>Hero Art</b>
                                <br>
                                Rox
                            </div>
                            <div class="col">
                                <b>Music</b>
                                <br>
                                <i>Title Theme</i> - Composed by Aaron Brickle
                                <br>
                                <i>"When the Saints Go Marching In"</i> - Composed by William Floyd
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-right">
                                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#thankYouModal">
                                Special Thanks
                                </button>
                            </div>
                        </div>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="thankYouModal" tabindex="-1" role="dialog" aria-labelledby="thankYouModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="thankYouModalLabel">Special Thanks</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                I'd like to personally thank the religion professor that the character is based on.
                <br>
                They were an iconic and foundational faculty member for many years and has inspired many students during that time. I could think of no one better than him to be defending the world against heresy.
                <br>
                He is truly a man of God and a great example of how we should live our lives.
                <br>
                <br>
                This game is a final gift to my university as I graduate. My computer science professor taught me a lot and a project like this was typical for major class projects.
                <br>
                It brings me great pleasure to finally be able to create something like this for fun and as a challenge for myself.
                <br>
                <br>
                I hope the students of my university can enjoy this game as a tribute to the school and the two professors. Thank you for playing!
                <br>
                <br>
                <div class="text-right"><i>~ Stephen Floyd</i></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>