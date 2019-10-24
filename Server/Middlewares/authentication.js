import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { pool } from '../Config/db';

dotenv.config();

const auth = async (request, response, next) => {
    const token = request.headers['x-access-token'];
    if (!token) {
        return response.status(400).send({
            status: 400,
            message: 'Can not provide token. Access denied.'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const query = 'SELECT * FROM users WHERE uid = $1';
        const result = await pool.query(query, [decoded.uid]);
        if (!result.rows[0]) {
            return response.status(400).send({ message: 'Invalid provided token.' });
        }
        request.user = { id: decoded.uid };
        next();
    } 
    catch (exception) {
        return response.status(401).send({
            status: 401,
            message: 'Invalid token.'
        });
    }
 };
 
 export default auth;
