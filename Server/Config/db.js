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
            FirstName VARCHAR(30) NOT NULL,
            LastName VARCHAR(30) NOT NULL,
            UserName VARCHAR(100) NOT NULL,
            password VARCHAR(30) NOT NULL
        )`;
    const MyEntriesTable = `CREATE TABLE IF NOT EXISTS
        entries(
            eid SERIAL PRIMARY KEY,
            eTitle VARCHAR(50) NOT NULL,
            eDate TIMESTAMP NOT NULL,
            ePosted VARCHAR(5) NOT NULL,
            eViewed VARCHAR(5) NOT NULL,
            eContent VARCHAR(200) NOT NULL
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
    console.log('client removed');
    process.exit(0);
});

module.exports = { pool, tableCreation };

require('make-runnable');
