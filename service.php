<?php
  define('TOKEN', 'protection');
 
  include_once('modules/io.php');
  include_once('modules/consts.php'); 
  include_once('modules/session_login.php');
  include_once('modules/session_game.php');
   
  $maps = load_from_file($MAPS);
  
  if(isset($_SESSION['game'])) {
	  $id = $_SESSION['game'];
	  if(array_key_exists($id, $maps)) {
		$map = $maps[$id];
		$leaderboard = $map['solvers'];
	  }
  }
    
  if($_GET) {
	  if(isset($_GET['map'])) {
		  if(isset($map))
			echo json_encode($map);
	  }
	  
	  if(isset($_GET['leaderboard'])) {
		  if(isset($leaderboard))
			echo json_encode($leaderboard);
	  }
	  
	  if(isset($_GET['delete'])) {
		  if(GetUser() == 'admin') {
			  unset($maps[$_GET['delete']]);
			  save_to_file($MAPS, $maps);
			  header('Location: maps.php');
		  }
	  }
  }
  
  if($_POST) {
	  if(isset($_POST['solved'])) {
		  if(!in_array(GetUser(), $leaderboard)) {
			$maps[$id]['solvers'][] = GetUser();
			save_to_file($MAPS, $maps);
		  }
	  }
	  
	  if(isset($_POST['unset'])) {
		  SetGame();
	  }
	  
	  if(isset($_POST['newmap'])) {
		  $map = json_decode($_POST['newmap']);
		  $name = key($map);
		  $map = reset($map);
		  $maps[$name] = $map;
		  save_to_file($MAPS, $maps);
	  }
  }
?>