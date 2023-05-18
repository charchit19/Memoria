import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());  // core should be above app.use
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

// const DB = process.env.DATABASE;
const CONNECTION_URL = process.env.CONNECTION_URL

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {                       //to run the server
    console.log(`Server is running on ${PORT}`)
})

mongoose.set('strictQuery', true)
mongoose.connect(CONNECTION_URL).then(() => {
    console.log(`${PORT}`);
    console.log("Connection Success")
}).catch((err) => console.log(err));