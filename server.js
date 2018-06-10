



const express = require('express');
const app = express();
var fs = require('fs');
var csv = require("fast-csv");
var c = new EncodingConverter();
var cors = require('cors');

app.use(cors());


var csvData = [];
csv
    .fromPath("data.csv")
    .on("data", function (data) {
        csvData.push(data);
    })
    .on("end", function () {
        console.log("done");
    });





// .pipe(parse({ delimiter: ',' }))
// .on('data', function (csvrow) {
//     // console.log(csvrow);
//     //do something with csvrow
//     csvData.push(csvrow);
// })
// .on('end', function () {
//     //do something wiht csvData
//     console.log(csvData[0]);
// });

app.get('/log', (req, res, next) => {
    res.json({
        csvLength: csvData.length
    });
})

app.get('/:pname', (req, res, next) => {
    const newValue = req.params.pname;
    const converted = c.toLatin(newValue);
    var minDist = Infinity;
    var minRecord = null;


    var value = csvData.forEach((d, j, k) => {
        var fnameLname = k[j][1] + '_' + k[j][2];
        var dist = distance(converted, fnameLname);
        if (dist < minDist) {

            minDist = dist;
            minRecord = d;
        }
    })

    res.json([csvData[0], minRecord]);
})

function distance(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
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
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}



function EncodingConverter() {
    var geoToLatinBinding = [
        'a', 'b', 'g', 'd', 'e', 'v', 'z', 'T', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'J', 'r', 's', 't', 'u', 'f', 'q', 'R', 'k', 'S', 'ch', 'c', 'dz', 'w', 'W', 'x', 'j', 'h'
    ];
    var latinToGeoBinding = [
        'A', 'B', 'ჩ', 'D', 'E', 'F', 'G', 'H', 'I', 'ჟ', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'ღ', 'შ', 'თ', 'U', 'V', 'ჭ', 'X', 'Y', 'ძ', '[', '\\', ']', '^', '_', '`', 'ა', 'ბ', 'ც', 'დ', 'ე', 'ფ', 'გ', 'ჰ', 'ი', 'ჯ', 'კ', 'ლ', 'მ', 'ნ', 'ო', 'პ', 'ქ', 'რ', 'ს', 'ტ', 'უ', 'ვ', 'წ', 'ხ', 'ყ', 'ზ'
    ];

    this.toLatin = function (geoWord) {
        return convert(geoWord, geoToLatinBinding, 'ა', 'ჰ', 4304);
    }

    this.toGeorgian = function (latinWord) {
        return convert(latinWord, latinToGeoBinding, 'A', 'z', 65);
    }

    function convert(word, binding, min, max, charNum) {
        var buffer = []
        var i = 0;
        word.split('').forEach(function (c) {
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
app.listen(port, () => console.log('Example app listening on port 3000!'))