<?php
    header('Content-Type: text/html; charset=utf-8');
    include('../config.php');
    require_once('Autolink.php');
    require_once 'twitteroauth.php';

    $user = $_GET['user'];
    $fetch = $_GET['fetch'];
    $avatar = $_GET['avatar'];

    $result = Array();
    $date_result = Array();

    $twitterConnection = new TwitterOAuth($consumer_key, $consumer_secret, $access_token, $access_token_secret);
    $twitterData = $twitterConnection->get(
                    'statuses/user_timeline',
                    array(
                      'screen_name'     => $user,
                      'count'           => $fetch,
                      'exclude_replies' => false
                    )
                  );

    foreach($twitterData as $tweets) {

      if (strpos(($tweets->text), '…', ((strlen($tweets->text) - 4))) !== false) {
          $lastSpace = strrpos($tweets->text, ' ');
          $tempArr = str_split($tweets->text);
          for ($c = (strlen($tweets->text) - 1); $c >= 0 ; $c--) {
              if ($c >= $lastSpace) {
                  $pop = array_pop($tempArr);
              }
          }
          $finished = implode($tempArr);
          if ($tempArr[(count($tempArr) - 1)] == '.') {
            $finished = $finished . '..';
          }
          else {
            $finished = $finished . '...';
          }
      }
      else {
          $finished = $tweets->text;
      }
      $date_tmp = $tweets->created_at;
      $tweet = Twitter_Autolink::create($finished)
          ->setNoFollow(false)
          ->addLinks();

      array_push($result, $tweet);
      array_push($date_result, $date_tmp);
    }

    //date
    if ($count = $_GET['date'] == 'true') {
      array_push($result, $date_result);
    }

    //avatar
    if (($count = $_GET['avatar']) == 'true') {
      array_push($result, '<img class="ftb avatar" src="' . $tweets->user->profile_image_url . '" />');
    }

    echo json_encode($result);

?>
