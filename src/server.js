var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var WebSocketServer = require('ws').Server;
var server = http.createServer(httpHandle);
server.listen(8888);
var wss = new WebSocketServer({
    port:8899
});
var connection;

wss.on('connection',function (ws) {
    console.log('client connection:');
    ws.on('message',function (msg) {
        console.log('clientMsg:'+msg);
        ws.send('server');
    });
});

console.log('listen 8888');

function httpHandle(req,res) {
    var pathname = url.parse(req.url).pathname;
    if(req.url == '/'){
        fs.readFile(path.resolve(__dirname,'./views/index.html'),function (err, data) {
            if(err){
                console.log(err);
                return;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write('index');
            res.end(data);
        });
    }else if(req.url == '/about'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('about');
        res.end();
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('404 page not found');
        res.end();
    }
}

