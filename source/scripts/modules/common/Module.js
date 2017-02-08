define([
    "jquery",
    "lodash.bind",
    "lodash.create",
    "./OnScroll"
], function(
    $,
    _bind,
    _create,
    OnScroll
) {

    // Global constants

    var ELEMENT_SELECTOR = "data-ui";


    // Define the Module

    var Module = function() {
    };

    Module.prototype = {
        start: function() {
            this._$Window = $(window);
            this.$elements = getElements(this.elements);
            this._activeEvents = setupEvents(this.events, this.$elements, this);

            this.init();
        },

        stop: function() {
            this._activeEvents = destroyEvents(this._activeEvents, this);
            this.$elements = [];
        }
    };

    Module.extend = function(protoProps) {
        var parent = this,
            child = function(){ return parent.apply(this, arguments); };

        child.prototype = _create(this.prototype, protoProps);
        child.prototype.constructor = child;

        return child;
    };


    // Functions

    function getElements(names) {
        var $elements = {};
        names.forEach(function(name){
            var $element = $("["+ELEMENT_SELECTOR+"='"+name+"']");
            if ($element.length) {
                $elements[name] = $element;
            } else {
                console.error("No element named '"+name+"'. Did you add `"+ELEMENT_SELECTOR+"='"+name+"'` to the element?");
            }
        });
        return $elements;
    }

    function setupEvents(events, $elements, obj) {
        var activeEvents = [];
        for (var eventTrigger in events) {

            var event = {};

            // Get the function
            event["function"] = events[eventTrigger];

            // Get the trigger and element (if added)
            var splitEventTrigger = eventTrigger.split(" ");
            if (splitEventTrigger.length) {
                event["trigger"] = splitEventTrigger[0];
                event["$element"] = $elements[splitEventTrigger[1]];
            }

            if (event.$element) {
                event.$element.on(event.trigger, $.proxy(event.function, obj));

            } else if (event.trigger == "scroll") {
                obj._onScroll = new OnScroll();
                obj._onScroll.start(_bind(event.function, obj));

            } else if (event.trigger == "resize") {
                var $Window = $(window);
                $Window.on("resize", $.proxy(event.function, obj));
            }

            activeEvents.push(event);
        }

        return activeEvents;
    }

    function destroyEvents(events, obj) {
        if (events && events.length) {
            events.forEach(function(event){
                if (event.$element) {
                    event.$element.off(event.trigger, $.proxy(event.function, obj));
                } else if (event.trigger == "scroll") {
                    obj._onScroll.stop();
                } else if (event.trigger == "resize") {
                    obj._$Window.off("resize", $.proxy(event.function, obj));
                }
            });
        }

        return [];
    }

    return Module;
});
