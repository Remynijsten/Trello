document.querySelector('header button').style.display = "inline-block";
document.querySelector('.logout').addEventListener("click", function(){window.location.href="session.php"});
// document.querySelector('.board header').setAttribute("onclick", "changeText(this)");
// document.querySelector('.board footer').addEventListener("click", addCard);
document.querySelector('.addList').addEventListener("click", addList);

function changeText(e){
	var initName = e.innerText;
	var tagname = e.tagName;
	var board = e.parentNode;
	var elem = e;

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
				var menu = document.createElement('i');
				menu.classList.add('fas', 'fa-ellipsis-h', 'w3-display-topright');
				menu.setAttribute('onclick', 'changeText(this.parentNode)');
				header.appendChild(menu);	

			}



			header.appendChild(txt);
			board.insertBefore(header, input);
			board.removeChild(input);
		}		
	});
}

function addList(){
	var board = document.querySelector('.board');

	var list = document.createElement('div');
	list.classList.add('w3-round-xlarge', 'board');

	var title = document.createElement('header');
	title.setAttribute('onclick', 'changeText(this)');
	title.innerHTML = 'Untitled';

	var footer = document.createElement('footer');
	footer.addEventListener("click", addCard);
	footer.innerHTML = "Add a card +"

	list.appendChild(title);
	list.appendChild(footer);
	document.querySelector('.boardsContainer').appendChild(list);
}


function addCard(){
	var board = this.parentNode;
	var footer = document.querySelector('.board footer');

	var input = document.createElement('div');
	input.classList.add('card');

	var menu = document.createElement('i');
	menu.classList.add('fas', 'fa-ellipsis-h', 'w3-display-topright');
	menu.setAttribute('onclick', 'changeText(this.parentNode)');
	input.appendChild(menu);

	board.insertBefore(input, this.parentNode.lastChild);
}



