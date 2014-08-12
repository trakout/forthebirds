(function ($) {

    $.fn.forthebirds = function (options) {

        var shotgun = $(this);
        var data_from_ajax;
        var totalData = new Array();
        var ic = new Array();
        var dateArr = new Array();
        var profilepic = null;
        var infoinsert = null;
        var singleWidth = null;
        var slideWidth = null;
        var topArr = null;
        var slidePoint = 1;
        var slideCount = 0;
        var runOnce = 0;
        var datecount = 0;

        var settings = $.extend({
            user: 'pgerochi',        // default is trakout, can be any twitter user
            fetch: '22',             // Amount of total tweets to grab. Max is 200, default is 20
            getUser: 'true',
            count: '1',             // How many tweets to show at once. Default is 2
            avatar: 'false',        // default is false; true if you want user profile pic to show
            avatarlocation: null,   // class of div to insert profile pic into. default is null (avatar will insert above tweets)
            divider: '<hr />',      // divider between tweets if applicable. Default is <hr />
            loadtext: null,         // Text to show while loading tweets, eg. 'Loading Tweets...'
            transition: 'slide',    // Transition between tweets. Default is 'slide'. Other options are 'fade', and 'slideup'
            timer: '4000',          // Transition timings
            date: 'true',           // Show a relative time like "2 minutes ago"
            datelocation: null      // class of div to insert date into. default is null (date will insert above tweets)
        }, options);

        $(this).html(settings.loadtext);

        function timeAgo(dateString) {
            var rightNow = new Date();
            var then = new Date(dateString);
            if(navigator.appVersion.indexOf("MSIE") !== -1){
            // IE can't parse these crazy Ruby dates
                then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
            }
            var diff = rightNow - then;
            var second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
            if (isNaN(diff) || diff < 0) { return ""; }
            if (diff < second * 2) { return "right now"; }
            if (diff < minute) { return Math.floor(diff / second) + " seconds ago"; }
            if (diff < minute * 2) { return "about 1 minute ago"; }
            if (diff < hour) { return Math.floor(diff / minute) + " minutes ago"; }
            if (diff < hour * 2) { return "about 1 hour ago"; }
            if (diff < day) { return  Math.floor(diff / hour) + " hours ago"; }
            if (diff > day && diff < day * 2) { return "yesterday"; }
            if (diff < day * 365) { return Math.floor(diff / day) + " days ago"; }
            else { return "over a year ago"; }
        }

        function failure() {
            console.log('Something Went Wrong. Check your dependancies.');
        }

        function parseTwitter(text) {
  
            text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(uri) {
            return uri.link(uri);
            });
             
           
            text = text.replace(/[@]+[A-Za-z0-9-_]+/, function(u) {
            var username = u.replace("@","")
            return u.link("http://twitter.com/"+username);
            });
             
        
            text = text.replace(/[#]+[A-Za-z0-9-_]+/, function(t) {
            var tag = t.replace("#","%23")
            return t.link("http://search.twitter.com/search?q="+tag);
            });
            return text;
        }

        function loadinsert(result) {
            var resultArr = $.parseJSON(result);


            for (var i = 0; i < resultArr.length; i++) {


                if (i === 0) {
                    infoinsert = '<div class="item active"><div class="username"><a href="https://twitter.com/' + resultArr[i].user.screen_name + '" target="_blank" title="' + resultArr[i].user.screen_name + '">@' + resultArr[i].user.screen_name + '</a><div class="time-ago">'+timeAgo(resultArr[i].created_at)+'</div></div><div class="tweet">' + parseTwitter(resultArr[i].text) + '</div></</div>';
                    $('.carousel-inner').append(infoinsert);
                } else {
                    infoinsert = '<div class="item"><div class="username"><a href="https://twitter.com/' + resultArr[i].user.screen_name + '" target="_blank" title="' + resultArr[i].user.screen_name + '">@' + resultArr[i].user.screen_name + '</a><div class="time-ago">'+timeAgo(resultArr[i].created_at)+'</div></div><div class="tweet">' + parseTwitter(resultArr[i].text) + '</div></</div>';
                    $('.carousel-inner').append(infoinsert);
                }
            }
        }

        $.ajax({
          url: 'js/php/twitteroauth/forthebirds.php',
          type: 'get',
          data: {user:settings.user,fetch:settings.fetch,avatar:settings.avatar,date:settings.date, getUser:settings.getUser},
          error: failure,
          success: function(resultsbro) {
                loadinsert(resultsbro);
            }
        });
    };
}( jQuery ));





