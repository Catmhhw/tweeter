$(document).ready(function() {
    $("#tweet-text").on("keyup", function() {
        const counter = $(".counter")
        const charNum = $(this).val().length;
        const remainingChars = 140 - charNum;

        if (remainingChars < 0){
            return counter.text(remainingChars).css("color", "red");
        }
        return counter.text(remainingChars).css("color", "black");
    })
  });