import Express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import Logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import routes from './routes/index';

const app = Express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(Logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

if (app.get('env') === 'development') {
  app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.render('error', {
      message: error.message,
      error
    });
  });
}

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.render('error', {
    message: error.message,
    error: {}
  });
});

export default app;
