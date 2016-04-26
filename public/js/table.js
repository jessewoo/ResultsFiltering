console.log("Implementing DataTable.net");

// Order: Release Date Descending

$(document).ready(function() {
    $('#tablenews').DataTable( {
        "paging": false,
        "info": false,
        "searching": false,
        "aaSorting": [ [0,'desc'], [1,'desc'], [2,'desc'], [4,'desc'] ],
    });

    // Highlighting specific News Source
    var activeSourceButton = "#toggle-" + $("#NewsSource").html().toUpperCase() + "-News";
    $(activeSourceButton).addClass("active");

    // Highlight specific 'All' or 'Latest 15', the count for a news source
    if(window.location.href.indexOf("all") > -1) {
        $("#displayAll").addClass("active");
    } else {
        $("#display15").addClass("active");
    }

} );


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

    // TODO: Success callback isn't working for some reason
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



