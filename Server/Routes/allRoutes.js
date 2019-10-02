import express from 'express';
import controller from '../Controllers/entryControllers';

const routes = express.Router();

routes.get('/api/v1/entries', controller.retrieveAllEntries);
routes.get('/api/v1/entries/:id', controller.retrieveSpecificEntry);
routes.post('/api/v1/newentry', controller.addentry);
routes.put('/api/v1/entries/:id', controller.modifyentry);
routes.delete('/api/v1/entries/:id', controller.entrydelete);

export default routes;
