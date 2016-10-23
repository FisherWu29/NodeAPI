var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
    httpServer:server
});

http.createServer(httpHandle).listen(8082);
console.log('listen 8082');

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

