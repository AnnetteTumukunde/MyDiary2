import express from 'express';
import { retrieveAllEntries, retrieveSpecificEntry, addentry, modifyentry, entrydelete } from '../Controllers/entryControllers';
import { signup, signin } from '../Controllers/userControllers';
import auth from '../Middlewares/authentication';

const routes = express.Router();

routes.get('/api/v1/entries', auth, retrieveAllEntries);
routes.get('/api/v1/entries/:id([0-9]+)', auth, retrieveSpecificEntry);
routes.post('/api/v1/entries', auth, addentry);
routes.put('/api/v1/entries/:id([0-9]+)', auth, modifyentry);
routes.delete('/api/v1/entries/:id([0-9]+)', auth, entrydelete);
routes.post('/api/v1/auth/signup', signup);
routes.post('/api/v1/auth/signin', signin);

export default routes;
