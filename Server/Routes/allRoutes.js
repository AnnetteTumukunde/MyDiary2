import express from 'express';
import getAllEntries from '../Models/getAllEntries';
const routes = express.Router();
routes.get('/', (request,response) => {
    response.status(200).json(getAllEntries);
});
export default routes;