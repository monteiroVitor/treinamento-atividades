import express from 'express';
import ConnectDB from './src/dbConnect.js';
import userRoutes from './src/routes/user.js';
import path from 'path';
const app = express();
let db;

ConnectDB()
  .then((database) => (db = database))
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view egine', 'ejs');

//middleware
const dbReference = (req, res, next) => {
  req.database = db;
  next();
};

//Rotas
app.use('/user', dbReference, userRoutes);
