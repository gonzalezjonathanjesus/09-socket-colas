// Comando para establecer la conexión
var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('currentTicket', function(res) {
    label.text(res.currentTicket);
});

$('button').on('click', function() {
    socket.emit('nextTicket', null, function(res) {
        label.text(res.generatedTicket);
    });
});