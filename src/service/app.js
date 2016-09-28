import Express from 'express';
import path from 'path';
import Logger from 'morgan';
import bodyParser from 'body-parser';

import routes from './routes/index';

const app = Express();

app.use(Logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

if (app.get('env') === 'development') {
  app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
      message: error.message,
      error
    });
  });
}

app.use((error, request, response, next) => {
  response.status(error.status || 500).json({
    message: error.message,
    error: {}
  });
});

export default app;
