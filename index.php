<?php 
  define('TOKEN', 'protection');
  include_once('modules/session_login.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="css/bootstrap.css" rel="stylesheet" media="screen">
	</head>
	<body class="container">
		<header class="text-center">
			<img src="img/logo.png" alt=""> 
		</header>
		<nav class="navbar navbar-default">
		  <div class="container-fluid">
			<ul class="nav navbar-nav">
			  <li class="active"><a href="#">Kezdőlap</a></li>
			  <li><a href="maps.php">Pályák</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
			<?php
			  if (IsLoggedIn()) {
				echo '<li><p class="navbar-text">'.GetUser().'</p></li>
					  <li><a href="logout.php">Kijelentkezés</a></li>';
			  } else {
				echo '<li><a href="registration.php">Regisztráció</a></li>
					  <li><a href="login.php">Bejelentkezés</a></li>';
			  }
			?>
			</ul>
		  </div>
		</nav> 
		<main class="jumbotron jumbotron-fluid">
			<h1 class="text-center">Fénytörő Fejtörő</h1>
			<h2>A játék célja</h2>
			<p>Minden egyes feladványnál rendezd el úgy a megadott objektumokat a táblán, hogy megvilágítsd a feladványban megjelölt számú célpontot.</p>
			<h2>Objektumok</h2>
			<table class="table pagination-centered">
				<tr>
					<td><img src="img/lezer.png" alt=""></td>
					<td><p><strong>Lézer</strong>: innen indul a lézersugár a nyíl irányában.</p></td>
				</tr>
				<tr>
					<td><img src="img/cel.png" alt=""> 
					<img src="img/tukor.png" alt=""></td>
					<td><p><strong>Célpont/tükör</strong>: használható célpontként, tükörként vagy egyszerre mindkettőként. Csak az objektum sötétebb háromszöggel jelzett oldala érvényes célpont. Ha piros körrel jelezve van, akkor az adott tükörnek mindenféleképpen célpontnak KELL lennie (de emellett használható tükörként is). Egyéb esetben célpontként, tükörként, vagy mindkét módon is viselkedhet.</p></td>
				</tr>
				<tr>
					<td><img src="img/felig.png" alt=""></td>
					<td><p><strong>Féligáteresztő tükör</strong>: kétfelé választja a lézersugarat. Az egyik sugár 90 fokkal megtörve halad tovább, míg a másik a tükrön keresztül egyenesen halad tovább.</p></td>
				</tr>
				<tr>
					<td><img src="img/dupla.png" alt=""></td>
					<td><p><strong>Dupla tükör</strong>: az objektum mindkét oldala 90 fokban töri meg a sugár útját.</p></td>
				</tr>
				<tr>
					<td><img src="img/ellenorzo.png" alt=""></td>
					<td><p><strong>Ellenőrzőpont</strong>: olyan objektum, amelyen a lézersugárnak mindenképpen át kell haladnia.</p></td>
				</tr>
				<tr>
					<td><img src="img/blokkolo.png" alt=""></td>
					<td><p><strong>Blokkoló</strong>: foglalja a helyet, ahol a blokkoló van, oda más objektum nem kerülhet. A lézersugár útját nem akadályozza.</p></td>
				</tr>
			</table>
			<h2>Szabályok</h2>
			<p>A feladat megoldásához a feladványban szereplő összes objektumot fel kell használni. Pontosan a feladványkártyán szereplő mennyiségű célpontot kell aktiválni. A lézersugárnak minden, a feladványban felsorolt objektumot érintenie kell legalább egyszer (kivéve a blokkolót). A feladat akkor van megoldva, ha a lézersugár a megadott mennyiségű célpontot aktiválta, és (a blokkoló kivételével) minden jelzőt érintett legalább egyszer.</p>
			<p>Néhány objektum előre fel van téve a táblára. Ezek helyét változtatni nem lehet. Forgatni akkor nem lehet, ha az objektum jobb felső sarkában egy kis lakat ikon jelenik meg. Ha nincs ott a lakat ikon, akkor az objektum 90 fokonként elforgatható.</p>
		</main>
		<script type="text/javascript" src="js/main.js"></script>
	</body>
</html>