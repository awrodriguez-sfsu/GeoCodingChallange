import Express from 'express';
import Logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import hbs from 'express-hbs';

class Application {
  constructor(environment) {
    this.environment = environment || 'development';
    this.app = Express();
    this._useLogger();
    this._setErrorHandles();
  }

  setEngine(name, options) {
    this.app.engine(name, hbs.express4(options));
    this.app.set('view engine', 'express-hbs');
  }

  setViews(path) {
    this.app.set('views', path);
  }

  useBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  useCookieParser() {
    this.app.use(cookieParser());
  }

  useStaticResources(path) {
    this.app.use(Express.static(path));
  }

  addRoutes(url, handler) {
    this.app.use(url, handler);
  }

  log(message) {
    console.log(message);
  }

  get instance() {
    return this.app;
  }

  set appPort(port) {
    this.app.set('port', port);
  }

  _useLogger() {
    if (this.environment === 'development') {
      this.app.use(Logger('dev'));
    } else {
      this.app.use(Logger('combined'));
    }
  }

  _setErrorHandles() {
    if (this.environment === 'development') {
      this.app.use(Application._devError);
    } else {
      this.app.use(Application._prodError);
    }
  }

  static _devError(error, request, response, next) {
    return response.status(error.status || 500).json({
      message: error.message,
      error
    });
  }

  static _prodError(error, request, response, next) {
    return response.status(error.status || 500).json({
      message: error.message,
      error: {}
    });
  }
}

export default Application;