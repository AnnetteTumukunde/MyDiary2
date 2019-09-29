import models from '../Models/data';

const retrieveAllEntries = (request, response) => {
    response.status(200).json({ data: models[0].allentries });
};

const retrieveSpecificEntry = (request, response) => {
    const seen = models[1].specificEntry.find((sentry) => {
        return sentry.entry_title === request.params.entry_title;
    });
    if (seen) {
        response.status(200).json(seen);
    }
    else {
        response.status(404).json({ message: 'Entry not found', status: 404 });
    }
};

const addentry = (request, response) => {
    const aentryIds = models[0].allentries.map(entry => entry.id);
    const nentryId = aentryIds.length > 0 ? Math.max.apply(Math, aentryIds) + 1 : 1;
    const nentry = {
        id: nentryId,
        entry_title: request.body.entry_title,
        entry_date: request.body.entry_date,
        posted: request.body.posted,
        viewed: request.body.viewed,
    };
    const nentrycontent = {
        id: nentryId,
        entry_title: nentry.entry_title,
        entry_date: "On " + nentry.entry_date + ", 2019",
        entry_content: request.body.entry_content,
    };
    if (nentry && nentrycontent) {
    const newAllEntries = models[0].allentries.push(nentry);
    const nentrycont = models[1].specificEntry.push(nentrycontent);
    response.status(201).json({ addedentry: nentry, newentries: newAllEntries, newentry: nentrycontent, newentr: nentrycont });
    }
    else {
        response.status(404).json({ message: 'Please enter correct information', status: 404 });
    }
};

const modifyentry = (request, response) => {
    const seen = models[0].allentries.find((sentry) => {
        return sentry.entry_title === request.params.entry_title;
    });
    if (seen) {
        const editedentries = {
            id: seen.id,
            entry_title: request.body.entry_title,
            entry_date: request.body.entry_date,
            posted: request.body.posted,
            viewed: request.body.viewed 
        };
        const editedentrycont = {
            id: seen.id,
            entry_title: editedentries.entry_title,
            entry_date: "On " + editedentries.entry_date + ", 2019",
            entry_content: request.body.entry_content
        };
        const changes = models[0].allentries.indexOf(seen);
        const nentries = models[0].allentries.splice(changes,1,editedentries);
        const entrychanges = models[1].specificEntry.indexOf(seen);
        const updatedentry = models[1].specificEntry.splice(entrychanges,1,editedentrycont);
        response.status(200).json({ message: 'Entry successfully modified', status: 200, nentries, updatedentry });
    }
    else {
        response.status(404).json({ message: 'Entry not found', status: 404 });
    }
};

const entrydelete = (request, response) => {
    const seen = models[0].allentries.find((sentry) => {
        return sentry.entry_title === request.params.entry_title;
    });
    if (seen) {
        const changes = models[0].allentries.indexOf(seen);
        const newentries = models[0].allentries.splice(changes,1);
        const entrydel = models[1].specificEntry.indexOf(seen);
        const delentry = models[1].specificEntry.splice(entrydel,1);
        response.status(200).json({message: 'Entry deleted', newenntries: newentries, deletedentry: delentry});
    }
    else {
        response.status(404).json({message: 'Entry not found', status: 404});
    }
};

export default [retrieveAllEntries,retrieveSpecificEntry,addentry,modifyentry,entrydelete];
