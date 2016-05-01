/**
 * Created by jessewoo on 5/1/16.
 */


var load_summary = function (mongo_id) {
    $.ajax({
        type: "get",
        url: "/iwa/one/users/" + mongo_id,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $('#firstname').text(data.firstname);
            $('#homeaddress').text(data.homeaddress);
            $('#city').text(data.city);
        },
        error: function (err) {
            console.log("ERROR: Unable to find item data");
        }
    })
}

$(document).ready(function() {

    // Editing a previous News article, pull it's mongo db id from the URL
    var pathArray = window.location.pathname.split('/');
    var object_id = undefined;

    // Make sure mongo db id's are 24 hex characters
    if (pathArray[pathArray.length - 1].length == 24) {
        object_id = pathArray[pathArray.length - 1];
    }

    if (!object_id) {
        object_id = $("#mongoid").text();
    }

    // If we are editing something that already exists, populate with prior data from mongodb
    if (object_id) {
        console.log("Loading Past News Object: ID -> ", object_id);
        load_summary(object_id);
    }

    // LISTENER
    $("#EditInfo").click(function() {
        console.log("Edit Info on Summary Page Clicked");
        window.location.replace("/iwa/edit/" + object_id);
    });
});