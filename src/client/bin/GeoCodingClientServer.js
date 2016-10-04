import GeoCodingClientApplication from '../GeoCodingClientApplication';
import Server from '../../lib/Server';

class GeoCodingClientServer extends Server {
  constructor(Application, port) {
    super(Application, port);
  }
}

const server = new GeoCodingClientServer(GeoCodingClientApplication, process.env.port || '3000');