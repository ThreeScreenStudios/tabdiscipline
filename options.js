var validInput = function(val) {
  console.log("val" + val);
  return !isNaN(val);
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get(['superhappy', 'happy', 'neutral', 'sad', 'limit'], function(items) {
    if (!items.superhappy) {
      $("#superhappybox").val("6");
      $("#happybox").val("11");
      $("#neutralbox").val("16");
      $("#sadbox").val("21");
    } else {
      $("#superhappybox").val(items.superhappy);
      $("#happybox").val(items.happy);
      $("#neutralbox").val(items.neutral);
      $("#sadbox").val(items.sad);
      $("#limitbox").prop('checked', items.limit);
    }
  });

  $("#savebutton").click(function() {
    var superhappy = parseInt($('#superhappybox').val());
    var happy = parseInt($('#happybox').val());
    var neutral = parseInt($('#neutralbox').val());
    var sad = parseInt($('#sadbox').val());
    var limit = $('#limitbox').is(':checked');
    if (!validInput(superhappy) || !validInput(happy) || !validInput(neutral) || !validInput(sad)) {
      alert("Please put in integers only :(");
      return;
    } else if (!(superhappy < happy && happy < neutral && neutral < sad)) {
      alert("Please make sure each number is progressively higher (happy " +
        "is a lower number than neutral for example)");
      return;
    } else {
      var items = {
        'superhappy': superhappy,
        'happy': happy,
        'neutral': neutral,
        'sad': sad,
        'limit': limit
      };
      chrome.storage.local.set(items, function() {
        console.log('finished saving');
      });
    }

  });
});