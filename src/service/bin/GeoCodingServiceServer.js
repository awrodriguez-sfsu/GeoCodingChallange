import GeoCodingServiceApplication from '../GeoCodingServiceApplication';
import Server from '../../lib/Server';

class GeoCodingServiceServer extends Server {
  constructor(Application, port) {
    super(Application, port);
  }
}

const server = new GeoCodingServiceServer(GeoCodingServiceApplication, process.env.port || '3001');