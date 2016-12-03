var output = $('#output'),
  time = 0,
  min = 0,
  count = 20,
  d = new Date(),
  SDate = d.toISOString();
var removeRes = false;
var url = "";
$("input")
  .keyup(function() {
    url = $(this).val();
  })
setInterval(function() {
  time = time + 100;
  //min = parseInt(time / 60000);
  sec = time / 1000;
  if (sec > 59) {
    min++;
    time = 0;
  }
  output.text('Time: ' + min + ' Min ' + sec + ' Seconds');
}, 100);

function load_rss() {
  $("#rss-container").html("");
  $("#rss-container").rss(url, {
    limit: count,
    ssl: true,
    effect: 'show',
    dateFormat: 'MMMM DD, YYYY',
    entryTemplate: "<div class='entry'>\
        <div class='entry_date'>\
          Submitted: {date}\
          <span class='entry_by'>by: {author}</span>\<a class='remove' href='{index}'>\
          <span class='entry_index'>Remove</span>\</a>\
        </div>\<a class='entry_link' href='{url}' target='_blank'>\
        <div class='entry_img'>\
          {teaserImage}\
        </div>\
        <div class='entry_title'>\
          {title}\
        </div>\
        <div class='entry_details'>{shortBody}</div>\
      </div>\</a>",
    error: function(error) {
      console.log(error);
    },
    onData: function(data) {
      $("#current-feed").text(SDate);
    },
    success: function callback() {
      $('.remove').click(function(event) {
        event.preventDefault();
        removeRes = true;
      })
      $('.entry').click(function(event) {
        if (removeRes) {
          event.preventDefault();
          $(this).remove()
          //count = count - 1;
          removeRes = false;
        }
      })
    }
  });

}

$(function() {
  load_rss();
});