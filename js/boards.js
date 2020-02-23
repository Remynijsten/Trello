document.querySelector('header button').style.display = "inline-block";
document.querySelector('.logout').addEventListener("click", function(){window.location.href="../controller/session.php"});
// document.querySelector('.board header').setAttribute("onclick", "changeText(this)");
// document.querySelector('.board footer').addEventListener("click", addCard);
document.querySelector('.addList').addEventListener("click", addList);


// functie voor het toevoegen van een lijst aan de database & DOM
function addList(){
	// verberg alle card menus
	for(i=0; i < document.getElementsByClassName('cardMenu').length ; i++ ){
		if(document.getElementsByClassName('cardMenu')[i].classList.contains('w3-hide') != true){ 
			document.getElementsByClassName('cardMenu')[i].classList.add('w3-hide');

			var nextItem = document.getElementsByClassName('cardMenu')[i].parentElement.parentElement.nextElementSibling;
			nextItem.tagName != "BUTTON" ? nextItem.style.marginLeft = "1em" : nextItem.style.marginLeft = "1em";
		}
	}

	// dynamisch toevoegen van de lijst
	var board = document.querySelector('.board');

	var list = document.createElement('div');
	list.classList.add('w3-round-xlarge', 'board', 'animated','tada');

	var remove = document.createElement('i');
	remove.classList.add('far', 'fa-trash-alt', 'w3-display-topright', 'remove');
	remove.setAttribute('onclick', 'removeList(this)');

	var title = document.createElement('header');
	title.setAttribute('onclick', 'changeText(this)');
	title.innerHTML = 'Untitled';

	var footer = document.createElement('footer');
	footer.setAttribute("onclick", "addCard(this)");
	footer.innerHTML = "Add a card +"

	list.appendChild(remove);
	list.appendChild(title);
	list.appendChild(footer);
	document.querySelector('.boardsContainer').insertBefore(list, document.querySelector('.addList'));

	// maakt een row aan voor de lijst in de database
	var ajax = new XMLHttpRequest();
	var data = 'function=create';
	ajax.open("POST", "/Trello/model/lists.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(data);

	//returned de data van deze lijst en voegt deze toe als data
	var ajax = new XMLHttpRequest();
	var data = 'function=last';
	ajax.open("POST", "/Trello/model/lists.php", true);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var result = JSON.parse(ajax.responseText);

			list.setAttribute('data-id', result.id);
			list.setAttribute('data-user', result.user);
		}
	};
	ajax.send(data);
}

function readList(){
	var ajax = new XMLHttpRequest();
	var data = 'function=create';
	ajax.open("POST", "/Trello/model/lists.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log(ajax.responseText);
		}
	};
	ajax.send(data);
}

function changeText(e){
	var initName = e.innerText;
	var tagname = e.tagName;
	var board = e.parentNode;
	var elem = e;

	console.log(board);

	var input = document.createElement('input');
	input.classList.add('card');

	board.insertBefore(input, e.nextSibling);
	input.focus();

	var card = document.querySelector('.board .card');
	board.removeChild(e);

	document.querySelector('.board input').addEventListener("keyup", function(){
		if (event.keyCode === 13) {
			var name = input.value;
			

			var header = document.createElement(tagname);
			tagname == "HEADER" ? "" : header.classList.add('card');


			
			var txt = document.createTextNode(name);
			console.log(e.innerText, input.value);
			input.value.length == 0 ? header.innerHTML = initName : txt.innerHTML = name;

			// header.setAttribute("onclick", "changeText(this)");

			if (tagname != "HEADER"){
				header.setAttribute('onclick', 'changeText(this)');
			}else{
				header.setAttribute('onclick', 'changeText(this)');
			}

			header.appendChild(txt);
			board.insertBefore(header, input);
			board.removeChild(input);
		}		
	});
}

function addCard(e){
	// check of het maximale aantal cards is bereikt
	console.log(e.parentNode.lastChild);



	var board = e.parentNode;
	var footer = e.parentNode.lastChild;

	var container  = document.createElement('div');
	container.classList.add('cardWrapper');

	var input = document.createElement('div');
	input.classList.add('card');

	var list = document.createElement('ul');
	list.style.listStyle = "none";
	list.classList.add('animated', 'bounceInLeft', 'w3-hide', 'cardMenu');

	var remove = document.createElement('li');
	remove.innerText = "Remove Card";

	var openmenu = document.createElement('li');
	openmenu.innerText = "Open Menu";

	list.appendChild(remove);
	list.appendChild(openmenu);

	var menu = document.createElement('i');
	menu.classList.add('fas', 'fa-ellipsis-h', 'menudots');
	menu.setAttribute("onclick", "openCardMenu(this)");
	input.setAttribute('onclick', 'changeText(this)');

	board.insertBefore(container, footer);
	container.appendChild(input);
	container.appendChild(menu);
	container.appendChild(list);
}

function removeList(e){
	// verberg alle card menus
	for(i=0; i < document.getElementsByClassName('cardMenu').length ; i++ ){
		if(document.getElementsByClassName('cardMenu')[i].classList.contains('w3-hide') != true){ 
			document.getElementsByClassName('cardMenu')[i].classList.add('w3-hide');

			var nextItem = document.getElementsByClassName('cardMenu')[i].parentElement.parentElement.nextElementSibling;
			nextItem.tagName != "BUTTON" ? nextItem.style.marginLeft = "1em" : nextItem.style.marginLeft = "1em";
		}
	}

	var list = e.parentNode.parentNode;
	e.parentNode.classList.remove('tada');
	e.parentNode.classList.add('zoomOut');

	//ophalen van de data attributen die aan de lijst gekoppeld zijn bij het aanmaken
	var id = e.parentNode.getAttribute('data-id');
	var user = e.parentNode.getAttribute('data-user');

	// verwijder lijst uit database aan de hand van de data attributen
	var ajax = new XMLHttpRequest();
	var data = `id=${id}&user=${user}&function=delete`;
	ajax.open("POST", "/Trello/model/lists.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(data);

	//verwijder lijst uit DOM na de animatie
	setTimeout(function(){
		list.removeChild(e.parentNode);	
	}, 450);
}

function openCardMenu(e){
	// verberg alle card menus
	for(i=0; i < document.getElementsByClassName('cardMenu').length ; i++ ){
		if(document.getElementsByClassName('cardMenu')[i].classList.contains('w3-hide') != true){ 
			document.getElementsByClassName('cardMenu')[i].classList.add('w3-hide');

			var nextItem = document.getElementsByClassName('cardMenu')[i].parentElement.parentElement.nextElementSibling;
			nextItem.tagName != "BUTTON" ? nextItem.style.marginLeft = "1em" : nextItem.style.marginLeft = "1em";
		}
	}
	e.parentNode.lastChild.classList.remove('w3-hide');
	e.parentElement.parentElement.nextElementSibling.style.marginLeft = "12.5em";
}