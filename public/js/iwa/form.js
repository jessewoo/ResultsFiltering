/**
 * Created by jessewoo on 4/27/16.
 */

// LISTENER
$("#StartForm").click(function() {
    console.log("Start Form Button Clicked");
    $("#instructionIWA").hide();
    $("#StartForm").hide();

    $("#WidgetContainer form").load("/iwa-files/firstname.html", function() {
        // console.log("Firstname Form");
        $("#questionsPagination").removeClass("hide");
        $("#questionsPagination").removeClass("hide");
        $("#firstname-question").addClass("active");
    });
})

// LISTENER - when user clicks on pagination wizard
$("#questionsPagination ul li").on("click", function() {
    // console.log("clicked: " + $(this).attr('id'));
    var question_id = $(this).attr("id");
    var trimmed_id = question_id.replace("-question","");
    // console.log(trimmed_id);

    $("#WidgetContainer form .form-group").addClass("hide");

    // Pagination
    var selectedquestion_id = "#" + trimmed_id + "-question";
    $("#questionsPagination ul li").removeClass("active");
    $(selectedquestion_id).addClass("active");

    var loadhtmlfile = "/iwa-files/" + trimmed_id + ".html";

    // Do not AJAX load panels that have ALREADY been AJAX loaded
    // This code checks to see if a section has previously been loaded or not
    if ($('#WidgetContainer #' + trimmed_id + "-widgetcontainer").length > 0) {
        // console.log("Previously loaded via AJAX: " + trimmed_id);
        $('#WidgetContainer #' + trimmed_id + "-widgetcontainer").removeClass("hide");
    }
    // This panel don't exist, lazy load its content via AJAX
    else {
        // console.log('Downloading content for: ' + loadhtmlfile);
        $.ajax({
            url: loadhtmlfile,
            dataType: "html",
            error: function (jq, text, error) {
                console.log('ERROR: ', jq, text, error);
            },
            success: function (data) {
                // console.log('SUCCESS');
                $("#WidgetContainer form").append(data);
            }
        });
    }

})


// LISTENER - when user enters in input, check if three fields are filled
$("#WidgetContainer form .form-group input").on('input', function() {
    console.log($(this).val());
});

// http://stackoverflow.com/questions/931252/ajax-autosave-functionality