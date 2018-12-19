const express = require('express');
const app = express();
var fs = require('fs');
var csv = require('fast-csv');
var c = new EncodingConverter();
var cors = require('cors');
var mdao = require('./src/mdao.js');
var data = require('./src/armyData.js');

app.use(cors());

app.get('/log', (req, res, next) => {
	res.json({
		csvLength: csvData.length
	});
});

app.get('/places/:city/:army', (req, res, next) => {
	const city = req.params.city;
	const army = req.params.army;
	data.armyData;
	data.cityArmy;
	let armyData = data.armyData.filter((d) => d.key == army)[0];
   
	const cityArmy = data.cityArmy.filter((d) => d.city == city)[0];
	const cityArmyData = data.armyData.filter((d) => cityArmy.army.indexOf(d.key) != -1).slice(0,1);

	res.json({ armyData, cityArmyData });
});

app.get('/search/:fname/:lname/:city', (req, res, next) => {
	const fname = req.params.fname;
	const lname = req.params.lname;
	const city = req.params.city;

	mdao.getPersons(fname, lname, city).then((persons) => {
		res.json(persons);
	});
});

function distance(a, b) {
	if (a.length == 0) return b.length;
	if (b.length == 0) return a.length;

	var matrix = [];

	// increment along the first column of each row
	var i;
	for (i = 0; i <= b.length; i++) {
		matrix[i] = [ i ];
	}

	// increment each column in the first row
	var j;
	for (j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= b.length; i++) {
		for (j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) == a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1
					)
				); // deletion
			}
		}
	}

	return matrix[b.length][a.length];
}

function EncodingConverter() {
	var geoToLatinBinding = [
		'a',
		'b',
		'g',
		'd',
		'e',
		'v',
		'z',
		'T',
		'i',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'J',
		'r',
		's',
		't',
		'u',
		'f',
		'q',
		'R',
		'k',
		'S',
		'ch',
		'c',
		'dz',
		'w',
		'W',
		'x',
		'j',
		'h'
	];
	var latinToGeoBinding = [
		'A',
		'B',
		'ჩ',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'ჟ',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'ღ',
		'შ',
		'თ',
		'U',
		'V',
		'ჭ',
		'X',
		'Y',
		'ძ',
		'[',
		'\\',
		']',
		'^',
		'_',
		'`',
		'ა',
		'ბ',
		'ც',
		'დ',
		'ე',
		'ფ',
		'გ',
		'ჰ',
		'ი',
		'ჯ',
		'კ',
		'ლ',
		'მ',
		'ნ',
		'ო',
		'პ',
		'ქ',
		'რ',
		'ს',
		'ტ',
		'უ',
		'ვ',
		'წ',
		'ხ',
		'ყ',
		'ზ'
	];

	this.toLatin = function(geoWord) {
		return convert(geoWord, geoToLatinBinding, 'ა', 'ჰ', 4304);
	};

	this.toGeorgian = function(latinWord) {
		return convert(latinWord, latinToGeoBinding, 'A', 'z', 65);
	};

	function convert(word, binding, min, max, charNum) {
		var buffer = [];
		var i = 0;
		word.split('').forEach(function(c) {
			if (c >= min && c <= max) {
				buffer[i++] = binding[c.charCodeAt(0) - charNum];
			} else {
				buffer[i++] = c;
			}
		});
		return buffer.join('');
	}
}

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port 3000!'));
