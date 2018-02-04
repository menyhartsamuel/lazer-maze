<?php
  if (!defined('TOKEN'))
    exit('Közvetlenül nem elérhetõ!');
    
  if(!isset($_SESSION))
  {
    session_start();
  }

  function SetGame($id = null) {  
    if (isset($id)) {
      $_SESSION['game'] = $id;
    }
    else {
      unset($_SESSION['game']);
    }
  }
?>