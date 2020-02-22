<?php
session_start();
session_destroy();
header('Location: /Trello/view/index.php');
?>