import express from 'express';
import __dirname from './util.js';
import config from './config/config.js';

import studentRouter from './routes/students.router.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/students", studentRouter);


app.listen(config.port, () => {
    console.log("Servidor escuchando por el puerto: " + config.port);
});
