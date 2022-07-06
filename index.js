// esto es similar a una importacion comun de flutter
const express = require('express');
const path = require('path')

require('dotenv').config(); // esto lee el archivo .env para establecer las variables de entorno

// App de express
const app = express();

// path publico
const publicPath = path.resolve( __dirname, 'public' );

app.use( express.static( publicPath ) );

// Node server
const server = require('http').createServer( app );
module.exports.io = require('socket.io')(server);

require('./sockets/socket')
// con este codigo ya tenemos el servidor corriendo y escuchando en el puerto 3000
// para ponerlo en run escribimos <node index> en un cmd en el directorio del proyecto
// si esta instalado el nodemon escrimos <nodemon index> para hacer hod reload
server.listen(process.env.PORT, ( err ) => {
    if ( err ) throw new Error( err );

    console.log( 'Servidor corriendo en puerto', process.env.PORT );
});