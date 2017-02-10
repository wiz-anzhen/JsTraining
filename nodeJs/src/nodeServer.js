const hostname = '127.0.0.1';
const port = 8888;

var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');
app.use('/api', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));
app.use('/wizas', proxy({ target: 'http://note.wiz.cn', changeOrigin: true }));


app.use(express.static(__dirname + '/../../page_src'));
console.log('Web Path: ' + __dirname + '/../../page_src');

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});