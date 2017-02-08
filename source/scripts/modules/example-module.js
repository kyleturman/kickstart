define([
    "jquery",
    "./common/Module"
], function(
    $,
    Module
) {

    var ExampleModule = Module.extend({
        init: function() {
            console.log("ExampleModule loaded!");
        },

        elements: [
            "exampleModuleButton",
            "exampleModuleText"
        ],

        events: {
            "click exampleModuleButton": function(event) {
                this.$elements.exampleModuleText.hide().text("Oh hello there").slideDown(150);
            },
            "resize": function() {
                console.log("Window resized");
            },
            "scroll": function(scrollTop) {
                console.log("Page scrolled to: " + scrollTop);
            }
        }
    });

    return ExampleModule;
});

