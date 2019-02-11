// Comando para establecer la conexión
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
};

var desktop = searchParams.get('escritorio');
let label = $('small');

console.log(desktop);

$('h1').text('Escritorio ' + desktop);

$('button').on('click', function() {
    socket.emit('attendTicket', { desktop: desktop }, function(res) {
        if (res === 'No hay tickets pendientes') {
            label.text(res)
            alert(res);
            return;
        } else {
            label.text('Ticket ' + res.number);
        }
    });
});