<?php  
session_start();
include 'connection.php';

$name = $_POST['name'];
$mail = $_POST['mail'];
$password = $_POST['password'];

switch($_POST['function']){
	case 'create':
		createUser($_POST);
		$_SESSION['start'] = true;
		$_SESSION['name'] = $_POST['name'];
		$_SESSION['mail'] = $_POST['mail'];
	break;

	case 'read':
		readUser($_POST);
	break;

	case 'update':
		updateUser($_POST);
	break;

	case 'delete':
		deleteUser($_POST);
	break;

	case 'check':
		checkExist($_POST);
	break;

	case 'login':
		loginUser($_POST);
	break;
}


function checkExist($data){
	global $conn;
	
	$stmt = $conn->prepare("SELECT * FROM `users` WHERE mail=:mail");
	$stmt->bindParam(':mail', $data['mail']);
	$stmt->execute();
	$count= $stmt->rowCount();
	print_r($count);
}

function createUser($data){

	global $conn;
	
	$stmt = $conn->prepare("INSERT INTO `users` (name, mail, password) VALUES (:name, :mail, :password)");
	$stmt->bindParam(':name', $data['name']);
	$stmt->bindParam(':mail', $data['mail']);
	$stmt->bindParam(':password', $data['password']);
	$stmt->execute();
	echo 'success';
}

function readUser($data){
}

function updateUser($data){
}

function deleteUser($data){
}

function loginUser($data){

	global $conn;

	$stmt = $conn->prepare("SELECT * FROM `users` WHERE mail=:mail");
	$stmt->bindParam(':mail', $data['mail']);
	$stmt->execute();
	$count= $stmt->rowCount();

	if($count == 0){
		echo 'wrong mail';
	}

	else if($count > 0){
		$result = $stmt->fetch(PDO::FETCH_ASSOC);

		if($_POST['password'] == $result['password']){
			echo 'success';
			$_SESSION['start'] = true;
			$_SESSION['name'] = $result['name'];
			$_SESSION['mail'] = $result['mail'];
		}
		else{
			echo 'wrong password';
		}
	}
}

?>