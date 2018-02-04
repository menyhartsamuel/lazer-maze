<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő - Demo</title>
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
			  <li class="active"><a href="#">Pályák</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
			  <li><a href="registration.php">Regisztráció</a></li>
			  <li><a href="login.php">Bejelentkezés</a></li>
			</ul>
		  </div>
		</nav>
		<main class="jumbotron jumbotron-fluid text-center">
			<div>
			<h1>Fénytörő Fejtörő</h1>
			<p>Nehézségi szint:</p>
			<p><input class="btn btn-default" id="easy" type="button" value="Könnyű">
			  <input class="btn btn-default" id="medium" type="button" value="Közepes">
			  <input class="btn btn-default" id="hard" type="button" value="Nehéz"></p>
			<div id="game">
			  <div id="board"></div>
			  <div id="items"></div>
			  <div id="result"></div>
			</div>
			<script type="text/javascript" src="js/lasermaze.js"></script>
			<script type="text/javascript" src="js/demo.js"></script>
			<div>
		<p>Ha még több pályával szeretnél játszani regisztrálj az oldalon!</p>
		</main>
	</body>
</html>