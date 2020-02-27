document.querySelector('header button').style.display = "inline-block";
document.querySelector('.logout').addEventListener("click", function(){window.location.href="../controller/session.php"});
document.querySelector('.addList').setAttribute("onclick", "addList('post')");
document.querySelector('.sortText').setAttribute("onclick", 'showSortMenu()');




// functie voor het toevoegen van een lijst aan de database & DOM
function addList(config, list_id, listTitle){
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
	title.setAttribute('onclick', 'updateList(this)');
	title.innerHTML = listTitle;

	var footer = document.createElement('footer');
	footer.setAttribute("onclick", "addCard(this, 'post', '')");
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
	ajax.open("POST", "/Trello/model/lists.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var result = JSON.parse(ajax.responseText);


			config == 'post' ? list.setAttribute('data-id', result.id) : list.setAttribute('data-id', list_id);
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

function loadList(filter, color){

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
		var data = `function=read&filter=${filter}&status=${color}`;
		getcards.open("POST", "../model/cards.php", false);
		getcards.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		getcards.onreadystatechange = function() {
			if (getcards.status == 200) {
				cards = JSON.parse(getcards.responseText);
			}
		};
		getcards.send(data);

			// inladen van de lijsten wanneer de pagina laad
			for(var i=0; i<userLists.length ; i++){
				addList("", userLists[i]['id'], userLists[i]['name']);
			}

			// inladen van de cards wanneer lijsten geladen zijn
			setTimeout(function(){
				for(var i=0; i<userLists.length ; i++){
					for(var x = 0 ; x < cards.length ; x++){
						if(userLists[i]['id'] == cards[x]['list_id']){
							var elem = readList(userLists[i]['id']);
								addCard(elem, "", cards[x]['description'], cards[x]['id'], parseInt(cards[x]['status']));
						}
					}
				}					
			}, 250)

		}
	};
	ajax.send(data);
}

loadList("all", 0);

function updateList(e){
	var title = e.innerText;
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
			header.classList.add('card');

			header.setAttribute("onclick", "updateList(this)");
			
			var txt = document.createTextNode(name);
			input.value.length == 0 ? header.innerHTML = title : txt.innerHTML = name;

			header.appendChild(txt);
			board.insertBefore(header, input);
			board.removeChild(input);

			var id = board.getAttribute('data-id');

			// update list title in database
			var ajax = new XMLHttpRequest();
			var data = `id=${id}&description=${name}&function=update`;
			ajax.open("POST", "../model/lists.php", false);
			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			ajax.onreadystatechange = function() {
				console.log(ajax.responseText);
			};

			ajax.send(data);
		}		
	});
}


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

	// verwijder cards die in de lisjt stonden
	var ajax = new XMLHttpRequest();
	var data = `id=${id}&function=deleteList`;
	ajax.open("POST", "../model/cards.php", false);

	ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	ajax.send(data);

	//verwijder lijst uit DOM na de animatie
	setTimeout(function(){
		list.removeChild(e.parentNode);	
	}, 450);
}



function showSortMenu(){
	document.querySelector('.sortMenu').classList.toggle('w3-hide');
	document.querySelector('.colors').classList.add('w3-hide');
	document.querySelector('.sortMenu').classList.contains('w3-hide') ? 
		document.querySelector('.boardsContainer').style.marginTop = "0em" : 
		document.querySelector('.boardsContainer').style.marginTop = "5em" ;
}

function filterList(config, color){
	var boards = document.getElementsByClassName('board');

	while(boards.length){
		boards[0].parentNode.removeChild(boards[0]);
	}

	loadList(config, color);
}

sort.onclick = function(){
	filterList("sort", "0");
	document.querySelector('.colors').classList.add('w3-hide');
	filter.style.borderBottom = "0px solid black";
	sort.style.borderBottom = "1px solid black";
}

filter.onclick = function(){
	document.querySelector('.colors').classList.remove('w3-hide');
	filter.style.borderBottom = "1px solid black";
	sort.style.borderBottom = "0px solid black";
}

for (var i = 0 ; i < 5 ; i++){
	document.querySelectorAll(".colors span")[i].setAttribute("onclick", `filterList('filter', ${i})`);
}