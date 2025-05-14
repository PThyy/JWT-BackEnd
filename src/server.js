import express from 'express';
import configureViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

configureViewEngine(app);

initWebRoutes(app);

app.listen(PORT, () => {
    console.log(`JWT BE is running on port ` + PORT);
});