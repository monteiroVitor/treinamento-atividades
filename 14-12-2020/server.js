import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { DB_URI } from './helpers/config.js';
import userRoutes from './routes/user.js';
import indexRoutes from './routes/index.js';

const app = express();

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view egine', 'ejs');

//rotas
app.use('/', indexRoutes);
app.use('/user', userRoutes);
