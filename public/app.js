var socket = io();

$('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg){
    $('#messages').append($('<div class="card grey lighten-5 z-depth-1 mes">').text(msg));
});

socket.on('user count', function(connectCounter) {
    $('#users').text(' ' + connectCounter);
});