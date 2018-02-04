<?php
  define('TOKEN', 'protection');
  include_once('modules/session_login.php');
  if (IsLoggedIn()) {
    header('Location: index.php');
    exit();
  }
  
  include_once('modules/consts.php');
  include_once('modules/io.php');

  $name = "";
  $email = ""; 
  
  $errors = array();
  if ($_POST) {
    $name = trim($_POST['username']);
    $password = $_POST['password'];
    $password2 = $_POST['password2'];
    $email = trim($_POST['email']);
    
    $users = load_from_file($USERS);
    
    if ($name == '') {
      $errors[] = 'A felhasználói név kötelező!';
    }
    if ($password == '') {
      $errors[] = 'A jelszó kötelező!';
    }
    if ($password != $password2) {
      $errors[] = 'A jelszavak nem egyeznek!';
    }
    if ($email == '') {
      $errors[] = 'Az e-mail cím kötelező!';
    } 
	else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $errors[] = 'Valós e-mail címet adj meg!';
    }
    if (in_array($name, array_column($users, 'name'))) {
      $errors[] = 'Már létezik ilyen felhasználói név!';
    }
	if ($users && array_key_exists($email, $users)) {
      $errors[] = 'Ezzel az e-mailcímmel már regisztráltak!';
    }
    if (!$errors) {
      $users[$email] = array(
	    'name'    	=> $name,
        'password'  	=> md5($password)
      );
      save_to_file($USERS, $users);
    }
  }
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Fénytörő fejtörő - Regisztráció</title>
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
			  <li class="active"><a href="#">Regisztráció</a></li>
			  <li><a href="login.php">Bejelentkezés</a></li>
			</ul>
		  </div>
		</nav> 
		<main class="jumbotron jumbotron-fluid text-center">
			<h1>Regisztráció</h1>
			<ul>
			<?php foreach ($errors as $error) : ?>
			  <li><?= $error; ?></li>
			<?php endforeach;?>
			</ul>
			<form action="" method="post">
			  <table class="table">
				<tr class="row">
				  <td class="col-sm-2">Felhasználói név:</td>
				  <td class="col-sm-3"><input class="form-control" type="text" name="username" placeholder="Név"></td>
				</tr>
				<tr class="row">
				  <td class="col-sm-2">Jelszó:</td>
				  <td class="col-sm-3"><input class="form-control" type="password" name="password"></td>
				</tr>
				<tr class="row">
				  <td class="col-sm-2">Jelszó még egyszer:</td>
				  <td class="col-sm-3"><input class="form-control" type="password" name="password2"></td>
				</tr>
				<tr class="row">
				  <td class="col-sm-2">E-mail cím:</td>
				  <td class="col-sm-3"><input class="form-control" type="text" name="email" placeholder="example@domain.com"></td>
				</tr>
				<tr class="row">
				  <td class="col-sm-5" colspan = 2><input class="btn btn-default" type="submit" value="Regisztráció"></td>
				</tr>
			  </table>
			</form>
			<?php if ($_POST && !$errors) : ?>
			  <b>Sikeres regisztráció</b><br>
			<?php endif; ?>
		</main>
	</body>
</html>