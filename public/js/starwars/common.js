$(function () {
    // "Enable Delete" toggle effect
    $(document).on('click', '.toggle-delete', function () {
        if ($(this).hasClass('active')) {
            console.log("Enable delete!");
            $('.delete-news').removeClass('hide');
        } else {
            console.log("Disabling delete");
            $('.delete-news').addClass('hide');
        }
    });

    // Delete button click event listener
    $(document).on('click', '.delete-news', function () {
        var target = $(this);
        // Send result to server for saving to object database
        if (target.val()) {
            var prep = {};
            prep.id = target.val();
            console.log("prep", prep);

            $.ajax({
                type: "delete",
                url: "/news/del/" + prep.id,
                success: function(result){
                    console.log("Item removed from the database! Msg: " + result);
                    target.parent().parent().addClass('hide');
                },
                error: function(err){
                    console.log("ERROR: Unable remove the item from the database!", err);
                }
            });
        }
    });
});



