var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    port = process.env.PORT || 3000,
    chalk = require('chalk'),
    io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    var path = __dirname + '/public/index.html'
    res.sendFile(path);
});

var connectCounter = 0;

io.on('connection', function(socket) {

    connectCounter++;
    io.emit('user count', connectCounter);
    console.log('User Connected: ' + connectCounter);

    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function() {
        connectCounter--;
        io.emit('user count', connectCounter);
        console.log('User Disconnected: ' + connectCounter);
    });
});

http.listen(port, function () {
    console.log(chalk.bgMagenta('Magic happens on port ' + port));
});