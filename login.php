<?php
  define('TOKEN', 'protection');
  include_once('modules/session_login.php');
  if (IsLoggedIn()) {
    header('Location: maps.php');
    exit();
  }
  
  include_once('modules/io.php');
  include_once('modules/consts.php');
  
  $errors = array();
  if ($_POST) {
    $email = trim($_POST['email']);
    $password = $_POST['password'];
    
    $users = load_from_file($USERS);
    
    if ($email == '') {
      $errors[] = 'A felhasználói név kötelező!';
    }
    if ($password == '') {
      $errors[] = 'A jelszó kötelező!';
    }
    if (!array_key_exists($email, $users)) {
      $errors[] = 'Hibás felhasználói név vagy jelszó!';
    }
    else {
      if (md5($_POST['password']) != $users[$email]['password']) {
        $errors[] = 'Hibás felhasználói név vagy jelszó!';
      }
    }
    
    if (!$errors) {
      SetUser($users[$email]['name']);
      header('Location: maps.php');
    }
  }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő - Bejelentkezés</title>
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
			  <li><a href="maps.php">Pályák</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
			  <li><a href="registration.php">Regisztráció</a></li>
			  <li class="active"><a href="#">Bejelentkezés</a></li>
			</ul>
		  </div>
		</nav> 
		<main class="jumbotron jumbotron-fluid text-center">
			<h1>Bejelentkezés</h1>
			<ul>
			<?php foreach ($errors as $error) : ?>
			  <li><?= $error; ?></li>
			<?php endforeach;?>
			</ul>
			<form action="" method="post">
			  <table class="table" >
				<tr class="row">
				  <td class="col-sm-1">E-mail:</td>
				  <td class="col-sm-3"><input class="form-control" type="text" name="email"></td>
				</tr>
				<tr class="row">
				  <td class="col-sm-1">Jelszó:</td>
				  <td class="col-sm-3"><input class="form-control" type="password" name="jelszo"></td>
				<tr class="row">
				  <td class="col-sm-4" colspan = 2><input class="btn btn-default" type="submit" value="Belépés"></td>
				</tr>
			  </table>
			</form>
		</main>
	</body>
</html>