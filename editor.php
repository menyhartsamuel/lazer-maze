<?php
  define('TOKEN', 'protection');
  include_once('modules/session_login.php');
  include_once('modules/session_game.php');

  if(GetUser() != 'admin') {
    header('Location: maps.php');
    exit();
  }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő - Pályaszerkesztő</title>
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
		  <h1>Pályaszerkesztő</h1>
		  <div id="game">
		  	  <form>
			    <input class="form-control" type="text" id="nev" placeholder="Pálya neve">
			    <p>Nehézségi szint:</p>
		  	    <select class="form-control" id="nehezseg">
				    <option value="könnyű">Könnyű</option>
				    <option value="közepes">Közepes</option>
				    <option value="nehéz">Nehéz</option>
				    <option value="kihívas">Kihívás</option>
			    </select>
			  </form>
			  <div id="board"></div>
			  <div id="items"></div>
			  <div id="bin"></div>
			  <div id="creator"></div>
		  </div>
		  <input class="btn btn-primary" type="button" id="mentes" value="Mentés">
		  <div id="message"></div>
		  <h2>Parancsok</h2>
		  <p>Bal klikk - forgatás</p>
		  <p>Jobb klikk - forgatás lezárása/feloldása</p>
		  <script type="text/javascript" src="js/ajax.js"></script>
		  <script type="text/javascript" src="js/gamecreator.js"></script>
		</main>
	</body>
</html>