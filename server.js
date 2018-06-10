



const express = require('express');
const app = express();
var fs = require('fs');
var parse = require('csv-parse');

var csvData = [];
fs.createReadStream('data.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', function (csvrow) {
        // console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end', function () {
        //do something wiht csvData
        console.log(csvData[0]);
    });

app.get('/log', (req, res, next) => {
    
    res.json({
        csvLength: csvData.length
    });
})

app.get('/:pname', (req, res, next) => {
    var value = csvData.forEach(d => {

    })
    const newValue = req.params.pname;
    res.json(newValue);
})







var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Example app listening on port 3000!'))