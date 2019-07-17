# Get-Giphy

## Uses AJAX Calls to Giphy API
Lets users enter text to create buttons.
Selecting the buttons displays 10 Gifs.
Clicking the Gifs animates them, clicking again stops the Gif animation.

### Functions Used
1. renderGiphyButtons() - this is called when a user enters a new button and on window load. This function clears the old array of buttons, displays new buttons including what the user entered

### On-Click Functions
1. add-buttons - Lets user add text to a form. When submitted, it calls renderGiphyButtons to display the user entered button
2. gif-buttons-view - clears current displayed gifs. Builds URL based on what button was selected. Performs AJAX call with this URL, returns 10 still gif images.
3. gifs-view - enables user to click gifs to start or stop gif animation.

