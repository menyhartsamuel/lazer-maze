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
	return game[tableType][coords.x][coords.y];
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
var correct;
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

function createGame(gameSet) {
	var set = JSON.parse(JSON.stringify(gameSet));
	return new Game(set);
}

function State(state) {
	this.x = state.x;
	this.y = state.y;
	this.direction = state.direction;
}

function GameTest(test) {
	this.gameTable = test.gameTable;
	this.itemTable = test.itemTable;
	this.laserCount = test.startPositions.length;
	this.s = test.startPositions;
	this.path = [];
	
	this.hasState = function() {
		return this.s.length != 0;
	};
	
	this.addState = function(state) {
        if(this.path.findIndex(f => f.x == state.x && f.y == state.y && f.direction == state.direction) == -1) {
			this.s.push(new State(state));
			this.path.push(new State(state));
		} else {
			this.laserCount -=1;
		}
    };
	
	this.nextState = function() {
		return this.s.shift();
	};
}

function createGameTest(game) {
	var test = JSON.parse(JSON.stringify(game));
	test.gameTable.forEach(f => f.filter(f => f != null).forEach(f => (f.type == 'lezer' || f.type == 'blokkolo') ? f['activated'] = true :  f['activated'] = false));
	test.startPositions = [];
	
	for(var i = 0; i < test.gameTable.length; ++i) {
		for(var j = 0; j < test.gameTable[i].length; ++j) {
			if(test.gameTable[i][j] != null && test.gameTable[i][j].type == 'lezer') {
				test.startPositions.push(new Position(i, j));
			}
		}
	}
	test.startPositions.forEach(f => f['direction'] = test.gameTable[f.x][f.y]['direction'])
	return new GameTest(test);
}

// HTML generálók
function draw() {
	$('#board').innerHTML = drawGameTable(game.gameTable);
    $('#items').innerHTML = drawItemTable(game.itemTable);
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
createEventListener($('#game'), 'dragstart', onDragStart);
createEventListener($('#game'), 'dragover', onDragOver);
createEventListener($('#game'), 'dragleave', onDragLeave);
createEventListener($('#game'), 'drop', onDrop);
createEventListener($('#game'), 'dragend', onDragEnd);
createEventListener($('#game'), 'click', rotate);


//Függvények
function generateGame(set) {
	game = createGame(set);
	draw();
	correct = false;
	testGame(game);
}

function onDragStart(e) {
	
	if (!correct && e.target.draggable) {
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
		game[tableType][coords.x][coords.y] = game[dragData.tableType][dragData.coords.x][dragData.coords.y];
		game[dragData.tableType][dragData.coords.x][dragData.coords.y] = null;
		testGame(game);
	}
}

function onDragEnd(e) {
	dragData = null;
}

function rotate(e) {
	if(!correct && e.target.className == "rotatable") {
		elem = e.target;
		field = getField(getTableElement(elem));
		field.direction = (field.direction + 1) % 4;
		testGame(game);
	}
}

function testGame(game) {
	var test = createGameTest(game);
	draw();
	while(!test.s.length == 0) {	
		var act = test.nextState();
		var field = beam(test.gameTable, act);
		if(field != null) {
			switch(field.type) {
				case 'ellenorzo' :
				case 'blokkolo' : {
					field.activated = true;
					test.addState(act);
				} break;
				case 'dupla' : {
					field.activated = true;
					if((field.direction - act.direction).mod(2) == 0){
						act.direction = (act.direction - 1).mod(4);
					} else {
						act.direction = (act.direction + 1).mod(4);
					}
					test.addState(act);
				} break;
				case 'felig' : {
					field.activated = true;
					test.laserCount += 1;
					test.addState(act);
					if((field.direction - act.direction) % 2 == 0){
						act.direction = (act.direction - 1).mod(4);
					} else {
						act.direction = (act.direction + 1).mod(4);
					}
					test.addState(act);
				} break;
				case 'tukor' : {
					field.activated = true;
					switch((field.direction - act.direction).mod(4)) {
						case 0 : test.laserCount -= 1; break;
						case 1 : {
							act.direction = (act.direction + 1).mod(4);
							test.addState(act);
						} break;
						case 2 : {
							act.direction = (act.direction - 1).mod(4);
							test.addState(act);
						} break;
						case 3 : break;
					}
				} break;
				case 'cel' : {
					field.activated = true;
					switch((field.direction - act.direction).mod(4)) {
						case 0 : {
							test.laserCount -= 1;
							field['finished'] = true;
						} break;
						case 1 : {
							act.direction = (act.direction + 1).mod(4);
							test.addState(act);
						} break;
						case 2 : {
							act.direction = (act.direction - 1).mod(4);
							test.addState(act);
						} break;
						case 3 : break;
					}
				} break;
				default: ;
			}		
		}
	}
	$("#result").innerHTML = testResult(test);
}

function testResult(test) {
	if(test.itemTable[0].some(f => (f !== null))) return "Használj fel minden elemet!";
	var allFinished = true;
	var allActivated = true;
	for(var i = 0; i < test.gameTable.length; ++i) {
		for(var j = 0; j < test.gameTable[i].length; ++j) {
			var act = test.gameTable[i][j];
			if(act != null) {
				if(!act.activated) allActivated = false;
				if(act.type == 'cel' && !act.finished) allFinished = false;
			} 
		}
	}
	if(!allActivated) return "A lézer nem érint minden elemet!"
	if(test.laserCount != 0 || !allFinished) return "A lézer nem célpontokban végződik!";
	correct = true;
	if(typeof callback === "function") callback();
	return "Jó megoldás!";
}

function directionVector(direction) {
	switch(direction) {
		case 0: return new Position(0, 1);
		case 1: return new Position(1, 0);
		case 2: return new Position(0,-1);
		case 3: return new Position(-1,0);
	}
}

function beam(gameTable, act) {
	var vec = directionVector(act.direction);
	act.x += vec.x;
	act.y += vec.y;
	if(act.x < 0 || act.x > 4 || act.y < 0 || act.y > 4) {
		return null;
	}
	while (gameTable[act.x][act.y] === null) {
		if(document.getElementById("gameTable").rows[act.x].cells[act.y].id == "") {
			document.getElementById("gameTable").rows[act.x].cells[act.y].id='beam-'+(act.direction % 2);
		} else if(document.getElementById("gameTable").rows[act.x].cells[act.y].id != 'beam-'+(act.direction % 2)){
			document.getElementById("gameTable").rows[act.x].cells[act.y].id='doublebeam';
		}
		act.x += vec.x;
		act.y += vec.y;
		if(act.x < 0 || act.x > 4 || act.y < 0 || act.y > 4) {
			return null;
		}
	} 	
	return gameTable[act.x][act.y];
}