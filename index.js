// const http = require('http');
// const express = require('express');
import express from 'express';
import allroutes from './Server/Routes/allRoutes';
const app = express();
app.use(express.json());
app.use('/entries',allroutes);
app.use('/entries/entry',allroutes);
app.use('/', (request, response) => {
    response.send('Just checking the server.');
});
const port = 3201;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
