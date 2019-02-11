const fs = require('fs');

class Ticket {
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFour = [];

        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFour = data.lastFour;
        } else {
            this.restartCount();
        }
    }

    getCurrentTicket() {
        return `Ticket ${ this.last }`;
    }

    getLastFour() {
        return this.lastFour;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes'
        }

        let ticketNumber = this.tickets[0].number; // Avoid that de object passes by reference
        this.tickets.shift(); // array.shift() remove first element of array

        let attendTicket = new Ticket(ticketNumber, desktop); // Create ticket to attend

        console.log(this.lastFour);

        this.lastFour.unshift(attendTicket); // array.unshift() add element to first position

        if (this.lastFour.length > 4) { // Verify that te array have only 4 elements
            this.lastFour.splice(-1, 1); // array.splice(-1, 1) remove last element of array
        }
        console.log('Últimos 4');
        console.log(this.lastFour);

        this.recordFile();

        return attendTicket;
    }

    nextTicket() {
        this.last += 1;

        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);

        this.recordFile();

        return `Ticket ${ this.last }`;
    }

    restartCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFour = [];

        console.log('Se ha inicializado el sistema');

        this.recordFile();
    }

    recordFile() {
        let jsonData = {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        };

        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}

module.exports = {
    TicketControl
}