import moment from 'moment';
import { entryValidation } from '../Middlewares/valid';
import models from '../Models/data';
import { pool } from '../Config/db';

const retrieveAllEntries = async (request, response) => {
    const query = 'SELECT * FROM entries';
    const view = await pool.query(query);
    return response.status(200).json({
        status: 200,
        message: 'Retrieve users successfully',
        entries: view.rows,
    });
};

const retrieveSpecificEntry = async (request, response) => {
    const id = parseInt(request.params.id);
    const values = [id];
    const query = `SELECT * FROM entries WHERE eid = $1`;
    const view = await pool.query(query, values);
    if (view.rows < '1') {
        response.status(404).json({
            status: 404,
            message: 'Entry not found'
        });
    }
    else {
        response.status(200).json({
            status: 200,
            message: 'That entry exists',
            entry: view.rows,
        });
    }
};

const addentry = async (request, response) => {
    const { error } = entryValidation.validation(request.body);
    if (error) {
        return response.status(400).json({ status: 400, error: error.details[0].message });
    }
    const entryDate = moment().format('ll');
    const {
        entryTitle,
        posted,
        viewed,
        entryContent,
    } = request.body;
    const query = 'INSERT INTO entries(eTitle,eDate,ePosted,eViewed,eContent) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [entryTitle, entryDate, posted, viewed, entryContent];

    const result = await pool.query(query, values);
    return response.status(201).send({
        status: 201,
        message: 'Data successfully inserted',
        data: result.rows[0],
    });
};

const modifyentry = (request, response) => {
    const seen = models.find((sentry) => {
        return sentry.id === parseInt(request.params.id);
    });
    if (seen) {
        const { error } = entryValidation.validation(request.body);
        if (error) {
            return response.status(400).json({ status: 400, error: error.details[0].message });
        }
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
