<?php
  define('TOKEN', 'protection');
  include_once('modules/session_login.php');
  include_once('modules/session_game.php');
  
  if(isset($_GET['id'])) {
	$id = $_GET['id'];
	SetGame($id);
  } else {
	header('Location: maps.php');
    exit();
  }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő - <?php echo $id; ?></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/bootstrap.css" rel="stylesheet" media="screen">
		<link href="css/game.css" rel="stylesheet">
	</head>
	<body class="container">
		<header class="text-center">
			<img src="img/logo.png" alt=""> 
		</header>
		<nav class="navbar navbar-default">
		  <div class="container-fluid">
			<ul class="nav navbar-nav">
			  <li><a href="index.php">Kezdőlap</a></li>
			  <li><a href="maps.php">Pályák</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
			  <li><p class="navbar-text"><?php echo GetUser(); ?></p></li>
			  <li><a href="logout.php">Kijelentkezés</a></li>
			</ul>
		  </div>
		</nav> 
		<main class="jumbotron jumbotron-fluid text-center">
		  <h1><?php echo $id; ?></h1>
		  <div id="game">
			  <div id="board"></div>
			  <div id="items"></div>
			  <div id="result"></div>
			  <div id="message"></div>
		  </div>
		  <script type="text/javascript" src="js/ajax.js"></script>
		  <script type="text/javascript" src="js/lasermaze.js"></script>
		  <script type="text/javascript" src="js/gamemanager.js"></script>
		</main>
	</body>
</html>