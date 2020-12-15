import mongoDb from 'mongodb';
import { DB_URI } from './helpers/config.js';

const { MongoClient } = mongoDb;
const client = new MongoClient(DB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const run = async () => {
  try {
    await client.connect();
    return client.db('treinamentoDb');
  } catch (err) {
    console.log(err);
  }
};

export default run;
