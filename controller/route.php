<?php

// Controleert of een gebruiker is ingelogd en stuurt deze zo nodig terug naar index of boards
function sessionCheck(){
	if($_SESSION['start'] != true && $_SERVER['REQUEST_URI'] == "/Trello/view/boards.php"){
		header('Location: /Trello/view/index.php');
	}

	if($_SESSION['start'] == true && $_SERVER['REQUEST_URI'] == "/Trello/view/index.php"){
		header('Location: /Trello/view/boards.php');
	}
}
?>

