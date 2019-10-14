import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userValidation } from '../Middlewares/valid';
import { pool } from '../Config/db';

dotenv.config();
const adduser = async (request, response) => {
    const { error } = userValidation.validation(request.body);
    if (error) {
        return response.status(400).json({ status: 400, error: error.details[0].message });
    }
    const emailcheck = request.body.email;
    const findquery = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(findquery, [emailcheck]);
    if (result.rows[0]) {
        return response.status(400).json({
            status: 400,
            message: 'Email exists'
        });
    }
    const hashpwd = bcrypt.hashSync(request.body.password.trim(),10);
    const {
        firstname,
        lastname
    } = request.body;
    const query = 'INSERT INTO users(FirstName, LastName, email, password) VALUES($1,$2,$3,$4) RETURNING *';
    const values = [firstname, lastname, emailcheck, hashpwd];

    const add = await pool.query(query, values);
    const payload = { firstname, lastname, emailcheck };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    return response.status(201).send({
        status: 201,
        message: 'User successfully inserted. Create a journal and start writing your entries',
        token,
        users: add.rows[0],
    });
};

export default adduser;
