import express from 'express';
import configureViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config();
import bodyParser from 'body-parser';
// import connection from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 8080;

configureViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connection();

initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`JWT BE is running on port ` + PORT);
});