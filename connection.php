<?php  

	$dsn = "mysql:host=localhost;dbname=Trello";
	$user = "root";
	$passwd = "";

	// Server connection
	$conn = new PDO($dsn, $user, $passwd);
	
?>