document.querySelector('header button').style.display = "inline-block";
document.querySelector('.logout').addEventListener("click", function(){window.location.href="../controller/session.php"});
// document.querySelector('.board header').setAttribute("onclick", "updateCard(this)");
// document.querySelector('.board footer').addEventListener("click", addCard);
document.querySelector('.addList').addEventListener("click", addList);


// functie voor het toevoegen van een lijst aan de database & DOM
function addList(){
	// verberg alle card menus
	hideCards();

	// dynamisch toevoegen van de lijst
	var board = document.querySelector('.board');

	var list = document.createElement('div');
	list.classList.add('w3-round-xlarge', 'board', 'animated','tada');

	var remove = document.createElement('i');
	remove.classList.add('far', 'fa-trash-alt', 'w3-display-topright', 'remove');
	remove.setAttribute('onclick', 'removeList(this)');

	var title = document.createElement('header');
	title.setAttribute('onclick', 'updateCard(this)');
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

function removeList(e){
	// verberg alle card menus
	hideCards();

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