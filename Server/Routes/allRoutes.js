import express from 'express';
import getAllEntries from '../Models/getAllEntries';
import getSpecificEntry from '../Models/getSpecificEntry';
const routes = express.Router();
routes.get('/', (request,response) => {
    response.status(200).json(getAllEntries);
});
routes.get('/:entry_title', (request, response) => {
    let seen = getSpecificEntry.find((sentry) => {
        // return sentry.id === parseInt(request.params.id);
        return sentry.entry_title === request.params.entry_title;
    });
    if (seen) {
        response.status(200).json(seen);
    }
    else {
        response.status(404).json({message: "Entry not found", status: 404});
    }
});
export default routes;