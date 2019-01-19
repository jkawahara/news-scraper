// List for click on .scrape-new button
// $(document).on("click", "a.scrape-new", function() {
//   $("#articles").empty();
//   // GET method for scraping
//   $.ajax({
//     method: "GET",
//     url: "/scrape"
//   }).then(data => {
//     res.render("index");
//   });
// });

// Listen for click on <p>
$(document).on("click", "a.comment", function() {
  $("#notes").empty();
  // Select Article id
  let thisId = $(this).attr("data-id");

  // GET method for note, including title and body, associated with Article ID
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // Structure note fields with title and body, identified with Article ID, with a save button
    .then(data => {
      $("#notes").append("<h5>" + data.title + "</h2>");
      $("#notes").append("<p>Comment Title:</p>");
      $("#notes").append("<input id='titleinput' name='title' size='60'>");
      $("#notes").append("<p>Comment Body:</p>");
      $("#notes").append(
        "<textarea id='bodyinput' name='body' style='width:495px; height: 55px'></textarea>"
      );
      $("#notes").append("<br>");
      $("#notes").append(
        "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      );

      // Include note title and body if exists
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

// Listen for click on save <button>
$(document).on("click", "#savenote", function() {
  // Select Article ID
  let thisId = $(this).attr("data-id");

  // POST method for note, including title and body, associated with Article ID
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(data => {
      // Log to console
      console.log(data);
      $("#notes").empty();
    });

  // Clear values in input and textarea
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
