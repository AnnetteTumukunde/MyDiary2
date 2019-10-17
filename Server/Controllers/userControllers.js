import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userValidation, signinValidation } from '../Middlewares/valid';
import { pool } from '../Config/db';

dotenv.config();
const signup = async (request, response) => {
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
            message: 'That email exists'
        });
    }
    const hashpwd = bcrypt.hashSync(request.body.password.trim(),10);
    const { firstname, lastname } = request.body;
    const query = 'INSERT INTO users(FirstName, LastName, email, password) VALUES($1,$2,$3,$4) RETURNING *';
    const values = [firstname, lastname, emailcheck, hashpwd];

    const add = await pool.query(query, values);
    const payload = { firstname, lastname, emailcheck };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1m' });
    return response.status(201).json({
        status: 201,
        message: 'User successfully inserted.',
        token,
        user: add.rows[0],
    });
};

const signin = async (request, response) => {
    const { error } = signinValidation.validation(request.body);
    if (error) {
        return response.status(400).json({ status: 400, error: error.details[0].message });
    }
    const emailcheck = request.body.email;
    const findquery = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(findquery, [emailcheck]);
    if (!result.rows[0]) {
        return response.status(400).json({
            status: 400,
            message: 'Incorrect email address'
        });
    }
    const passwordcheck = bcrypt.compareSync(request.body.password.trim(), result.rows[0].password);
    if (!passwordcheck) {
        return response.status(400).json({
            status: 400,
            message: 'Incorrect password'
        });
    }
    const { uid, FirstName, LastName, email } = result.rows[0];
    const payload = { uid, FirstName, LastName, email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1m' });
    return response.status(201).json({
        status: 200,
        message: 'User successfully logged in.',
        token,
        user: result.rows[0],
    });
};

export { signup, signin };
