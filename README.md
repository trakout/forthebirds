# Javascript Twitter 'Widget' Plugin using PHP to run REST API v1.1 

* Relatively small size: (JS takes up ~2kb)
* Loads in json through ajax (will not cause page slowness)
* Hashtags and @usernames are automatically linked
* Avatar Display and choice of display location (both optional)
* Displays up to 200 tweets
* Configurable slider: Display 1 of 200 tweets at a time, or all 200 at once
* 3 Different slider transitions to choose from: Fade, Slide Horizontal/Vertical

## Usage

* Go to https://dev.twitter.com/apps/new to start a new app, or use an existing one.
* Authorize the app, grab the needed info to fill all four fields in '/php/config.php'.
* Get jQuery. Current support is for v1.9.1.
* Include jQuery and jquery.forthebirds.js files in your html's `<head>`. 
```
#!html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/jquery.forthebirds.min.js"></script>
```
* Include forthebirds.css or the css from forthebirds.css.
```
#!html
<link rel="stylesheet" href="css/forthebirds.css">
```
* In `<body>`, make a div for your tweets, with a classname of your choice
```
#!html
<div class="tweetsdiv"></div>
```
* In your js, initialize forthebirds on page load with the username of your choice, and other options.
```
#!javascript
	$('.tweetsdiv').forthebirds({
      user: 'trakout'
  });
```
* Other options include the following:
```
#!javascript
	$('.tweetsdiv').forthebirds({
		user: 'trakout',        					// default is trakout, can be any twitter user
		fetch: '20',           						// Amount of total tweets to grab. Max is 200, default is 20
		count: '2',           						// How many tweets to show at once. Default is 2
		avatar: 'false',        					// default is false; true if you want user profile pic to show
		avatarlocation: 'insertclass',   			// class of div to insert profile pic into. default is null (avatar will insert above tweets)
		divider: '<hr />',      					// divider between tweets if applicable. Default is <hr />
		loadtext: 'loading',         				// Text to show while loading tweets, eg. 'Loading Tweets...'
		transition: 'fade',    						// Transition between tweets. Default is 'slide'. Other option is 'fade'
		timer: '6000'           					// Transition timings
	});
```


## Credits

* Abraham Williams (abraham@abrah.am) http://abrah.am - Twitter Oauth PHP Script
* Mike Cochrane <mikec@mikenz.geek.nz>,
* Nick Pope <nick@nickpope.me.uk> - Twitter Regex Abstract Class, Twitter Autolink Class
* Travis Nischuk - jquery.forthebirds.js
* Patrick Stolk-Ramaker - For demanding this plugin be created

## Change log

2013 06 28
* First release
