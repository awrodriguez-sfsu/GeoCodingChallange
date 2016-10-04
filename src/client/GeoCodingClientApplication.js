import Application from '../lib/Application';
import path from 'path';

import routes from './routes/index';

class GeoCodingClient extends Application {
  constructor(environment) {
    super(environment);
    this.useBodyParser();
    this.useCookieParser();
    this.setEngine('hbs', GeoCodingClient._engineOptions());
    this.setViews(path.join(__dirname, 'views'));
    this.useStaticResources(path.join(__dirname, 'public'));
    this.addRoutes('/', routes);
  }

  static _engineOptions() {
    return {
      defaultLayout: path.join(__dirname, 'views/layouts/layout.hbs'),
      partialsDir: path.join(__dirname, 'views'),
      layoutsDir: path.join(__dirname, 'views/layouts')
    };
  }
}

const GeoCodingClientApplication = new GeoCodingClient(process.env.NODE_ENV);

export default GeoCodingClientApplication;
