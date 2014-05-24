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
            user: 'trakout',        // default is trakout, can be any twitter user
            fetch: '5',             // Amount of total tweets to grab. Max is 200, default is 20
            count: '1',             // How many tweets to show at once. Default is 2
            avatar: 'false',        // default is false; true if you want user profile pic to show
            avatarlocation: null,   // class of div to insert profile pic into. default is null (avatar will insert above tweets)
            divider: '<hr />',      // divider between tweets if applicable. Default is <hr />
            loadtext: null,         // Text to show while loading tweets, eg. 'Loading Tweets...'
            transition: 'slide',    // Transition between tweets. Default is 'slide'. Other options are 'fade', and 'slideup'
            timer: '4000',          // Transition timings
            date: 'false',          // Show a relative time like "2 minutes ago"
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

        function rightSlide() {

            if (settings.fetch == settings.count) {
                slidePoint--;
            }
            if (settings.transition === 'fade') {
                $('ul.ftb').animate({'opacity':'0'}, function() {
                    $('ul.ftb').animate({'margin-left':'-' + (slidePoint*(singleWidth)) + 'px'}, 200, function() {
                        $('ul.ftb').animate({'opacity':'1'});
                    });
                });
            }
            else if (settings.transition === 'slideup') {
                $('li.ftb').css('float', 'none');

                if (runOnce === 0) {
                    topArr = $('ul.ftb li.ftb:eq(0)').height() - (-($('li.ftb').css('padding-bottom').replace('px', '')));
                    runOnce = 1;
                }

                $('ul.ftb').animate({'margin-top':'' + (-(topArr) * (slidePoint)) + 'px'});
            }
            else {
                $('ul.ftb').animate({'margin-left':(slidePoint*(singleWidth)) + 'px'});
            }

            if (slidePoint >= (slideCount - 1)) {
                //reset back to beginning
                slidePoint = -1;
            }

            if (settings.date != 'false') {
                //grab and put into an array
                // for (var ik = 0; ik < dateArr.length; ik++) {
                //     console.log(dateArr[ik]);
                // }
                if (settings.datelocation != null) {
                    // insert the date to the defined div
                    $('.datestamp').animate({'opacity':'0'}, function() {
                        $('.datestamp').html(timeAgo(dateArr[datecount]));
                        $('.datestamp').animate({'opacity':'1'});
                    });
                }
                else {
                    // leave the time stamp below the tweet somewhere..
                    $('.datestamp').animate({'opacity':'0'}, function() {
                        $('.datestamp').html(timeAgo(dateArr[datecount]));
                        $('.datestamp').animate({'opacity':'1'});
                    });
                }
                datecount++;
                if (datecount == dateArr.length) {
                    datecount = 0;
                }
            }

            slidePoint++;

        }

        function slider() {
            singleWidth = (($('ul.ftb').css('width').replace('px', '')) -(-($('li.ftb').css('padding-right').replace('px', ''))));
            slideWidth = singleWidth * (parseInt(settings.fetch));
            $('ul.ftb').css('width', slideWidth + 'px');
            $('.insertftb').fadeIn();

             if (settings.date != 'false') {
                if (settings.datelocation == null) {
                    //getting ready for the date insert
                    $(shotgun).append('<div class="datestamp"></div>');
                    $('.datestamp').animate({'opacity':'0'}, function() {
                        $('.datestamp').html(timeAgo(dateArr[datecount]));
                        $('.datestamp').animate({'opacity':'1'});
                    });
                }
                else {
                    $('.' + settings.datelocation).append('<div class="datestamp"></div>');
                    $('.datestamp').animate({'opacity':'0'}, function() {
                        $('.datestamp').html(timeAgo(dateArr[datecount]));
                        $('.datestamp').animate({'opacity':'1'});
                    });
                }
            }
            
            var timer = window.setInterval(rightSlide, parseInt(settings.timer));
        }

        function loadinsert(result) {
            var resultArr = $.parseJSON(result);
            var point = 1;

            //is there a date to take care of?
            if (settings.date != 'false') {
                if (settings.avatar != 'false') {
                    var iterLength = (resultArr.length - 2);
                    dateArr = resultArr[(resultArr.length - 2)];
                }
                else {
                    var iterLength = (resultArr.length - 1);
                    dateArr = resultArr[(resultArr.length - 1)];
                }
            }
            else {
                var iterLength = resultArr.length;
            }

            for (var c = 0; c < iterLength; c++) {

                if (c < parseInt(settings.fetch)) {
                    // tweets
                    if (((parseInt(settings.count)) === 1) || ((parseInt(settings.count)) === null)) {
                        // just one tweet per slide
                        if (c === 0) {
                            slideCount++;
                            infoinsert = '<ul class="ftb pane"><li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li>';
                        }
                        else if (c == ((parseInt(settings.fetch)) - 1)) {
                            slideCount++;
                            infoinsert = infoinsert + '<li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li></ul>';
                        }
                        else {
                            slideCount++;
                            infoinsert = infoinsert + '<li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li>';
                        }
                    }
                    else {
                        // multiple tweets per slide
                        if (point == 1) {
                            if (c === 0) {
                                // very first slide
                                slideCount++;
                                infoinsert = '<ul class="ftb pane"><li class="ftb slide"><ul><li><div class="ftb tweet">' + resultArr[c] + '</div></li>' + settings.divider;
                            }
                            else {
                                if (c === ((parseInt(settings.fetch)) - 1)) {
                                    //the off chance we need the very last slide
                                    infoinsert = infoinsert + '<li class="ftb slide"><ul><li><div class="ftb tweet">' + resultArr[c] + '</div></li></ul></li></ul>';
                                }
                                else {
                                    slideCount++;
                                    // first of other panes
                                    infoinsert = infoinsert + '<li class="ftb slide"><ul><li><div class="ftb tweet">' + resultArr[c] + '</div></li>' + settings.divider;
                                }
                            }
                        }
                        else if (point === (parseInt(settings.count))) {
                            
                            // close it off
                            if (c === ((parseInt(settings.fetch)) - 1)) {
                                //very last slide
                                infoinsert = infoinsert + '<li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li></ul></li></ul>';
                            }
                            else {
                                //last pane
                                infoinsert = infoinsert + '<li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li></ul>';
                                point = 0;
                            }
                        }
                        else {
                            // add to the slide (middle somewhere)

                            if (c === ((parseInt(settings.fetch)) - 1)) {
                                //the off chance we need the very last slide
                                infoinsert = infoinsert + '<li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li></ul></li></ul>';
                            }
                            else {
                                infoinsert = infoinsert + '<li class="ftb slide"><div class="ftb tweet">' + resultArr[c] + '</div></li>' + settings.divider;
                            }
                        }
                    }
                    point++;
                }
                // else {
                //     // avatar
                //     if (settings.date != 'false') {
                //         profilepic = resultArr[resultArr.length];
                //         console.log(profilepic);
                //     }
                //     else {
                //         profilepic = resultArr[resultArr.length];
                //         console.log(profilepic);
                //     }
                // }
            }

            if (settings.date != 'false') {
                if (settings.avatar != 'false') {
                    profilepic = resultArr[(resultArr.length - 1)];
                }
                else {
                    profilepic = '';
                }

            }
            else {
                profilepic = resultArr[(resultArr.length - 1)];
            }
            
            // after it's all over, let's append.
            shotgun.html('<div style="display: none;" class="insertftb"></div>');
            if (settings.avatarlocation === null) {
                $('.insertftb').append(profilepic);
            }
            else {
                $('.' + settings.avatarlocation).html(profilepic);
            }

            $('.insertftb').append(infoinsert);
            slider();
        }

        $.ajax({
          url: 'js/php/twitteroauth/forthebirds.php',
          type: 'get',
          data: {user:settings.user,fetch:settings.fetch,avatar:settings.avatar,date:settings.date},
          error: failure,
          success: function(resultsbro) {
                loadinsert(resultsbro);
            }
        });
    };
}( jQuery ));





