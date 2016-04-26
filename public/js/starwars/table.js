$(document).ready(function() {
    // Start the page with the ALL the objects, filtered by DataTable.net
    starwarsTable('all');

} );

// Add's content to the page based upon the 'size' passed to it
// Called at page load and via button clicks
var starwarsTable = function (how_many) {
    if (how_many == "all") {
        // Does an AJAX data retrieval thru the REST URL
        $.ajax({
            type: "get",
            url: "/starwars/all/characters",
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.each(data, function (index, object) {
                    tableWorker(object);
                });
                console.log("Implementing DataTable.net");
                $('#mainCharacterTable').DataTable();
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
    newRow += "<td><a href='edit/" + object._id + "'>" + object.name + "</a></td>";
    newRow += "<td>" + object.gender + "</td>";
    newRow += "<td>" + object.mass + "</td>";
    newRow += "<td>" + object.height + "</td>";
    newRow += "</tr>";
    $("#mainCharacterTable > tbody:last-child").append(newRow);
}