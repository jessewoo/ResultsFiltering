/**
 * Created by jessewoo on 4/27/16.
 */

$("#StartForm").click(function() {
    console.log("Start Form Button Clicked");
    $("#WidgetContainer").load("iwa-files/city.html", function() {
        console.log("Loaded City Form");
    });
})