<?php  

session_start();

include 'connection.php';

switch($_POST['function']){
	case "create":
		createCard($_POST);
	break;

	case "read":
		readCard();
	break;

	case "update":
		updateCard($_POST);
	break;

	case "delete":
		deleteCard($_POST);
	break;

	case "last":
		returnLast();
	break;
}


function createCard($data){
	global $conn;

	$stmt = $conn->prepare("INSERT INTO `cards` (list_id) VALUES (:id)");
	$stmt->bindParam(':id', $data['list_id']);
	$stmt->execute();
}

function readCard(){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM `cards`");
	$stmt->execute();
	$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	print_r(json_encode($result));
}

function updateCard($data){
	global $conn;

	$stmt = $conn->prepare("UPDATE `cards` SET description=:description WHERE id=:id");
	$stmt->bindParam(':description', $data['description']);
	$stmt->bindParam(':id', $data['id']);
	$stmt->execute();
}

function deleteCard($data){
	global $conn;

	$id = $data['id'];

	$stmt = $conn->prepare("DELETE FROM `cards` WHERE id=:id");
	$stmt->bindParam(':id', $id);
	$stmt->execute();
}

function returnLast(){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM cards ORDER BY id DESC LIMIT 1");
	$stmt->execute();
	$result = $stmt->fetch(PDO::FETCH_ASSOC);

	print_r(json_encode($result));
}

?>