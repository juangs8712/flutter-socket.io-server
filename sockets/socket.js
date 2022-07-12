
const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Abba'));
bands.addBand(new Band('Los Bukis'));
bands.addBand(new Band('Pimpinela'));
bands.addBand(new Band('Queen'));

// console.log(bands);

// mensajes de sockets
io.on('connection', client => {

   // la linea siguiente la ve cada cliente solo al conectarse
   client.emit('active-bands', bands.getBands());

   // client.on('connect', () => { 
   console.log('Cliente conectado')
   //  });

   client.on('disconnect', function () {
      console.log('Cliente desconectado')
   });

   client.on('mensaje', function (payload) {
      console.log('Mensaje', payload);

      io.emit('mensaje', { admin: 'Nuevo mensaje de Juan' });
   });

   client.on('vote-band', (payload) => {
      bands.voteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });

   client.on('add-band', (payload) => {
      bands.addBand(new Band(payload.name));
      io.emit('active-bands', bands.getBands());
   });

   client.on('delete-band', (payload) => {
      bands.deleteBand(payload.id);
      io.emit('active-bands', bands.getBands());
   });

   // client.on('emitir-mensaje', function (payload) {
   //    // console.log(payload);
   //    // io.emit('nuevo-mensaje', payload);  // emite a todos
   //    client.broadcast.emit('emitir-mensaje', payload);  // emite a todos menos al que lo emitio
   // });

});
