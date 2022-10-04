/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function($tweets) {
    $('.tweets-container').html('')   //replaces the content with new content
    $tweets.sort((a, b) => b.created_at - a.created_at)   //sorts posted tweets from newest to oldest
    for (const key in $tweets) {
      let tweet = createTweetElement($tweets[key]);
      $('.tweets-container').append(tweet);  
    }
  }

  const createTweetElement = (data) => {
      const $tweet = (`<article class="posted-tweet">
            <div class="article-margin">
              <header class="tweet-header">
                <span><img class="avatar" src=${data.user.avatars}> &nbsp;&nbsp; ${data.user.name}</span>
                <h3 class="username">${data.user.handle}</h3>
              </header>
              <section class="tweet-content">
                ${safeHTML(data.content.text)}
              </section>
              <hr>
              <footer>
                <span>${timeago.format(data.created_at)}</span>
                <div class="icons">
                  <i class="fa-solid fa-flag"></i>
                  <i class="fa-solid fa-retweet"></i>
                  <i class="fa-solid fa-heart"></i>
                </div>
              </footer>
            </div>
      </article>`);
          return $tweet;
  }

  const safeHTML = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const hideErrorMessage = () => {
    $("#error-no-message").hide();    
    $("#error-long-message").hide();
  }

  hideErrorMessage();   //hides the error messages

  $("#tweet-form").submit(function(event) {
      event.preventDefault();
      const data = $( this ).serialize();

      const message = $("textarea#tweet-text").val();

      hideErrorMessage();  //hides/resets the error messages after submission

      if (!message) {
        $("#error-no-message").fadeIn();    //shows the error messages if error occurs
        return;
      }
      if (message.length > 140) {
        $("#error-long-message").fadeIn();
        return;
      }

      $.ajax({ 
        method: "POST",
        url: "/tweets",
        data,
        order: "DESC",
        success: function(){
          alert("Form sucessfully submitted.");
        },
        error: function(){
          alert("Form not submitted");
        }
      })
      .done(function(){
        loadTweets();
          console.log("success");
      })

      this.reset();   //clears and resets the tweet form after submitting tweet
      $(".counter").text(140);    //resets the character counter for the tweet form
  })


  const loadTweets = () => {
    $.ajax({ method: "GET", url : "/tweets"})
    .done(function(newPost){
      renderTweets(newPost);
    })
  }

  loadTweets();

});

//serialize() ==> helper function by jQUERY to to turn a form data to a specific format (query string)
//val() ==> to get input text in text area. to get the values of form elements.
