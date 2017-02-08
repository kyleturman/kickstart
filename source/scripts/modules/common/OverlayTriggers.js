define([
    "jquery",
    "lodash.bind",
    "./Overlay"
], function(
    $,
    _bind,
    Overlay
) {

    var OVERLAY_TRIGGER_DATA_ATTR = "data-overlay-trigger";

    var OverlayTriggers = function() {
    };

    OverlayTriggers.prototype = {
        setupEvents: function() {
            this.overlay = new Overlay();

            this.$overlayTriggers = $("["+OVERLAY_TRIGGER_DATA_ATTR+"]");

            this.$overlayTriggers.on("click.overlayTrigger", _bind(function(e){
                e.preventDefault();

                var overlayID = $(e.currentTarget).attr(OVERLAY_TRIGGER_DATA_ATTR);
                this.overlay.open(overlayID);

            }, this));
        },

        destroyEvents: function() {
            this.$overlayTriggers.off("click.overlayTrigger");
        },

        resetEvents: function() {
            this.destroyEvents();
            this.setupEvents();
        }
    }

    return OverlayTriggers;
});
