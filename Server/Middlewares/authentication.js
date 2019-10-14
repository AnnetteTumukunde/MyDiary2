import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (request, response, next) => {
    const token = request.headers.authorization;
    if (!token) {
        return response.status(400).send({
            status: 400,
            message: 'Can not provide token. Access denied.'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        request.user = decoded;
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
