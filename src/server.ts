import cors from 'cors';
import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import './database';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(+process.env.PORT || 3000, () =>
  console.log(`Server is started in port ${process.env.PORT || 3000}`),
);
