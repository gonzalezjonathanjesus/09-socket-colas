const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.emit('currentTicket', {
        currentTicket: ticketControl.getCurrentTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.emit('currentTicket', {
        currentTicket: ticketControl.getCurrentTicket(),
        lastFour: ticketControl.getLastFour()
    });

    client.on('nextTicket', (data, callback) => {
        callback({
            generatedTicket: ticketControl.nextTicket(),
        });
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desktop);

        client.broadcast.emit('currentTicket', {
            lastFour: ticketControl.getLastFour()
        });

        callback(attendTicket);
    });

});