import moment from 'moment';
import models from '../Models/data';
import entryValidation from '../Validation/valid';

const retrieveAllEntries = (request, response) => {
    response.status(200).json({ data: models });
};

const retrieveSpecificEntry = (request, response) => {
    const seen = models.find((sentry) => {
        return sentry.id === parseInt(request.params.id);
    });
    if (seen) {
        response.status(200).json(seen);
    }
    else {
        response.status(404).json({ message: 'Entry not found', status: 404 });
    }
};

const addentry = (request, response) => {
    const { error } = entryValidation.validation(request.body);
    if (error) {
        return response.status(400).json({ status: 400, error: error.details[0].message });
    }
        const aentryIds = models.length + 1;
        const nentry = {
            id: aentryIds,
            entryTitle: request.body.entryTitle,
            entryDate: moment().format('ll'),
            posted: request.body.posted,
            viewed: request.body.viewed,
            entryContent: request.body.entryContent,
        };
        const newAllEntries = models.push(nentry);
        response.status(201).json({ status: 201, addedentry: nentry, newentries: newAllEntries });
};

const modifyentry = (request, response) => {
    const seen = models.find((sentry) => {
        return sentry.id === parseInt(request.params.id);
    });
    if (seen) {
        const editedentries = {
            id: seen.id,
            entryTitle: request.body.entryTitle,
            entryDate: seen.entryDate,
            posted: request.body.posted,
            viewed: request.body.viewed,
            entryContent: request.body.entryContent
        };
        const changes = models.indexOf(seen);
        const nentries = models.splice(changes,1,editedentries);
        response.status(200).json({ message: 'Entry successfully modified', status: 200, nentries });
    }
    else {
        response.status(404).json({ message: 'Entry not found', status: 404 });
    }
};

const entrydelete = (request, response) => {
    const seen = models.find((sentry) => {
        return sentry.id === parseInt(request.params.id);
    });
    if (seen) {
        const changes = models.indexOf(seen);
        const newentries = models.splice(changes,1);
        response.status(200).json({ message: 'Entry deleted', newenntries: newentries });
    }
    else {
        response.status(404).json({ message: 'Entry not found', status: 404 });
    }
};

export { retrieveAllEntries, retrieveSpecificEntry, addentry, modifyentry, entrydelete };
