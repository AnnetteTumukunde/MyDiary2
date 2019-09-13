import models from '../Models/data';

const retrieveAllEntries = (request,response) => {
    response.status(200).json(models[0].allentries);
};

const retrieveSpecificEntry = (request, response) => {
    let seen = models[1].specificEntry.find((sentry) => {
        return sentry.entry_title === request.params.entry_title;
    });
    if (seen) {
        response.status(200).json(seen);
    }
    else {
        response.status(404).json({message: "Entry not found", status: 404});
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
        viewed: request.body.viewed
    };
    const nentrycontent = {
        id: nentryId,
        entry_title: nentry.entry_title,
        entry_date: "On "+nentry.entry_date+", 2019",
        entry_content: request.body.entry_content
    };
    const newAllEntries = models[0].allentries.push(nentry);
    const nentrycont = models[1].specificEntry.push(nentrycontent);
    response.status(201).json({addedentry : nentry,newentries : newAllEntries,newentry : nentrycontent,newentries : nentrycont});
};

module.exports = [retrieveAllEntries,retrieveSpecificEntry,addentry];

