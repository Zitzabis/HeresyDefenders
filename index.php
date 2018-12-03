<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Heresy Defenders</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="//cdn.materialdesignicons.com/3.2.89/css/materialdesignicons.min.css" media="all" type="text/css">
    </head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
    <script src="js/pixi.min.js"></script>
    <script src="js/guiClass.js"></script>
    <script src="js/keysClass.js"></script>
    <script src="js/gameObjectClass.js"></script>
    <script src="js/musicClass.js"></script>
    <script src="js/mechanics.js"></script>
    
    <body>
        <?php
            include_once("libraries/Mobile_Detect.php");
            $detect = new Mobile_Detect;
            if ( !$detect->isMobile() ) {
                include_once("pages/game.php");
            }
            else {
                include_once("pages/mobile.php");
            }
        ?>
    </body>
</html>