$(document).ready(function() {

    var arrTopics = ["Technology", "Food", "Sports"];

    for (var i = 0; i < arrTopics.length; i++) {
        // $( "p" ).addClass( "myClass yourClass" );
        // $(this).attr("id", "link" + n);
        // var dogImage = $("<img>");
        var btnTopic = $("<button></button>");
        btnTopic.attr("id", arrTopics[i]);
        btnTopic.attr("class", "mybuttons btn btn-outline-success");
        // btnTopic.attr("input", arrTopics[i]);
        btnTopic.text(arrTopics[i]);
        console.log("button " + arrTopics[i]);
        $("#mytopics").append(btnTopic);
    }

    $("button").on("click", function () {

        // console.log("Clicked!" + $(this).text());
        getAPICall($(this).text());
    });

    function getAPICall(tag) {

        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=DQXjbpP0PoMNMzpNI8TQKjHnwuuAgBbk&tag&rating=g&tag=technology";
        //queryURL + "dogs" //tag;

        // $.ajax( {
        //     url: queryURL,
        //     method: "GET"
        // }).then(function (response) {
        //     console.log(response);
        //     var imageUrl = response.data.image_original_url;
        //     var myImage = $("<img>");
        //     myImage.attr("src", imageUrl);
        //     myImage.attr("alt", "image");
        //     $("#mypics").prepend(myImage);
        // });
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + tag + "&api_key=DQXjbpP0PoMNMzpNI8TQKjHnwuuAgBbk&tag&limit=10";

        $.ajax({url:queryUrl, method:"GET"})
            .done(function(response){
                console.log(response);
                var picDiv = $("<div>");
               

                // loop through & create 10 picDivs/picImages with ratings if available
                for(var j = 0; j < response.data.length; j++){
                    // var picDiv = $("<div>");
                    var picImage = $("<img>");
                    var p = $("<p>").text("Rating: " + response.data[j].rating);
                    console.log("rating " + response.data[j].rating);
                    picImage.attr("src", response.data[j].images.fixed_height.url);
                    console.log("url " + response.data[j].images.fixed_height.url);
                    picDiv.append(picImage);
                    picDiv.append(p);
                    $("#mypics").append(picDiv);
                }
            });

    }

});

