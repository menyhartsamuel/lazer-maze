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

function loadGame() {
	ajax({
			url      : 'service.php',
			getdata  : 'map',
			success: function(xhr, text) {
				if(text.trim() != '') {
					generateGame(JSON.parse(text.trim()));
				} else {
					$("#message").innerHTML = '<p>A pálya nem létezik</p>';
				}
			}
	});
}

function callback() {
	ajax({
			method   : 'POST',
			url      : 'service.php',
			getdata  : 'leaderboard',
			postdata : 'solved',
			success: function(xhr, text) {
					gameover(JSON.parse(text.trim()));
			}
	});
}

function gameover(leaderboard) {
	var output = '<h2>Ranglista</h2>'
	for(var i = 0; i < leaderboard.length; ++i) {
		output += '<p>' + leaderboard[i] + '</p>'
	}
	$("#message").innerHTML = output;
}

createEventListener(window, 'load', function(e) {
	loadGame();
})