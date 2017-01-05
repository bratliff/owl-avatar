function addHandlers(widget) {
    var active = false,
        flapping = false,
        speaking = false,
        walking = false,
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
            case 'speaking':
                speaking = !speaking;
                speaking ? widget.state.setAnimation(0, "talking", true) : widget.state.setAnimation(0, "resting", true);
                speaking ? $(this).html("Stop Speaking") : $(this).html("Speak");
            break;
            case 'squawk':
                widget.state.setAnimation(0, "squawk", false);
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
