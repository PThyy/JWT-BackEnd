import express from 'express';
import configureViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
require('dotenv').config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import connection from './config/connectDB';

const app = express();
const PORT = process.env.PORT || 8080;

configCors(app);
configureViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 not found');
})

app.listen(PORT, () => {
    console.log(`JWT BE is running on port ` + PORT);
});