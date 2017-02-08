require([
    "jquery",
    "./modules/example-module"
], function(
    $,
    ExampleModule
){

    $(document).ready(function(){

        var exampleModule = new ExampleModule();
        exampleModule.start();

    });

});

