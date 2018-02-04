<?php
  define('TOKEN', 'protection');
  include_once('modules/session_login.php');
  
  include_once('modules/io.php');
  include_once('modules/consts.php');
  
  $maps = load_from_file($MAPS);

  if(!IsLoggedIn()) {
	header('Location: demo.php');
    exit();
  }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő - Pályák</title>
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
			  <li><a href="index.php">Kezdőlap</a></li>
			  <li class="active"><a href="#">Pályák</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
			  <li><p class="navbar-text"><?php echo GetUser(); ?></p></li>
			  <li><a href="logout.php ">Kijelentkezés</a></li>
			</ul>
		  </div>
		</nav> 
		<main class="jumbotron jumbotron-fluid text-center">
		<h1>Pályák</h1>
		<table class="table table-striped">
			<tr>
				<th class="text-center">Név</th>
				<th class="text-center">Nehézség</th>
				<th class="text-center">Megoldók száma</th>
				<th class="text-center">Teljesítve</th>
				<?php if(GetUser() == 'admin') echo '<th></th>' ?>
			</tr>
		<?php 
			foreach($maps as $id => $map) {
				echo '<tr>
						<td><a href="game.php?id='.$id.'">'.$id.'</a></td>
						<td>'.$map['difficulty'].'</td>
						<td>'.count($map['solvers']).'</td>
						<td>'.(in_array(GetUser(), $map['solvers']) ? 'igen' : 'nem').'</td>';
				if(GetUser() == 'admin') {
					echo '<td><a href="service.php?delete='.$id.'">Törlés</a></td>';
				}
				echo '</tr>';
			}
		?>
		</table>
		<?php 
			if(GetUser() == 'admin') {
				echo '<a href="editor.php">Pályakészítő</a>';
			}
		?>
		</main>
	</body>
</html>