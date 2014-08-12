<?php
    header('Content-Type: text/html; charset=utf-8');
    include('../config.php');
    require_once('Autolink.php');
    require_once 'twitteroauth.php';

    $user = $_GET['user'];
    $fetch = $_GET['fetch'];
    $avatar = $_GET['avatar'];
    $getUser = $_GET['getUser'];


    $result = Array();
    $date_result = Array();

    $twitterConnection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
    $twitterData = $twitterConnection->get(
                    'lists/statuses.json?slug=test1&owner_screen_name=pgerochi&count=1',
                    array(
                      'screen_name'     => $user,
                      'count'           => $fetch,
                      'exclude_replies' => false
                    )
                  );

    echo json_encode($twitterData);
?>
