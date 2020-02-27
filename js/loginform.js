document.addEventListener("DOMContentLoaded", function(event) {

	// IIFE
	document.querySelectorAll('form p')[0].addEventListener("click", logSwitch);
	document.querySelectorAll('form p')[1].addEventListener("click", logSwitch);
	var spinner = document.getElementById('spinner');
	document.querySelector('form input').style.display = "none";

	// Styling voor het weergeven/verbergen van de name input
	setTimeout(function(){
		document.querySelector('.userForm').classList.remove('w3-hide');
		document.querySelector('.userForm').classList.add('w3-animate-left');
	}, 500);

	function logSwitch(){
		this.classList.toggle('selected');

		// Als het eerste element aangeklikt word, heeft deze geen vorige en weet je de index. Vervolgens kan je aan de hand van de index de toggle switchen
		if(this.previousElementSibling != null){
			this.previousElementSibling.classList.toggle('selected');
			document.querySelector('form button').innerHTML = "REGISTER";
			document.querySelector('form input').style.display = "block";
			document.querySelector('.loginFormFunction').value = "check";
		}else{
			this.nextElementSibling.classList.toggle('selected');
			document.querySelector('form button').innerHTML = "LOGIN";
			document.querySelector('form input').style.display = "none";
			document.querySelector('.loginFormFunction').value = "login";
		}	
	};

	// Opvangen van de login form submit
	document.querySelector('.userForm').addEventListener('submit', function(e){

		e.preventDefault();

		switch(document.querySelector('.loginFormFunction').value){
			case 'check':
				var data = new FormData(document.querySelector('.userForm'));
				var ajax = new XMLHttpRequest();
				ajax.open("POST", "../model/users.php", false);
				ajax.send(data);
				var response = ajax.responseText;
				console.log(response);

				if(response > 0){
					showError("Mail is already used", 'red');
				break;

				}
				else{
					document.querySelector('.loginFormFunction').value = "create";
				}

			case 'create':
				var data = new FormData(document.querySelector('.userForm'));
				var ajax = new XMLHttpRequest();
				ajax.open("POST", "../model/users.php", false);
				ajax.send(data);
				var response = ajax.responseText;
				if(response == 'success'){
					showError("Account successfully created!", 'green');

					document.querySelector('.loginFormFunction').value = "check";

					setTimeout(function(){
						window.location.href = "boards.php";
					}, 1000);
				}
			break;

			case 'login':
				var data = new FormData(document.querySelector('.userForm'));
				var ajax = new XMLHttpRequest();
				ajax.open("POST", "../model/users.php", false);
				ajax.send(data);
				var response = ajax.responseText;
				switch(response){
					case 'wrong mail':
						showError("Can't find a user with that mail :(", "red");
					break;

					case 'wrong password':
						showError("You've entered the wrong password", "red");
					break;

					case 'success':
						showError("Logging in...", "green");
						spinner.classList.remove('w3-hide');

						setTimeout(function(){
							spinner.classList.add('w3-hide');
							window.location.href = "boards.php";
						}, 2000);
					break;
				}
			break;
		}
	});
});