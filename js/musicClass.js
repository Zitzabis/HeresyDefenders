let player;
let trackIndex = 1;
let tracks = [];

function Music() {
    tracks.push("assets/music/forwardIntoBattle_AaronBrickle.flac");
    tracks.push("assets/music/theSaintsGoMarchingIn.flac");
}

Music.prototype.playMusic = function() {
    player = new Audio(tracks[trackIndex]);
    player.play();
    player.volume = 0.5;

    player.onended = function() {
        trackIndex++;
        if (trackIndex == tracks.length) {
            trackIndex = 1;
        }
        music.playMusic();
    };
};

Music.prototype.playSong = function(index) {
    player = new Audio(tracks[index]);
    player.play();

    player.onended = function() {
        music.playSong(index);
    };
};

Music.prototype.stopSong = function() {
    player.pause();
};

Music.prototype.toggleMute = function() {
    if (player.muted == false)
        player.muted = true;
    else
        player.muted = false;

    if ($( "#mute" ).hasClass("mdi-volume-high")) {
        $( "#mute" ).removeClass("mdi-volume-high");
        $( "#mute" ).addClass("mdi-volume-off");
    }
    else {
        $( "#mute" ).removeClass("mdi-volume-off");
        $( "#mute" ).addClass("mdi-volume-high");
    }
};