import moment from 'moment';
import { entryValidation } from '../Middlewares/valid';
import { pool } from '../Config/db';

const retrieveAllEntries = async (request, response) => {
    const query = 'SELECT * FROM entries';
    const view = await pool.query(query);
    return response.status(200).json({
        status: 200,
        message: 'Successful entries retrieve.',
        entries: view.rows,
    });
};

const retrieveSpecificEntry = async (request, response) => {
    const id = parseInt(request.params.id);
    const values = [id];
    const query = 'SELECT * FROM entries WHERE eid = $1';
    const view = await pool.query(query, values);
    if (view.rows < '1') {
        response.status(404).json({
            status: 404,
            message: 'This entry is not found.'
        });
    }
    else {
        response.status(200).json({
            status: 200,
            message: 'This entry exists.',
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
    const { entryTitle, posted, viewed, entryContent } = request.body;
    const query = 'INSERT INTO entries(eTitle,eDate,ePosted,eViewed,eContent) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [entryTitle, entryDate, posted, viewed, entryContent];
    const add = await pool.query(query, values);
    return response.status(201).send({
        status: 201,
        message: 'Entry successfully inserted.',
        entry: add.rows[0],
    });
};

const modifyentry = async (request, response) => {
    const { error } = entryValidation.validation(request.body);
        if (error) {
            return response.status(400).json({ status: 400, error: error.details[0].message });
        }
    const { entryTitle, posted, viewed, entryContent } = request.body;
    const query = 'UPDATE entries SET eTitle = $1, ePosted = $2, eViewed = $3, eContent = $4 WHERE eid = $5 RETURNING *';
    const values = [entryTitle, posted, viewed, entryContent, parseInt(request.params.id)];
    const edit = await pool.query(query, values);
    if (!edit.rows[0]) {
        response.status(404).json({
            status: 404,
            message: 'This entry is not found.'
        });
    }
    else {
        response.status(200).json({
            status: 200,
            message: 'Entry successfully updated.',
            entry: edit.rows[0]
        });
    }
};

const entrydelete = async (request, response) => {
    const query = 'DELETE FROM entries WHERE eid = $1 RETURNING *';
    const value = [parseInt(request.params.id)];
    const del = await pool.query(query, value);
    if (!del.rows[0]) {
        response.status(404).json({
            status: 404,
            message: 'This entry is not found.'
        });
    }
    else {
        response.status(200).json({
            status: 200,
            message: 'Entry successfully deleted.',
            entry: del.rows
        });
    }
};

export { retrieveAllEntries, retrieveSpecificEntry, addentry, modifyentry, entrydelete };
