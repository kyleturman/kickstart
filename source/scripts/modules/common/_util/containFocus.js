define([
    "jquery"
], function(
    $
){
    var FOCUSABLE_ELEMENTS = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex]:not([disabled]), *[contenteditable]";

    var containFocus = function($container, event) {
        if (event.keyCode === 9) { // Tab
            var $currentFocus = $(document.activeElement);
            // Find only the visible elements to cycle focus through
            var $focusable = $container.find(FOCUSABLE_ELEMENTS).filter(":not(:hidden)");
            var currentIndex = $focusable.index($currentFocus);

            // If the shift key is pressed, tabbing is reversed.
            // Accommodate going from the first to last item, in reverse.
            if (event.shiftKey && currentIndex === 0) {
                $focusable.get($focusable.length - 1).focus();
                event.preventDefault();
            }
            // Otherwise, tabbing forward, go from last item to first item
            if (!event.shiftKey && currentIndex === ($focusable.length - 1)) {
                $focusable.first().focus();
                event.preventDefault();
            }
        }
    }

    return containFocus;
});
