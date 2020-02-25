document.querySelector('header button').style.display = "inline-block";
document.querySelector('.logout').addEventListener("click", function(){window.location.href="../controller/session.php"});
// document.querySelector('.board header').setAttribute("onclick", "updateCard(this)");
// document.querySelector('.board footer').addEventListener("click", addCard);
document.querySelector('.addList').setAttribute("onclick", "addList('post')");


// functie voor het toevoegen van een lijst aan de database & DOM
function addList(config="", list_id){
	// verberg alle card menus
	hideCards();

	// dynamisch toevoegen van de lijst
	var board = document.querySelector('.board');

	var list = document.createElement('div');
	list.classList.add('w3-round-xlarge', 'board', 'animated');

	var remove = document.createElement('i');
	remove.classList.add('far', 'fa-trash-alt', 'w3-display-topright', 'remove');
	remove.setAttribute('onclick', 'removeList(this)');

	var title = document.createElement('header');
	title.setAttribute('onclick', 'updateCard(this)');
	title.innerHTML = 'Untitled';

	var footer = document.createElement('footer');
	footer.setAttribute("onclick", "addCard(this, 'post')");
	footer.innerHTML = "Add a card +"

	list.appendChild(remove);
	list.appendChild(title);
	list.appendChild(footer);
	document.querySelector('.boardsContainer').insertBefore(list, document.querySelector('.addList'));

	if (config == "post"){
		// maakt een row aan voor de lijst in de database
		var ajax = new XMLHttpRequest();
		var data = 'function=create';
		ajax.open("POST", "/Trello/model/lists.php", false);

		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.send(data);
	}

	//returned de data van deze lijst en voegt deze toe als data
	var ajax = new XMLHttpRequest();
	var data = 'function=last';
	ajax.open("POST", "/Trello/model/lists.php", true);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var result = JSON.parse(ajax.responseText);

			list.setAttribute('data-id', list_id);
			list.setAttribute('data-user', result.user);
		}
	};

	ajax.send(data);
}

function readList(id){
	id = parseInt(id);

	var lists = document.querySelectorAll('.board');

	for (var i = 0 ; i< lists.length ; i++){

		if(parseInt(lists[i].getAttribute('data-id')) == id){

			return lists[i].lastChild;
			
		}
	}
}
document.addEventListener("DOMContentLoaded", function(event) {

	function loadList(){

		var cards;

		// ajax request voor het ophalen van de cards uit de database
		var ajax = new XMLHttpRequest();
		var data = 'function=read';
		ajax.open("POST", "../model/lists.php", false);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
			
			var userLists = JSON.parse(ajax.responseText);

			// ajax request voor het ophalen van de cards uit de database
			var getcards = new XMLHttpRequest();
			var data = 'function=read';
			getcards.open("POST", "../model/cards.php", false);
			getcards.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			getcards.onreadystatechange = function() {
				if (getcards.status == 200) {
					cards = JSON.parse(getcards.responseText);
				}
			};
			getcards.send(data);

				for(var i=0; i<userLists.length ; i++){
					addList("", userLists[i]['id']);
				}

				setTimeout(function(){
					for(var i=0; i<userLists.length ; i++){
						for(var x = 0 ; x < cards.length ; x++){
							if(userLists[i]['id'] == cards[x]['list_id']){

								var elem = readList(userLists[i]['id']);
									addCard(elem, "");
							}
						}
					}					
				}, 250)

			}
		};
		ajax.send(data);
	}

	loadList();
});
function removeList(e){
	// verberg alle card menus
	hideCards();
	console.log('test');
	var list = e.parentNode.parentNode;
	e.parentNode.classList.remove('tada');
	e.parentNode.classList.add('zoomOut');

	//ophalen van de data attributen die aan de lijst gekoppeld zijn bij het aanmaken
	var id = e.parentNode.getAttribute('data-id');

	// verwijder lijst uit database aan de hand van de data attributen
	var ajax = new XMLHttpRequest();
	var data = `id=${id}&function=delete`;
	ajax.open("POST", "../model/lists.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(data);

	console.log(id);

	//verwijder lijst uit DOM na de animatie
	setTimeout(function(){
		list.removeChild(e.parentNode);	
	}, 450);
}


	// console.log(readList(160));

