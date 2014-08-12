<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>For the Birds</title>
        <meta name="viewport" content="width=device-width, user-scalable=yes">
        <link rel="stylesheet" href="css/bootstrap.css">
    </head>
    <body>

<div class="twitter-header hidden-xs">
    <div id="carousel-generic" class="carousel slide container" data-ride="carousel">
        <div class="carousel-inner">
        </div>
      <a title="Previous tweet" class="left carousel-control" href="#carousel-generic" role="button" data-slide="prev">
        <span class="left"></span>
      </a>
      <a title="Next tweet" class="right carousel-control" href="#carousel-generic" role="button" data-slide="next">
        <span class="right"></span>
      </a>
    </div>
</div>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="js/bootstrap.js"></script>
        <script src="js/jquery.forthebirds.js"></script>


        <script>
            $('.twitterdiv').forthebirds({
                // loadtext: 'Loading Tweets...',
                // avatar: 'true',
                // avatarlocation: 'pic',
                transition: 'slideup',
                timer: '3000',
                date: 'true',
                datelocation: 'datein'
            });
        </script>


    </body>
</html>