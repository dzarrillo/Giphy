$(document).ready(function () {

    var arrTopics = ["TECHNOLOGY", "FOOD", "SPORTS"];

    var stillPic;
    var movPic;

    createTopicButtons();

    function getAPICall(tag) {

        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=DQXjbpP0PoMNMzpNI8TQKjHnwuuAgBbk&tag&limit=10";

        $.ajax({ url: queryUrl, method: "GET" })
            .done(function (response) {
                // console.log(response);

                $(".picImage").remove();
                $(".rating").remove();

                // loop through & create 10 picDivs/picImages with ratings if available
                for (var j = 0; j < response.data.length; j++) {
                    var picDiv = $("<div>");
                    var picImage = $("<img>");
                    picImage.addClass("picImage");
                    var myRate = response.data[j].rating;
                    var p = $("<p>").text("Rating: " + myRate.toUpperCase());
                    p.addClass("rating");

                    stillPic = response.data[j].images.fixed_height_still.url;
                    movPic = response.data[j].images.fixed_height.url;
                    picImage.attr({ "src": stillPic, "data-still": stillPic, "data-animate": movPic, "data-state": "still" });
                    // console.log("url " + response.data[j].images.fixed_height_still.url);
                    picDiv.append(picImage);
                    picDiv.append(p);
                    $("#mypic" + j).append(picDiv);
                }
            });

    }

    $("body").on("click", "img", function () {
        // console.log("Image clicked" + $(this).attr("class"));

        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });


    $("#add-topic").on("click", function (event) {
        // Prevent form from submitting
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        if (topic.length > 0) {
            // console.log("On submit " + topic);
            // Make sure not to create dup topic
           
            var a = arrTopics.indexOf(topic.toUpperCase());
            console.log("topic " + a);
            if (a < 0) {
                arrTopics.push(topic.toUpperCase());
                createTopicButtons();
            }
        }

    });

    function createTopicButtons() {
        // console.log("create topic button " + arrTopics[0]);
        //remove buttons so we don't have repeat buttons
        $("#mytopics").empty();

        // $(".topic-buttons").remove();
        for (var i = 0; i < arrTopics.length; i++) {
            // $( "p" ).addClass( "myClass yourClass" );
            // $(this).attr("id", "link" + n);
            // var dogImage = $("<img>");
            var btnTopic = $("<button>");
            btnTopic.attr("id", arrTopics[i]);
            console.log("createTopicButtons button topic ID " + arrTopics[i]);
            btnTopic.attr("class", "mybuttons btn btn-outline-success topic-buttons");
            // btnTopic.attr("input", arrTopics[i]);
            btnTopic.text(arrTopics[i]);
            // console.log("button " + arrTopics[i]);
            $("#mytopics").append(btnTopic);
        }
    }


    $(document).on("click", ".topic-buttons", function () {
        // console.log("Clicked!" + $(this).text());
        getAPICall($(this).text());
    });
    

});


