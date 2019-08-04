// ==+====================================================================================================+==
$(document).ready(function () {

    // Set the default initial buttons array
    var gifs = ["not surprised", "wow", "yum", "fails", "spongebob", "classic", "you", "surfs"]

    // By default display the search from localStorage
    var localStorageTerm = localStorage.getItem("searchTerm")
    
    // Default is null for first time Users, set default localStorageTerm to = "what"
    if ((localStorageTerm !== null) && (localStorageTerm !== "")) {
        $(".last-search-term").val(localStorageTerm);
    } else {
        localStorageTerm = "what"
        $(".last-search-term").val(localStorageTerm)
    }

    // Render Default buttons 
    renderGiphyButtons()

    // Get Gifs by name saved in local storage on window load
    getGifs(localStorageTerm)


    // ==+=================================================================+==

    // ==+      Functions

    // Search Giphy API with AJAX call using user search term
    function getGifs(gifName) {

        // Clear last searched Gifs
        $("#gifs-view").empty()
        
        // Building the URL 
        const api_key = "&api_key=zBdCvNxX8P5f6fiVaBByp4PHvK4Szqx5"
        const queryURLGiphy = "https://api.giphy.com/v1/gifs/search?q=" + gifName + api_key + "&limit=10"

        // Use URL to perform AJAX call to get gifs from API.Giphy.com
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

                    var rating = results[i].rating
                    var imgURLStill = results[i].images.fixed_height_still.url
                    var imgURLAnimate = results[i].images.fixed_height.url

                    let givDiv =
                        `
                        <div class="card float-left rounded-sm">
                            <div class="card-body">
                                <img class="gify card-img-top mb-1" src="${imgURLStill}  alt="Card image"
                                data-state="still" data-still=${imgURLStill} data-animate=${imgURLAnimate}>
                                </img>
                                <p class="card-text">Rating: ${rating}
                                </p>
                                <a class="btn btn-primary saveGif">Save Gif
                                </a>
                            </div>
                        </div>
                                `
                    // <p class="card-text">Title: ${title}
                    // </p>

                    // Display the gif template string gifDiv above the previous gif - for each i 
                    $("#gifs-view").append(givDiv)

                }
            })
    }

    // Renders the Giphy Buttons 
    function renderGiphyButtons() {

        // Clear old buttons array
        $("#gif-buttons-view").empty()

        // Set the class="gif" & attribute="data-name" for each gif 
        for (var i = 0; i < gifs.length; i++) {

            //  a = button with attr(data-name) && text = gif[i]
            let a =
                `
                <button class="btn gif btn-outline-warning m-2 show collapse multi-collapse" 
                            id="toggleButtons" data-name=${gifs[i]}>
                            ${gifs[i]}
                </button>
                `

            // add the button a to the page
            $("#gif-buttons-view").append(a)
        }
    }

    // Gets specificGif from .gif onclick
    function saveSpecificGif(specificGifStill, specificGifAnimate) {
        console.log("saveSpecificGif -> specificGifStill = ", specificGifStill)
        console.log("saveSpecificGif -> specificGifAnimate = ", specificGifAnimate)

        // saveGifURLs = $(".gify").attr(imgURLStill)
        // console.log("saveGifURLs", saveGifURLs)
    }


    // ==+=================================================================+==

    // ==+      Click Events

    // Adds button to gif array with user entered text. 
    $("#add-gif").on("click", function (event) {
        event.preventDefault()

        // Get user input
        var gifName = $("#gif-input").val().trim()

        // Do not create button or search if user input is blank = ""
        if (gifName !== "") {

            gifs.push(gifName)
        } else {
            console.log("Gif input from user was empty")
        }

        // Clear localStorage
        localStorage.clear();
        // Store newest search into localStorage
        localStorage.setItem("searchTerm", gifName);

        // Display Buttons and Gifs
        renderGiphyButtons()
        getGifs(gifName)
    });

    // Search Gifs on Gif Button Click
    $('#gif-buttons-view').on('click', '.gif', function () {
        event.preventDefault();

        // Grabbing and storing the data-name property value from the selected button
        const gifName = $(this).attr("data-name")
        console.log(gifName)

        getGifs(gifName)
    });

    // Gif Animation > ".gify"
    $("#gifs-view").on("click", ".gify", function () {
        event.preventDefault();

        // Get or Set the value of attribute = data-state in our HTML element, to start or stop animation
        var state = $(this).attr("data-state");

        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");

        } else {
            // Else set src to the data-still value
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

        // get specific Gif to save
        let specificGifStill = $(this).attr("data-still")
        let specificGifAnimate = $(this).attr("data-animate")
        saveSpecificGif(specificGifStill, specificGifAnimate)
    });

    // Save Gif Button  > ".saveGif"
    $("#gifs-view").on("click", ".saveGif", function () {
        event.preventDefault();

        console.log('#gify-view - .saveGif - save Gif button clicked');

        // saveGif();

    });


});

// END
// ==+=================================================================================================+==
