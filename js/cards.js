<<<<<<< HEAD
var colorcode = ["w3-green", "w3-yellow", "w3-orange", "w3-red", "w3-purple"];
var timer = 50;

function addCard(e, config, description, card_id, status){

=======
function addCard(e, config){

>>>>>>> master
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

		var label = document.createElement('div');
		setTimeout(function(){
			label.classList.add('label','animated','fadeIn', colorcode[status]);
		}, 500+timer);

		timer = +timer + 100;
		

		var input = document.createElement('div');
		input.classList.add('card', 'animated', 'bounceInDown');
		input.innerText = description;

		var list = document.createElement('ul');
		list.style.listStyle = "none";
		list.classList.add('animated', 'bounceInLeft', 'w3-hide', 'cardMenu');

		var remove = document.createElement('li');
		remove.setAttribute('onclick', 'deleteCard(this)');
		remove.innerText = "Remove Card";

<<<<<<< HEAD
		var colorContainer = document.createElement('div');



		for(i=0;i<5;i++){
			var color = document.createElement('span');
			color.classList.add('w3-badge', colorcode[i]);
			color.style.display = "inline-block";
			color.style.width = "5px";
			color.style.height = "15px";
			color.style.margin = "0 1px";

			var index = colorcode.indexOf(colorcode[i]);

			color.setAttribute("onclick", `changeStatus(this)`);
			colorContainer.appendChild(color);
		}

		var close = document.createElement('i');
		close.setAttribute('onclick', 'hideCards()');
		close.classList.add('fas', 'fa-angle-left', 'closeSubmenu', 'animated', 'pulse', 'infinite');
=======
		var openmenu = document.createElement('li');
		openmenu.setAttribute('onclick', 'cardModal(this)');
		openmenu.innerText = "Open Menu";
>>>>>>> master

		var close = document.createElement('i');
		close.setAttribute('onclick', 'hideCards()');
		close.classList.add('fas', 'fa-angle-left', 'closeSubmenu', 'animated', 'pulse', 'infinite');

		list.appendChild(remove);
<<<<<<< HEAD
		list.appendChild(colorContainer);
		list.appendChild(close);

=======
		list.appendChild(openmenu);
		list.appendChild(close);
>>>>>>> master

		var menu = document.createElement('i');
		menu.classList.add('fas', 'fa-ellipsis-h', 'menudots');
		menu.setAttribute("onclick", "openCardMenu(this)");
		input.setAttribute('onclick', 'updateCard(this)');

		board.insertBefore(container, footer);
		container.appendChild(label);
		container.appendChild(input);
		container.appendChild(menu);
		
		container.appendChild(list);

		if(config == 'post'){
			// maakt een row aan voor de card in de database
			var ajax = new XMLHttpRequest();

			var list_id = e.parentNode.getAttribute('data-id');
			
			var data = `list_id=${list_id}&function=create`;
			ajax.open("POST", "../model/cards.php", false);

			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
<<<<<<< HEAD
			ajax.send(data);

			//returned de data van deze lijst en voegt deze toe als data
			var ajax = new XMLHttpRequest();
			var data = 'function=last';
			ajax.open("POST", "/Trello/model/cards.php", true);

			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var result = JSON.parse(ajax.responseText);
					container.setAttribute('data-id', result.id);
				}
			};
			ajax.send(data);
		}
		else{
			container.setAttribute('data-id', card_id);
		}
=======
			ajax.send(data);			
		}

		//returned de data van deze lijst en voegt deze toe als data
		var ajax = new XMLHttpRequest();
		var data = 'function=last';
		ajax.open("POST", "/Trello/model/cards.php", true);

		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var result = JSON.parse(ajax.responseText);
				container.setAttribute('data-id', result.id);
			}
		};
		ajax.send(data);
>>>>>>> master
	}
}

function readCard(){
<<<<<<< HEAD
=======


>>>>>>> master
}

function updateCard(e){
	openCardMenu(e);
	var initName = e.innerText;
	var tagname = e.tagName;
	var board = e.parentNode;
	var elem = e;

	var input = document.createElement('textarea');
	input.classList.add('headerInput');

	board.insertBefore(input, e.nextSibling);
	input.focus();

	var card = document.querySelector('.board .card');
	board.removeChild(e);

	input.addEventListener("keyup", function(){
		if (event.keyCode === 13) {
			hideCards();
			var name = input.value;
			var header = document.createElement(tagname);
			header.classList.add('card');

			header.setAttribute("onclick", "updateCard(this)");
			
			var txt = document.createTextNode(name);
<<<<<<< HEAD
			input.value.length == 1 ? header.innerHTML = initName : txt.innerHTML = name;
=======
			input.value.length == 0 ? header.innerHTML = initName : txt.innerHTML = name;
>>>>>>> master

			header.appendChild(txt);
			board.insertBefore(header, input);
			board.removeChild(input);

			var ajax = new XMLHttpRequest();

			var status = "";

			var description = header.innerHTML;
			var id = board.getAttribute('data-id')
			
			var data = `description=${description}&id=${id}&function=update`;
			ajax.open("POST", "../model/cards.php", false);

			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajax.send(data);
		}		
	});
}

function deleteCard(e){
	hideCards();

	var id = e.parentNode.parentNode.getAttribute('data-id');

	// verwijder card uit database aan de hand van de data attributen
	var ajax = new XMLHttpRequest();
	var data = `id=${id}&function=delete`;
	ajax.open("POST", "../model/cards.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(data);

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
<<<<<<< HEAD

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

function changeStatus(color){

	var elem = color.parentNode.parentNode.parentNode.firstChild;
	var id = color.parentNode.parentNode.parentNode.getAttribute('data-id');

	console.log(id);

	for(i=0;i<elem.classList.length;i++){
		elem.classList.remove(elem.classList[1]);
	}

	color.parentNode.parentNode.parentNode.firstChild.classList.add(color.classList[1]);

	var status = colorcode.indexOf(color.classList[1]);

	//post de status naar de db
	var ajax = new XMLHttpRequest();
	var data = `function=status&status=${status}&id=${id}`;
	ajax.open("POST", "/Trello/model/cards.php", true);
	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(data);











=======
>>>>>>> master

}

