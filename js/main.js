var hoot = new Howl({
    src: ['audio/silly/matt_owl2.mp3'],
    sprite: {
        one: [300, 1300]
    }
});

var silly = new Howl({
    src: ['audio/silly/silly_read1.m4a']
});


var straight = new Howl({
    src: ['audio/straight/direction_instruction_v1.mp3']
})


function addHandlers(widget) {
    var active = false,
        flapping = false,
        speaking = false,
        walking = false,
        regular = false,
        owl = document.querySelector('#spine-widget');

    $('.btn').click(function(){

        switch($(this).data('action')) {
            case 'right-blink':
                widget.state.setAnimation(0, "right-blink", false);
            break;
            case 'scratch':
                widget.state.setAnimation(0, "scratch", false);
            break;
            case 'wingsout':
                widget.state.setAnimation(0, "wingsout", false);
            break;
            case 'wingsin':
                widget.state.setAnimation(0, "wingsin", false);
            break;
            case 'flapping':
                flapping = !flapping;
                flapping ? widget.state.setAnimation(0, "flapping", true) : widget.state.setAnimation(0, "resting", true);
                flapping ? $(this).html("Stop Flapping") : $(this).html("Flapping");
                flapping ? owl.classList.add('fly') : owl.classList.remove('fly');

            break;
            case 'silly':
                var _this = this;
                speaking = !speaking;
                speaking ? widget.state.setAnimation(0, "talking", true) : widget.state.setAnimation(0, "resting", true);
                speaking ? $(this).html("Stop Speaking") : $(this).html("Speaking (Silly)");
                speaking ? silly.play() : silly.stop();
                silly.on('end', function(){
                   widget.state.setAnimation(0, "resting", true);
                   speaking = !speaking;
                   $(_this).html("Speaking (Silly)");
                });
            break;
            case 'regular':
                var _this = this;
                regular = !regular;
                regular ? widget.state.setAnimation(0, "talking", true) : widget.state.setAnimation(0, "resting", true);
                regular ? $(this).html("Stop Speaking") : $(this).html("Speaking (Regular)");
                regular ? straight.play() : straight.stop();
                straight.on('end', function(){
                   widget.state.setAnimation(0, "resting", true);
                   regular = !regular;
                   $(_this).html("Speaking (Regular)");
                });
            break;
            case 'squawk':
                widget.state.setAnimation(0, "squawk", false);
                hoot.play('one');
            break;
            case 'walkright':
                walking = !walking;
                walking ? widget.state.setAnimation(0, "walkright", true) : widget.state.setAnimation(0, "resting", true);
                walking ? $(this).html("Stop Walking") : $(this).html("Side Walk");
            break;
            case 'askance':
                widget.state.setAnimation(0, "askance", false);
            break;
            case 'sitting':
                widget.state.setAnimation(0, "sitting", false);
            break;
        }
    });
}

$(document).ready(function(){

    new spine.SpineWidget("spine-widget", {
        json: "owly.json",
        atlas: "owly.atlas",
        animation: "right-blink",
        alpha:true,
        backgroundColor: "#00000000",
        success: function (widget) {
            widget.state.setAnimation(0, "right-blink", false);
            addHandlers(widget);
        }
    });

});
