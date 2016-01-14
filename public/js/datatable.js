$(function () {
    // Start the page with the 6 most recent objects
    starwarsTable('all');

});

// Add's content to the page based upon the 'size' passed to it
// Called at page load and via button clicks
var starwarsTable = function (how_many) {
    if (how_many == "all") {
        $.ajax({
            type: "get",
            url: "/all/characters",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.each(data, function (index, object) {
                    tableWorker(object);
                });
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    }
}


// Append to table function
var tableWorker = function (object) {
    var newRow = "<tr class='center'>";
    newRow += "<td>" + object.name + "</td>";
    newRow += "<td>" + object.gender + "</td>";
    newRow += "<td>" + object.mass + "</td>";
    newRow += "<td>" + object.height + "</td>";
    newRow += "</tr>";
    $("#mainTable > tbody:last-child").append(newRow);
}