import express from 'express';
import { retrieveAllEntries, retrieveSpecificEntry, addentry, modifyentry, entrydelete } from '../Controllers/entryControllers';
import adduser from '../Controllers/userControllers';

const routes = express.Router();

routes.get('/api/v1/entries', retrieveAllEntries);
routes.get('/api/v1/entries/:id', retrieveSpecificEntry);
routes.post('/api/v1/entries', addentry);
routes.put('/api/v1/entries/:id', modifyentry);
routes.delete('/api/v1/entries/:id', entrydelete);
routes.post('/api/v1/auth/signup', adduser);

export default routes;
