<!DOCTYPE html>
<html>
	<head>
		<title>Trello</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="../css/animations.css">
		<link rel="stylesheet" type="text/css" href="../css/global.css">
		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,700&display=swap" rel="stylesheet">
	</head>
	<body>

		<?php 
		
		@include '../build/header.php';
		@include '../build/loginform.php';
		?>

		<script type="text/javascript" src="../js/script.js"></script>
		<script type="text/javascript" src="../js/loginform.js"></script>
		
		<script src="https://kit.fontawesome.com/970adb2e15.js" crossorigin="anonymous"></script>
	</body>
</html>

<?php
	include '../controller/route.php';
	sessionCheck();
?>