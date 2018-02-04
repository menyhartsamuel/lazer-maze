<?php
  define('TOKEN', 'protection');
  include('modules/session_login.php');
  SetUser();
  header('Location: index.php');
?>