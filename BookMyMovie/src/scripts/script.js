var player,
    time_update_interval = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-placeholder', {
        width: 600,
        height: 400,
        videoId: 'Xa0Q0J5tOP0',
        playerVars: {
            color: 'white',
            playlist: 'taJ60kskkns,FG0fTKAqZ5g'
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize(){

    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000);


    document.getElementById('volume-input').val(Math.round(player.getVolume()));
}


// This function is called by initialize()
function updateTimerDisplay(){
    // Update current time text display.
    document.getElementById('current-time').text(formatTime( player.getCurrentTime() ));
    document.getElementById('duration').text(formatTime( player.getDuration() ));
}


// This function is called by initialize()
function updateProgressBar(){
    // Update the value of our progress bar accordingly.
    document.getElementById('progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}


// Progress bar

document.getElementById('progress-bar').on('mouseup touchend', function (e) {

    // Calculate the new time for the video.
    // new time in seconds = total duration in seconds * ( value of range input / 100 )
    var newTime = player.getDuration() * (e.target.value / 100);

    // Skip video to new time.
    player.seekTo(newTime);

});


// Playback

document.getElementById('play').on('click', function () {
    player.playVideo();
});


document.getElementById('pause').on('click', function () {
    player.pauseVideo();
});


// Sound volume


document.getElementById('mute-toggle').on('click', function() {
    var mute_toggle = $(this);

    if(player.isMuted()){
        player.unMute();
        mute_toggle.text('volume_up');
    }
    else{
        player.mute();
        mute_toggle.text('volume_off');
    }
});

document.getElementById('volume-input').on('change', function () {
    player.setVolume($(this).val());
});


// Other options


document.getElementById('speed').on('change', function () {
    player.setPlaybackRate($(this).val());
});

document.getElementById('quality').on('change', function () {
    player.setPlaybackQuality($(this).val());
});


// Playlist

document.getElementById('next').on('click', function () {
    player.nextVideo()
});

document.getElementById('prev').on('click', function () {
    player.previousVideo()
});


// Load video

document.getElementsByClassName('thumbnail').on('click', function () {

    var url = $(this).attr('data-video-id');

    player.cueVideoById(url);

});


// Helper Functions

function formatTime(time){
    time = Math.round(time);

    var minutes = Math.floor(time / 60),
        seconds = time - minutes * 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;
}


$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
});