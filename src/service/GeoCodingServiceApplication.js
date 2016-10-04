import Application from '../lib/Application';

import routes from './routes/index';

class GeoCodingService extends Application {
  constructor(environment) {
    super(environment);
    this.useBodyParser();
    this.addRoutes('/', routes);
  }
}

const GeoCodingServiceApplication = new GeoCodingService(process.NODE_ENV);

export default GeoCodingServiceApplication;
