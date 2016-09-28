import app from '../app';
import debug from 'debug';
import http from 'http';

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const Server = http.createServer(app);

Server.listen(port);
Server.on('error', onError);
Server.on('listening', onListening);

function normalizePort(value) {
  const port = parseInt(value, 10);

  if(isNaN(port)) {
    return value;
  }

  if(port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if(error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const address = Server.address();

  const bind = typeof address === 'string'
    ? 'pipe ' + address
    : 'port ' + address.port;
  debug('Listening on ' + bind);
}
