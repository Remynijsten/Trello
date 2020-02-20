<?php

// Controleert of een gebruiker is ingelogd en stuurt deze zo nodig terug naar de index
function sessionCheck(){
	if($_SESSION['start'] != true){
		header('Location: index.php');
	}
}


?>