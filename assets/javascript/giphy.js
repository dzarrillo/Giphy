$(document).ready(function () {

    var arrTopics = ["Technology", "Food", "Sports"];
    var stillPic;
    var movPic;


    createTopicButtons();

    // for (var i = 0; i < arrTopics.length; i++) {
    //     // $( "p" ).addClass( "myClass yourClass" );
    //     // $(this).attr("id", "link" + n);
    //     // var dogImage = $("<img>");
    //     var btnTopic = $("<button></button>");
    //     btnTopic.attr("id", arrTopics[i]);
    //     btnTopic.attr("class", "mybuttons btn btn-outline-success");
    //     // btnTopic.attr("input", arrTopics[i]);
    //     btnTopic.text(arrTopics[i]);
    //     console.log("button " + arrTopics[i]);
    //     $("#mytopics").append(btnTopic);
    // }

    $("button").on("click", function () {

        console.log("Clicked!" + $(this).text());
        getAPICall($(this).text());
    });

    function getAPICall(tag) {

        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=DQXjbpP0PoMNMzpNI8TQKjHnwuuAgBbk&tag&rating=g&tag=technology";
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=DQXjbpP0PoMNMzpNI8TQKjHnwuuAgBbk&tag&limit=10";

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
                    var p = $("<p>").text("Rating: " + response.data[j].rating);
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
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
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
        console.log("On submit " + topic);
        
        var btnTopic = $("<button></button>");
            btnTopic.attr("id", topic);
            btnTopic.attr("class", "mybuttons btn btn-outline-success topic-buttons");
            // btnTopic.attr("input", arrTopics[i]);
            btnTopic.text(topic);
            console.log("button topic" + topic);
            $("#mytopics").append(btnTopic);

    });

    function createTopicButtons(){
        // $(".topic-buttons").remove();
        for (var i = 0; i < arrTopics.length; i++) {
            // $( "p" ).addClass( "myClass yourClass" );
            // $(this).attr("id", "link" + n);
            // var dogImage = $("<img>");
            var btnTopic = $("<button></button>");
            btnTopic.attr("id", arrTopics[i]);
            btnTopic.attr("class", "mybuttons btn btn-outline-success topic-buttons");
            // btnTopic.attr("input", arrTopics[i]);
            btnTopic.text(arrTopics[i]);
            // console.log("button " + arrTopics[i]);
            $("#mytopics").append(btnTopic);
        }
    }
});

