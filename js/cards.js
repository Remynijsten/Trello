

function addCard(e){
	// check of het maximale aantal cards is bereikt
	var childCount = 0;

	for(i = 0; i < e.parentNode.childNodes.length ; i++){
		if (e.parentNode.childNodes[i].classList.contains('cardWrapper')){
			childCount++;
		}
	}

	if(childCount >= 13){
		e.classList.add('animated', 'shake');

		setTimeout(function(){
			e.classList.remove('animated', 'shake');
		}, 500);
	}else{
		// Dynamisch aanmaken van een card wrapper met inhoud
		var board = e.parentNode;
		var footer = e.parentNode.lastChild;

		var container  = document.createElement('div');
		container.classList.add('cardWrapper');

		var input = document.createElement('div');
		input.classList.add('card', 'animated', 'bounceInDown');

		var list = document.createElement('ul');
		list.style.listStyle = "none";
		list.classList.add('animated', 'bounceInLeft', 'w3-hide', 'cardMenu');

		var remove = document.createElement('li');
		remove.setAttribute('onclick', 'deleteCard(this)');
		remove.innerText = "Remove Card";

		var openmenu = document.createElement('li');
		openmenu.innerText = "Open Menu";

		list.appendChild(remove);
		list.appendChild(openmenu);

		var menu = document.createElement('i');
		menu.classList.add('fas', 'fa-ellipsis-h', 'menudots');
		menu.setAttribute("onclick", "openCardMenu(this)");
		input.setAttribute('onclick', 'updateCard(this)');

		board.insertBefore(container, footer);
		container.appendChild(input);
		container.appendChild(menu);
		container.appendChild(list);
	}
}

function readCard(){

}

function updateCard(e){
	var initName = e.innerText;
	var tagname = e.tagName;
	var board = e.parentNode;
	var elem = e;

	var input = document.createElement('input');
	input.classList.add('headerInput');

	board.insertBefore(input, e.nextSibling);
	input.focus();

	var card = document.querySelector('.board .card');
	board.removeChild(e);

	document.querySelector('.board input').addEventListener("keyup", function(){
		if (event.keyCode === 13) {
			var name = input.value;
			

			var header = document.createElement(tagname);
			tagname == "HEADER" ? "" : header.classList.add('headerInput');


			
			var txt = document.createTextNode(name);
			input.value.length == 0 ? header.innerHTML = initName : txt.innerHTML = name;

			// header.setAttribute("onclick", "updateCard(this)");

			if (tagname != "HEADER"){
				header.setAttribute('onclick', 'updateCard(this)');
			}else{
				header.setAttribute('onclick', 'updateCard(this)');
			}

			header.appendChild(txt);
			board.insertBefore(header, input);
			board.removeChild(input);
		}		
	});
}

function deleteCard(e){
	hideCards();



	e.parentNode.parentNode.classList.remove('bounceInDown');
	e.parentNode.parentNode.classList.add('animated', 'zoomOut');

		setTimeout(function(){
		e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
	}, 500);
}




















// functie voor het verwijderen van de hide class van het card menu en het opschuiven van het volgende element
function openCardMenu(e){
	// sluit alle card menus
	hideCards();

	e.parentNode.lastChild.classList.remove('w3-hide');
	e.parentElement.parentElement.nextElementSibling.style.marginLeft = "12.5em";
}

// functie voor het sluiten van alle card menus die open staan
function hideCards(){
	for(i=0; i < document.getElementsByClassName('cardMenu').length ; i++ ){
		if(document.getElementsByClassName('cardMenu')[i].classList.contains('w3-hide') != true){ 
			document.getElementsByClassName('cardMenu')[i].classList.add('w3-hide');

			var nextItem = document.getElementsByClassName('cardMenu')[i].parentElement.parentElement.nextElementSibling;
			nextItem.tagName != "BUTTON" ? nextItem.style.marginLeft = "1em" : nextItem.style.marginLeft = "1em";
		}
	}
}