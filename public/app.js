// GET JSON method
$.getJSON("/articles", data => {
  // Structure each article with ID, title, summary and link
  for (let i = 0; i < data.length; i++) {
    $("#articles").append(
      "<p data-id='" +
        data[i]._id +
        "'>" +
        data[i].title +
        "<br />" +
        data[i].summary +
        "<br />" +
        data[i].link +
        "</p>"
    );
  }
});

// Listen for click on <p>
$(document).on("click", "p", function() {
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
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
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
