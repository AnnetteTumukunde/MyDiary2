import express from 'express';
import controllers from '../Controllers/entryControllers';
const routes = express.Router();

routes.get('/api/v1/entries',controllers[0]);
routes.get('/api/v1/entries/:entry_title',controllers[1]);
routes.post('/api/v1/newentry',controllers[2]);
routes.put('/api/v1/entries/:entry_title',controllers[3]);

export default routes;