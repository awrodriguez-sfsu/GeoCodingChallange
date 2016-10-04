import Express from 'express';

const routes = Express.Router();

/* GET home page. */
routes.get('/', (request, response, next) => {
  const context = {
    title: 'Home'
  };

  return response.render('index.hbs', context);
});

export default routes;
