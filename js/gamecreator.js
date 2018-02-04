// Segédfüggvények
function $(selector) {
    return document.querySelector(selector);
}

function createEventListener(elem, tipus, kezelo) {
  if (elem.addEventListener) {
    elem.addEventListener(tipus, kezelo, false);
  }
  else if (elem.attachEvent) {
    elem.attachEvent('on' + tipus, function () {
      return kezelo.call(elem, window.event);
    });
  }
  else {
    elem['on' + tipus] = kezelo;
  }
}

function getCoords(td) {
	var y =  td.cellIndex;
	var tr = td.parentNode;
	var x =  tr.sectionRowIndex;
	return new Position(x, y);
}

function getField(elem) {
	const tableType = getTableType(elem);
	const coords = getCoords(elem);
	return creator[tableType][coords.x][coords.y];
}

function getTableType(elem) {
	while(elem != null && !elem.matches('table')) {
		elem = elem.parentElement;
	}
	if(elem == null) {
		return "";
	}
	return elem.id;
}

function getTableElement(elem) {
	while(elem != null && !elem.matches('td')) {
		elem = elem.parentElement;
	}
	if(elem == null) {
		return "";
	}
	return elem;
}

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

// Adatok, adat típusok, konstruktorok
var game;
var creator;
let dragData = null;

function Position(x, y) {
	this.x = x;
	this.y = y;
}

function Field(type, direction, movable, rotatable) {
	this.type = type;
	this.direction = direction;
	this.movable = movable;
	this.rotatable = rotatable;
}

function placedField(type, direction, movable, rotatable, x, y) {
	this.field = new Field(type, direction, movable, rotatable);
	this.pos = new Position(x, y);
}

function createTable(placedFields) {
	table = Array(5).fill().map(()=>Array(5).fill(null));
	for(var i = 0; i < placedFields.length; i++) {
		table[placedFields[i].pos.x][placedFields[i].pos.y] = placedFields[i].field;
	}
	return table;
}

function Game(gameSet) {
	this.gameTable = createTable(gameSet.placedFields);
	this.itemTable = [gameSet.additionalFields];
}

function Creator() {
	this.gameTable = Array(5).fill().map(()=>Array(5).fill(null));
	this.itemTable = [Array(5).fill(null)];
	this.creatorTable = JSON.parse(JSON.stringify([fields]));
	this.bin = [[]];
}

function reload() {
	creator.creatorTable = JSON.parse(JSON.stringify([fields]));
	creator.bin = [[]];
}

var fields = [new Field('lezer', 0, true, true),
			  new Field('tukor', 0, true, true),
			  new Field('cel', 0, true, true),
			  new Field('dupla', 0, true, true),
			  new Field('felig', 0, true, true),
			  new Field('ellenorzo', 0, true, true),
			  new Field('blokkolo', 0, true, true)];
			  
function createMapObject() {
	var nev = $('#nev').value;
	if(!nev.trim() == '') {
		var palya = {};
		palya.placedFields = createPlacedFields(creator.gameTable);
		palya.additionalFields = createadditionalFields(creator.itemTable);
		palya.difficulty = $('#nehezseg').value;
		palya.solvers = [];
		var adat = {};
		adat[nev] = palya;
		return adat;
	} else {
		$('#message').innerHTML = 'Név megadása kötelező!';
		return null;
	}
}

function createPlacedFields(gameTable) {
	var placedFields = [];
	for(var i = 0; i < gameTable.length; ++i) {
		for(var j = 0; j < gameTable[i].length; ++j) {
			if(gameTable[i][j] != null) {
				placedFields.push(
				new placedField(gameTable[i][j].type,
								gameTable[i][j].direction,
								false,
								gameTable[i][j].rotatable,
								i,
								j));
			}
		}
	}
	return placedFields;
}

function createadditionalFields(itemTable) {
	return itemTable[0].filter(function(element) {
		return element != null;
	});
}

// HTML generálók
function draw() {
	reload();
	$('#board').innerHTML = drawGameTable(creator.gameTable);
    $('#items').innerHTML = drawItemTable(creator.itemTable);
	$('#creator').innerHTML = drawCreatorTable(creator.creatorTable);
	$('#bin').innerHTML = drawBin();
}

function drawGameTable(matrix) {
 	return `
  	<table id="gameTable">
    	${matrix.map(row => `
        <tr>
		  ${row.map(cell => `
            <td>${cell !== null ? getImgByData(cell) : ''}</td>
          `).join('')}           
        </tr>
      `).join('')}
    </table>
  `
}

function drawItemTable(matrix) {
	row = matrix[0];
	return `
  	<table id="itemTable">
		<tr>
		  ${row.map(cell => `
			<td>${cell !== null ? getImgByData(cell) : ''}</td>
		  `).join('')}
		</tr>
    </table>
  ` 
}

function drawCreatorTable(matrix) {
	row = matrix[0];
	return `
  	<table id="creatorTable">
		<tr>
		  ${row.map(cell => `
			<td>${cell !== null ? getImgByData(cell) : ''}</td>
		  `).join('')}
		</tr>
    </table>
  ` 
}

function drawBin() {
	return `
  	<table id="bin">
		<tr>
		  <td></td>
		</tr>
    </table>
  ` 
}

function getImgByData(data) {
	if(data.rotatable) {
		return `<img src="img/${data.type}.png" id="direction-${data.direction}" draggable="${data.movable}" class="rotatable">`;
	} else {
		return `<div draggable="${data.movable}" class="fixed">
					<img src="img/${data.type}.png" id="direction-${data.direction}" draggable="false" class="fixed-group">
					<img src="img/lock-icon.png" id="lock" draggable="false" class="fixed-group">
				</div>`;
	}
}

// Eseménykezelők
createEventListener(window, 'load', function(e) {
	loadEditor();
})
createEventListener($('#game'), 'dragstart', onDragStart);
createEventListener($('#game'), 'dragover', onDragOver);
createEventListener($('#game'), 'dragleave', onDragLeave);
createEventListener($('#game'), 'drop', onDrop);
createEventListener($('#game'), 'dragend', onDragEnd);
createEventListener($('#game'), 'click', rotate);
createEventListener($('#game'), 'contextmenu', function(e) {
	e.preventDefault();
	lock(e);
});
createEventListener($('#mentes'), 'click', function(e) {
	var map = createMapObject();
	if(map != null) {
		ajax({
			method   : 'POST',
			url      : 'service.php',
			getdata  : 'leaderboard',
			postdata : 'newmap='+JSON.stringify(map),
			success: function(xhr, text) {
				$('#message').innerHTML = 'A mentés sikeres!'
			}
		});
	} 
});

//Függvények
function loadEditor() {
	creator = new Creator();
	draw();
}

function onDragStart(e) {
	
	if (e.target.draggable) {
		const elem = e.target;
		const tableType = getTableType(elem);
		const coords = getCoords(elem.parentElement);
		dragData = {
			elem,
			tableType,
			coords
		}
	}
}

function onDragOver(e) {
	if (dragData != null && e.target.matches('td')) {
		const td = e.target;
		if (canPut(td)) {
			e.dataTransfer.dropEffect = "move";
			td.classList.add('droppable');
			e.preventDefault();
		}
	}
}

function canPut(td) {
	return getField(td) == null;
}

function onDragLeave(e) {
	if (e.target.matches('td')) {
		e.preventDefault();
		const td = e.target;
		td.classList.remove('droppable');
	}
}

function onDrop(e) {
	if (e.target.matches('td')) {
		e.preventDefault();
		const td = e.target;
		const tableType = getTableType(td);
		const coords = getCoords(td);
		td.classList.remove('droppable');
		td.appendChild(dragData.elem);
		creator[tableType][coords.x][coords.y] = creator[dragData.tableType][dragData.coords.x][dragData.coords.y];
		creator[dragData.tableType][dragData.coords.x][dragData.coords.y] = null;
		draw();
	}
}

function onDragEnd(e) {
	dragData = null;
}

function rotate(e) {
	if(e.target.className == "rotatable") {
		elem = e.target;
		field = getField(getTableElement(elem));
		field.direction = (field.direction + 1) % 4;
		draw();
	}
}

function lock(e) {
	if(e.target.className == "rotatable" || e.target.className == "fixed-group") {
		elem = e.target;
		field = getField(getTableElement(elem));
		field.rotatable = !(field.rotatable);
		draw();
	}
}