$(function() {
    $('.eat-burger').on('click', function(event) {
        var id = $(this).data('id');
        var newBurger = $(this).data("newInput");

        var newBurgerState = {
            devoured: newBurger
        };

        $.ajax('/api/burgers' + id, {
            type: "PUT",
            data: newBurgerState
        }).then(function() {
            console.log("devoured", newBurger);

            //Reload page to get the updated list
            location.reload();

        });
    });
    $('.create-burger').on('submit', function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#burger").val().trim(),
            sleepy: $("[name=devoured]:checked").val().trim();
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function(){
                console.log("created new burger");
                location.reload();
            }
        );
    

});