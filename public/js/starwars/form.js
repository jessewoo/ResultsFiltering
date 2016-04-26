$(function () {
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


// Fills in the form with the data we already have
var load_previous = function (mongo_id) {
    $.ajax({
        type: "get",
        url: "/starwars/one/mongo/characters/" + mongo_id,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.log(data);
            $('#characterName').val(data.name);
            $("#mongoid").val(data._id);
        }
    });
};





