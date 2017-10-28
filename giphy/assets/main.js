   // Initial array of giphys
      var giphys = ["Cat","Dog","Hamster"];

      // displaygiphyInfo function re-renders the HTML to display the appropriate content
      function displaygiphyInfo() {

        var giphy = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creates AJAX call for the specific giphy button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
         
        var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='col-sm-3, col-md-3, col-xs-3'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var giphyImage = $("<img data-state='still' class='gif'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              giphyImage.attr("src", results[i].images.fixed_height_small_still.url);
              giphyImage.attr("data-still", results[i].images.fixed_height_small_still.url);
              giphyImage.attr("data-animate", results[i].images.fixed_height_small.url);
              giphyImage.attr("data-state", "still");

              // Appending the paragraph and giphyImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(giphyImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#giphys-view").prepend(gifDiv);
            }
          }
        });

      }

          // Function for displaying giphy data
      function renderButtons() {

        // Deleting the giphys prior to adding new giphys
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of giphys
        for (var i = 0; i < giphys.length; i++) {

          // Then dynamicaly generating buttons for each giphy in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of giphy to our button
          a.addClass("giphy-clicked");
          a.addClass("btn-primary");
          // Adding a data-attribute
          a.attr("data-name", giphys[i]);
          // Providing the initial button text
          a.text(giphys[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var giphyInput = $("#giphy-input").val().trim();

        // The giphy from the textbox is then added to our array
        giphys.push(giphyInput);

        // Calling renderButtons which handles the processing of our giphy array
        renderButtons();
      });

      $(document).on("click", ".giphy-clicked", function() {
        $("#giphys-view").empty(); 
    });
      $(document).on("click", ".giphy-clicked", displaygiphyInfo);


    $(document).on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log(state);
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


      // Calling the renderButtons function to display the intial buttons
      renderButtons();
