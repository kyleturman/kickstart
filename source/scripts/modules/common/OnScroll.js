/*
    OnScroll
    --
    Better scroll event handling that uses
    requestAnimationFrame to help guarantee
    a buttery smooth scroll.

    Anytime you have the hankerin' to use
    $(window).scroll(), please use this instead.

    Example usage:
    --
        var onScroll = new OnScroll();
        onScroll.start(function(scrollTopPosition){
            // do cool stuff here
        });

        // Call this when you're done
        onScroll.stop();
*/

define([
    "jquery",
    "./_util/generateGuid",
], function(
    $,
    generateGuid
) {

    var _requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || /* IE Fallback */ function(t) { window.setTimeout(t, 1e3 / 60) };

    var OnScroll = function() {
        this._$Window = $(window);
        this._guid = generateGuid();
    };

    OnScroll.prototype = {
        start: function(scrollHandler) {
            var guid = this._guid;
            var debouncedScrollHandler = -1;
            this._$Window.on("scroll."+this._guid, function(){
                if (debouncedScrollHandler !== -1) {
                    return;
                }
                debouncedScrollHandler = _requestAnimationFrame(function(){
                    scrollHandler(window.pageYOffset);
                    debouncedScrollHandler = -1;
                });
            });
        },

        stop: function() {
            this._$Window.off("scroll."+this._guid);
        }
    };

    return OnScroll;
});
