import express from 'express';
import { retrieveAllEntries, retrieveSpecificEntry, addentry, modifyentry, entrydelete } from '../Controllers/entryControllers';

const routes = express.Router();

routes.get('/api/v1/entries', retrieveAllEntries);
routes.get('/api/v1/entries/:id', retrieveSpecificEntry);
routes.post('/api/v1/entries', addentry);
routes.put('/api/v1/entries/:id', modifyentry);
routes.delete('/api/v1/entries/:id', entrydelete);

export default routes;
