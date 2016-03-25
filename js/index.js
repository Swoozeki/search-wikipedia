var main = function() {
  var address;
  var wikiPage;
  var query;

  $("#search-box").keydown(function(e) {
    if (e.keyCode === 13) {
      wikiPage = $(this).val();
      address = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + wikiPage + "&utf8=&format=json&srprop=snippet&callback=?";

      runAjax();
    }
  });

  function runAjax() {
    $.ajax({
      url: address,
      dataType: "json",
      success: function(json) {
        //console.log(json);
        $("#queries").html("");
        displayQueries(json);
      }
    });
  }

  function displayQueries(json) {
    $.each(json.query.search, function(i, item) {
      query = $("<div class='query'>").append("<a target='blank_' href='https://en.wikipedia.org/wiki/" + item.title + "'><p>" + item.title + "</p><p>" + item.snippet + "</p></a>");
      $("#queries").append(query);
      query.hide().slideDown(1000);
    });
  }
}

$(document).ready(main);