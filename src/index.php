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
        
        <link rel="stylesheet" href="css/forthebirds.css">

    </head>
    <body>
        <div class="other misc">
            This is for the birds. v1.0<br />
            <hr /><br /><br /><br />
        </div>
        <div class="pic"></div>

        <div class="twitterdiv"></div>
        <div class="datein"></div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
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