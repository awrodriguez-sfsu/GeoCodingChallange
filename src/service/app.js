import Express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import Logger from 'morgan';
import bodyParser from 'body-parser';

import lists from './routes/list';

const app = Express();

app.use(Logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, 'public')));

app.use('/', lists);

app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

if (app.get('env') === 'development') {
  app.use((error, request, response, next) => {
    response.status(error.status || 500).json(error.message);
  });
}

app.use((error, request, response, next) => {
  response.status(error.status || 500).json(error.message);
});

export default app;
