const hostname = '127.0.0.1';
const port = 8888;

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/../../page_src'));
console.log('Web Path: ' + __dirname + '/../../page_src');

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});