function showError(msg, color){
	var error = document.querySelector('.error');
	color == 'red' ? error.classList.add('w3-red') : error.classList.add('w3-green');

	document.querySelector('.errorMSG').innerText = msg;
	msg == "Logging in..." ? "" : document.querySelector('.error').classList.add('shake');


	document.querySelector('.error').classList.remove('w3-hide');
		
	

	setTimeout(function(){
		document.querySelector('.error').classList.add('w3-hide');

		msg != "Logging in..." ? document.querySelector('.error').classList.remove('shake') : "" ;

		color == 'red' ? error.classList.remove('w3-red') : error.classList.remove('w3-green');
	}, 2000);
}

