<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hello World</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    </head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/pixi.min.js"></script>
    <script src="js/mechanics.js"></script>
    <style>
        * { padding: 0; margin: 0; overflow:hidden; }
        html,body {
            height: 100%;
        }
    </style>
    <body>
        <?php
            include_once("pages/game.php")  
        ?>
    </body>
</html>