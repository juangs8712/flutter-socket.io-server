
const { io } = require('../index');
// mensajes de sockets
io.on('connection', client => {
    
    // client.on('connect', () => { 
    console.log('Cliente conectado')        
    //  });

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
     });

     client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
     });

     
  });
