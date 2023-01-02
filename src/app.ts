import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { mongoURI } from './config/configs';
import appRouter from './routes';
import cors from 'cors';
import { errorHandler } from './middlewares/error';
import passport from 'passport';
import { jwtStrategy } from './config/passport';

config();

const app: Application = express();
const port = 3500;

// mongo connection
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.log('MongoDB connection error:');
    });

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api/v1', appRouter);

// handle error
app.use(errorHandler);

export default app;

app.listen(process.env.PORT || port, () => {
    console.log(`App listening on port ${port}`);
});
