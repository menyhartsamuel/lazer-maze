var easyGameSet = {
	placedFields : [new placedField('lezer', 1, false, false, 1, 1),
				    new placedField('cel', 1, false, true, 3, 3)],
	additionalFields : [new Field('dupla', 0, true, true)]
}

var mediumGameSet = {
	placedFields : [new placedField('lezer', 2, false, true, 0, 0),
				    new placedField('cel', 2, false, true, 0, 4),
				    new placedField('dupla', 1, false, false, 1, 3),
					new placedField('blokkolo', 0, false, true, 2, 2)],
	additionalFields : [new Field('cel', 0, true, true),
				        new Field('felig', 0, true, true)]
}

var hardGameSet = {
	placedFields : [new placedField('tukor', 0, false, true, 0, 2),
					new placedField('tukor', 0, false, true, 0, 4),
					new placedField('lezer', 0, false, true, 2, 1),
					new placedField('tukor', 1, false, false, 2, 3),
					new placedField('ellenorzo', 0, false, false, 3, 4),
				    new placedField('dupla', 1, false, false, 4, 0)],
	additionalFields : [new Field('tukor', 0, true, true),
						new Field('tukor', 0, true, true),
				        new Field('felig', 0, true, true)]
} 

createEventListener($('#easy'), 'click', function(e) {
	generateGame(easyGameSet);
});
createEventListener($('#medium'), 'click', function(e) {
	generateGame(mediumGameSet);
});
createEventListener($('#hard'), 'click', function(e) {
	generateGame(hardGameSet);
});