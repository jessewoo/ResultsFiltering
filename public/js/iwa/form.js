/**
 * Created by jessewoo on 4/27/16.
 */

// LISTENER
$("#StartForm").click(function() {
    console.log("Start Form Button Clicked");
    $("#instructionIWA").hide();
    $("#StartForm").hide();
    $("#SubmitForm").removeClass("hide");

    $("#WidgetContainer form").load("/iwa-files/firstname.html", function() {
        // console.log("Firstname Form");
        $("#questionsPagination").removeClass("hide");
        $("#questionsPagination").removeClass("hide");
        $("#firstname-question").addClass("active");
    });
});

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

});


$(document).on('click', '#SubmitForm', function () {
    event.preventDefault();
    var errormessage = "Please fill Out the following fields: ";
    var first_name_input = $("#FirstNameInput").val();
    if (!first_name_input) {
        errormessage = errormessage + " * First Name ";
    }
    var city_input = $("#CityInput").val();
    if (!city_input) {
        errormessage = errormessage + " * City ";
    }
    var home_address_input = $("#HomeAddressInput").val();
    if (!home_address_input) {
        errormessage = errormessage + " * Home Address ";
    }

    if (first_name_input && city_input && home_address_input) {
        console.log('All fields filled out');

        // Cast an empty object for us to populate
        var content = new Object();

        content.firstname = first_name_input;
        content.city = city_input;
        content.homeaddress = home_address_input;

        // Log (display to console) the result
        var json = JSON.stringify(content);
        // console.log("Sending: " + json);

        var mongoid = "";

        // Send result to server for saving to object database
        $.ajax({
            type: "post",
            url: "/iwa/save/users",
            dataType: "json",
            data: json,
            contentType: "application/json",
            success: function (data) {
                console.log("Item saved to database!");
                // console.log(data);
                // console.log(data.insertedIds);
                mongoid = data.insertedIds;

                // console.log("/iwa/one/users/" + mongoid.toString());
                window.location.replace("/iwa/one/users/" + mongoid.toString());

            },
            error: function (err) {
                console.log("ERROR: Unable save the item to the database!", err);
            }
        });

    }
    // Error Message
    else {
        console.log(errormessage);
        $("#ErrorMessageContainer").append("<div class='alert alert-danger text-center' role='alert'>" + errormessage + "</div>");
        $('#ErrorMessageContainer').fadeOut(4000, function(){
            $('#ErrorMessageContainer').empty().fadeIn();
        });
    }

});

$(document).ready(function() {
    // If we are editing a previous MotM article, pull it's mongo db id from the URL
    var pathArray = window.location.pathname.split('/');
    var object_id = undefined;
    // Make sure mongo db id's are 24 hex characters
    if (pathArray[pathArray.length - 1].length == 24) {
        object_id = pathArray[pathArray.length - 1];
    }

    // If we are editing something that already exists, populate with prior data from mongodb
    if (object_id) {
        console.log("Loading previous MotM content from ID -> ", object_id);
        load_previous(object_id);
    }
});



// http://stackoverflow.com/questions/931252/ajax-autosave-functionality