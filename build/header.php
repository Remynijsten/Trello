<?php
	session_start();
	isset($_SESSION['name']) ? $name = $_SESSION['name'] : $name = "Guest";
?>

<header class="navBar">
	<img src="img/logo.png" alt="header logo">
	<p>Welcome <? echo $name ?></p>

	<button class="logout">Log out</button>
</header>

