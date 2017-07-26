var tileNamesOne = [];
var tileNamesTwo = [];
var numOfTiles = 8;
var rowSize = 4;
var randInt = 0;

var choiceOne;
var choiceTwo;
var descOne;
var descTwo;
var numOfChoices = 0;

var startButton = document.getElementById("begin");
startButton.addEventListener("click", loadJSON);
var selectDifficulty = document.getElementById("difficulty");
selectDifficulty.addEventListener("change", adjustDifficulty);
var thumbs = document.getElementById("thumbs");

var i;
function populate() {
	for (i = 0; i < (numOfTiles / 2); i++) {

		var tileOne = document.createElement("div");
		tileOne.className = "tile";
		random();
		tileOne.id = tileNamesOne[randInt] + "One";
		tileOne.description = tileNamesOne[randInt];
		//tileOne.addEventListener("click", userChoice);
		thumbs.appendChild(tileOne);
		
		var picOne = new Image();
		picOne.className = "pic";
		picOne.src = "images/" + tileNamesOne[randInt] + ".jpg";
		picOne.description = tileNamesOne[randInt];
		tileOne.appendChild(picOne);
		
		tileNamesOne.splice(randInt, 1);
		
		var tileTwo = document.createElement("div");
		tileTwo.className = "tile";
		random();
		tileTwo.id = tileNamesTwo[randInt] + "Two";
		tileTwo.description = tileNamesTwo[randInt];
		thumbs.appendChild(tileTwo);
		
		var picTwo = new Image();
		picTwo.className = "pic";
		picTwo.src = "images/" + tileNamesTwo[randInt] + ".jpg";
		picTwo.description = tileNamesTwo[randInt];
		tileTwo.appendChild(picTwo);
		tileNamesTwo.splice(randInt, 1);
		
		if ((i + 1) % (rowSize / 2)==0) {
			thumbs.innerHTML += "<br>";
		}
	}
	var allTiles = document.querySelectorAll('.tile');
	for(var i=0; i < allTiles.length; i++){
	allTiles[i].addEventListener('mouseover', mouseOver, false);
	allTiles[i].addEventListener('mouseout', mouseOut, false);
	allTiles[i].addEventListener('click', userChoice, false);
}

}

function loadJSON() {
	thumbs.innerHTML = "";
	var myRequest = new XMLHttpRequest();
	myRequest.onreadystatechange = function () {
		if(myRequest.status == 200 && myRequest.readyState == 4) {
			var result = myRequest.responseText;
			tileNamesOne = JSON.parse(result);
			tileNamesTwo = JSON.parse(result);		
			do {
				random();
				tileNamesOne.splice(randInt, 1);
				tileNamesTwo.splice(randInt, 1);
			} while (tileNamesOne.length > (numOfTiles / 2));
			populate();	
		}	
	}
	
	myRequest.open("GET", "json/match.json", true);
	myRequest.send();
}

function userChoice() {
	if ( numOfChoices == 0 ) {
		numOfChoices = 1;
		choiceOne = document.getElementById(this.id);
		var identOne = this.id;
		var snipperOne = identOne.length - 3;
		descOne = identOne.substring(0, snipperOne);
		alert(descOne);
		if(descOne == descTwo) {
			alert("That is correct!");
			choiceOne.style.backgroundColor = "red";
			choiceTwo.style.backgroundColor = "red";
		}
	} else {
		choiceTwo = document.getElementById(this.id);
		var identTwo = this.id;
		var snipperTwo = identTwo.length - 3;
		descTwo = identTwo.substring(0, snipperTwo);
		alert(descTwo);
		if(descOne == descTwo) {
			alert("That is correct!");
			choiceOne.style.backgroundColor = "red";
			choiceTwo.style.backgroundColor = "red";
		}
		numOfChoices = 0;
	}

}

function mouseOver() {
	this.className = "mouseOver";
}

function mouseOut() {
	this.className = "tile";
}

function random() {
	var myNum = Math.floor(Math.random() * tileNamesOne.length);
	randInt = parseInt(myNum);
}

function adjustDifficulty() {
	thumbs.innerHTML = "";
	if (this.value == "1") {
		numOfTiles = 8;
		rowSize = 4;
	} else if (this.value == "2") {
		numOfTiles = 18;
		rowSize = 6;
	} else if (this.value == "3") {
		numOfTiles = 40;
		rowSize = 8;
	} else if (this.value == "4") {
		numOfTiles = 60;
		rowSize = 10;
	}
}
