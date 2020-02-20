function showError(msg, color){
	console.log(color);
	var error = document.querySelector('.error');
	color == 'red' ? error.classList.add('w3-red') : error.classList.add('w3-green');

	document.querySelector('.error').innerHTML = msg;
	document.querySelector('.error').classList.remove('w3-hide');

	setTimeout(function(){
		document.querySelector('.error').classList.add('w3-hide');
		color == 'red' ? error.classList.remove('w3-red') : error.classList.remove('w3-green');
	}, 2000);
}
