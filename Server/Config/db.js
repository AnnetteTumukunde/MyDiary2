import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
});

pool.on('connect', () => {
    console.log('connected to the Database');
});
const tableCreation = () => {
    const MyDiaryTable = `CREATE TABLE IF NOT EXISTS
        users(
            uid SERIAL PRIMARY KEY,
            FirstName VARCHAR(40) NOT NULL,
            LastName VARCHAR(40) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL
        )`;
    const MyEntriesTable = `CREATE TABLE IF NOT EXISTS
        entries(
            eid SERIAL PRIMARY KEY,
            eTitle VARCHAR(50) NOT NULL,
            eDate TIMESTAMP NOT NULL,
            ePosted VARCHAR(5) NOT NULL,
            eViewed VARCHAR(5) NOT NULL,
            eContent VARCHAR(200) NOT NULL,
            uid SERIAL CONSTRAINT uid REFERENCES users (uid) ON DELETE CASCADE
        )`;
        pool.query(`${MyDiaryTable}; ${MyEntriesTable}`)
            .then((response) => {
                console.log(response);
                pool.end();
            })
            .catch((error) => {
                console.log(error);
                pool.end();
            });
};

pool.on('remove', () => {
    console.log('Client removed');
});

export { pool, tableCreation };

require('make-runnable');
