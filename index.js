import express from 'express';
import bodyparser from 'body-parser';
import allroutes from './Server/Routes/allRoutes';
const app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/',allroutes);
const port = 3201;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
