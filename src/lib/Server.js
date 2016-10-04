import http from 'http';

class Server {
  constructor(Application, port) {
    this.application = Application;
    this.port = Server._validatePort(port);

    this.application.appPort = this.port;

    this.server = http.createServer(this.application.instance);
    this.server.listen(this.port);

    this.server.on('error', this._onError.bind(this));
    this.server.on('listening', this._onListening.bind(this));
  }

  _onError(error) {
    if(error.syscall !== 'listen') {
      throw error;
    }

    switch (error.code) {
      case 'EACCES':
        this.application.log(this.port.toString() + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        this.application.log(this.port.toString() + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  _onListening() {
    this.application.log('Listening on ' + this.server.address().toString());
  }

  static _validatePort(value) {
    const port = parseInt(value, 10);

    if(port >= 0) {
      return port;
    }

    return false;
  }
}

export default Server;