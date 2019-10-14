import express from 'express';
import bodyparser from 'body-parser';
import allroutes from './Routes/allRoutes';
import '@babel/polyfill';

const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/', allroutes);
app.use('/api/v1', (request, response) => {
    response.send({ message: 'Server running successfully' });
});
const PORT = process.env.PORT || 3201;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export default app;
