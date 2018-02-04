<?php
  function load_from_file($filename, $default = array()) {
    $s = @file_get_contents($filename);
    return ($s === false ? $default : json_decode($s, true));
  }

  function save_to_file($filename, $data) {
    $s = json_encode($data);
    return file_put_contents($filename, $s, LOCK_EX);
  }
?>