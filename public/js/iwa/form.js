/**
 * Created by jessewoo on 4/27/16.
 */

$("#StartForm").click(function() {
    console.log("Start Form Button Clicked");
    $("#instructionIWA").hide();
    $("#StartForm").hide();

    $("#WidgetContainer").load("iwa-files/firstname.html", function() {
        // console.log("Firstname Form");
        $("#questionsPagination").removeClass("hide");
        $("#questionsPagination").removeClass("hide");
        $("#firstname-question").addClass("active");
    });
})

$("#questionsPagination ul li").on("click", function() {
    // console.log("clicked: " + $(this).attr('id'));
    var question_id = $(this).attr("id");
    var trimmed_id = question_id.replace("-question","");
    // console.log(trimmed_id);
    var selectedquestion_id = "#" + trimmed_id + "-question";
    $("#questionsPagination ul li").removeClass("active");
    $(selectedquestion_id).addClass("active");

    var loadhtmlfile = "iwa-files/" + trimmed_id + ".html";

    $("#WidgetContainer").load(loadhtmlfile, function() {
        console.log("Load " + trimmed_id + ".html");

    });

})