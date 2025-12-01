import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import cp from 'cookie-parser'

import connectDB from './utils/connectDB';
import authRoutes from './routes/auth.route'
import promptRoutes from './routes/prompt.route'
import commentRoutes from './routes/comment.route'
import sandboxRoutes from './routes/sandbox.route'

import { notFound } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';
import { sessionVerify } from './middleware/sessionverify';

const app = express();
const PORT = process.env.PORT;
 
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
));
app.use(morgan('dev'));
app.use(express.json());
app.use(cp());
app.use(express.urlencoded({ extended: true }));


app.use('/api', authRoutes)
app.use('/api', sessionVerify, promptRoutes)
app.use('/api', sessionVerify, commentRoutes)
app.use('/api', sessionVerify, sandboxRoutes)

app.use(notFound);
app.use(errorHandler);  

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});