<?php  

session_start();
include 'connection.php';

switch($_POST['function']){
	case "create":
		createList($_POST);
	break;

	case "read":
		readList($_POST);
	break;

	case "delete":
		deleteList($_POST);
	break;

	case "last":
		returnLast();
	break;
}


function createList($data){
	global $conn;

	$title = "Untitled";
	

	$stmt = $conn->prepare("SELECT id FROM `users` WHERE name = :name");
	$stmt->bindParam(':name', $_SESSION['name']);
	$stmt->execute();
	$user = $stmt->fetch(PDO::FETCH_ASSOC);


	$stmt = $conn->prepare("INSERT INTO `lists` (name, user) VALUES (:name, :user)");
	$stmt->bindParam(':name', $title);
	$stmt->bindParam(':user', $user['id']);
	$stmt->execute();

}

function readList(){
	global $conn;

	$id = $_SESSION['id'];

	$stmt = $conn->prepare("SELECT * FROM `lists` WHERE user = :id");
	$stmt->bindParam(':id', $id);
	$stmt->execute();
	$result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
	print_r(json_encode($result));
}

function updateList(){

}

function deleteList($data){
	global $conn;

	$id = $data['id'];

	$stmt = $conn->prepare("DELETE FROM `lists` WHERE id=:id");
	$stmt->bindParam(':id', $id);
	$stmt->execute();
}

function returnLast(){
	global $conn;

	$stmt = $conn->prepare("SELECT * FROM lists ORDER BY id DESC LIMIT 1");
	$stmt->execute();
	$result = $stmt->fetch(PDO::FETCH_ASSOC);

	print_r(json_encode($result));
}





















?>