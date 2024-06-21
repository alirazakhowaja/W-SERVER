const express = require('express');
const app = express();
const router = require('./routes/user');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.json());
app.use('/', router);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    } catch (error) {
        console.log(error);
    }
}

start();