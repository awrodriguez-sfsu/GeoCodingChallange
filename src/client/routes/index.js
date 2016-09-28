import Express from 'express';

const routes = Express.Router();

/* GET home page. */
routes.get('/', (request, response, next) => (response.render('index')));

export default routes;
