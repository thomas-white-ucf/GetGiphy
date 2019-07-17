// ==+==================================================================================================+==
$(document).ready(function () {

    // Setting the initial buttons array,and Calling renderGiphyButtons to display the intial Giphy Buttons
    var gifs = ["not surprised", "wow", "yum", "fails", "spongebob", "classic"]

    // Renders the Giphy Buttons 
    //                             - also called after a button is added
    function renderGiphyButtons() {
        // Clear old buttons
        $("#gif-buttons-view").empty()
        // console.log("RenderGiphyButtons _ log the GIFS ARRAY_==> " + gifs)

        // Set the class="gif" , attribute="data-name" - for each gif using variable-button => a
        for (var i = 0; i < gifs.length; i++) {
            var a = $("<button>")
            a.addClass("gif")
            a.attr("data-name", gifs[i])
            a.text(gifs[i])
            $("#gif-buttons-view").append(a)
        }
    }

    // Click Event Listener, adds button to gif array with user text entered. 
    //  - then this calls renderGiphyButtons
    $("#add-gif").on("click", function (event) {
        event.preventDefault()

        var gif = $("#gif-input").val().trim()
        gifs.push(gif)
        renderGiphyButtons()
    });

    // Handles Click events on Gif Buttons
    $('#gif-buttons-view').on('click', '.gif', function () {
        event.preventDefault();

        $("#gifs-view").empty()

        // Building the URL 
        // Grabbing and storing the data-name property value from the selected button
        const gifName = $(this).attr("data-name")
        console.log(gifName)
        const api_key = "&api_key=zBdCvNxX8P5f6fiVaBByp4PHvK4Szqx5"
        const queryURLGiphy = "https://api.giphy.com/v1/gifs/search?q=" + gifName + api_key + "&limit=10"

        $.ajax({
            url: queryURLGiphy,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;
                console.log(response)
                // Looping through each result item
                // Creating variables and elements to hold the image and rating for the gifs
                for (var i = 0; i < results.length; i++) {

                    var rating = response.data[i].rating
                    var imgURLStill = response.data[i].images.fixed_height_still.url
                    var imgURLAnimate = response.data[i].images.fixed_height.url
                    var rateGif = $("<p>").text("Rating: " + rating)
                    var image = $("<img>").attr("src", imgURLStill).addClass('gify')
                    var gifDiv = $("#gifs-view")
                    image.attr("data-state", "still")
                    image.attr("data-still", imgURLStill)
                    image.attr("data-animate", imgURLAnimate)
                    gifDiv.append(image)
                    gifDiv.append(rateGif)

                    // Display the entire gif above the previous gifs
                }

            })
    });

    // Handles Click events on Gifs themselves
    $("#gifs-view").on("click", ".gify", function () {
        console.log('this click registered');
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

    renderGiphyButtons()
});


// END
// ==+=================================================================================================+==
// ==+=================================================================================================+==


// ## Bonus Goals
//         =============
//         1. Ensure your app is fully mobile responsive.

//         2. Allow users to request additional gifs to be added to the page.
//         * Each request should ADD 10 gifs to the page, NOT overwrite the existing gifs.

//         3. List additional metadata (title, tags, etc) for each gif in a clean and readable format.

//         4. Integrate this search with additional APIs such as OMDB, or Bands in Town. Be creative and build something you are proud to showcase in your portfolio

//         5. Allow users to add their favorite gifs to a `favorites` section.
//         * This should persist even when they select or add a new topic.
//         * If you are looking for a major challenge, look into making this section persist even when the page is reloaded(via        localStorage or cookies). 

