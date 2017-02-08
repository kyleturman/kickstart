define([
    "jquery",
    "lodash.bind",
    "has-touch",
    "./_util/containFocus"
], function(
    $,
    _bind,
    hasTouch,
    containFocus
) {

    // Constants
    var OVERLAY_OPEN_CLASS = "js-is-open";
    var OVERLAY_TRANSITION_DURATION = 350; // milliseconds
    var OVERLAY_DATA_ATTR = "data-overlay";
    var OVERLAY_CLOSE_DATA_ATTR = "data-overlay-close";

    var Overlay = function(options) {
        this._opts = $.extend({},{
            overlayMaskSelector: "[data-ui='overlay-mask']"
        }, options);

        this.$overlay_mask = $(this._opts.overlayMaskSelector);
        this.$overlay_mask_closer = this.$overlay_mask.find("[data-ui='overlay-mask-close']");

        this._$body =   $("body,html");
        this._$header = $("[data-ui='header']");
        this._$main =   $("[data-ui='main']");
        this._$footer = $("[data-ui='footer']");
    };

    Overlay.prototype = {

        // ------------ Public methods ------------

        open: function(overlayID) {
            this.$overlay = $("["+OVERLAY_DATA_ATTR+"='"+overlayID+"']");

            this.$overlay_mask.scrollTop(0);
            this._disableBackgroundContent();

            this.$overlay_mask.attr("aria-hidden", "false").fadeIn(200);

            this.$overlay.attr("tabindex", "0");
            this.$overlay.removeClass("u-display-none");

            this._setupEvents();

            setTimeout(_bind(function(){
                this.$overlay.addClass(OVERLAY_OPEN_CLASS);
            }, this),10);

            setTimeout(_bind(function(){
                this._enableContainFocus();
                if (hasTouch === false) {
                    this._setOverlayFocus();
                }
            }, this), OVERLAY_TRANSITION_DURATION);
        },

        close: function() {
            this.$overlay.removeClass(OVERLAY_OPEN_CLASS);
            this._destroyEvents();
            this._disableContainFocus();
            this.$overlay.attr("tabindex", "-1");

            if (this._lastFocusedElement) {
                this._lastFocusedElement.focus();
                this._lastFocusedElement = false;
            }

            setTimeout(_bind(function(){
                this.$overlay_mask.attr("aria-hidden", "true");
                this.$overlay_mask.fadeOut(300, _bind(function(){
                    this._enableBackgroundContent();
                    this.$overlay.addClass("u-display-none");
                    this.$overlay = false;
                }, this));
            }, this), OVERLAY_TRANSITION_DURATION);
        },


        // ------------ Private methods ------------


        // Events

        _setupEvents: function() {
            var $closers = this.$overlay.find("["+OVERLAY_CLOSE_DATA_ATTR+"]");
            this._$overlayClosers = $closers.add(this.$overlay_mask_closer);

            this._$overlayClosers.on("click.overlayClose", _bind(function(e){
                e.preventDefault();
                this.close();
            },this));

            $(document).on("keyup.overlayEscClose", _bind(function(e) {
                if (e.keyCode === 27) {
                    this.close();
                }
            },this));
        },

        _destroyEvents: function() {
            $(document).off("keyup.overlayEscClose");
            this._$overlayClosers.off("click.overlayClose");
        },


        // Background Content

        _disableBackgroundContent: function() {
            this._$body.addClass("u-overflow--hidden");
            this._$header.attr("aria-hidden", "true");
            this._$main.attr("aria-hidden", "true");
            this._$footer.attr("aria-hidden", "true");
        },

        _enableBackgroundContent: function() {
            this._$body.removeClass("u-overflow--hidden");
            this._$header.attr("aria-hidden", "false");
            this._$main.attr("aria-hidden", "false");
            this._$footer.attr("aria-hidden", "false");
        },


        // Focus

        _setOverlayFocus: function() {
            this._lastFocusedElement = document.activeElement;

            if (this.$overlay.find("input").length) {
                this.$overlay.find("input").first().focus();
            } else {
                this.$overlay.find("["+OVERLAY_CLOSE_DATA_ATTR+"]").focus();
            }
        },

        _enableContainFocus: function() {
            $(document).on("keydown.overlayContainFocus", _bind(function(event) {
                containFocus(this.$overlay, event);
            }, this));
        },

        _disableContainFocus: function() {
            $(document).off("keydown.overlayContainFocus");
        }
    };

    return Overlay;
});
