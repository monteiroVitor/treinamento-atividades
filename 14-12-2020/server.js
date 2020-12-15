const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const { DB_URI } = require('./helpers/config');

MongoClient.connect(
  DB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, client) => {
    if (err) return console.log(err);
    db = client.db('treinamentoDb');
    app.listen(3000, () => console.log('servidor rodando na porta 3000'));
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view egine', 'ejs');

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/show', (req, res) => {
  db.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Salvando no Banco de Dados');
    res.redirect('/show');
  });
});

app.get('/show', (req, res) => {
  db.collection('data')
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('show.ejs', { data: results });
    });
});

app
  .route('/edit/:id')
  .get((req, res) => {
    const { id } = req.params;
    db.collection('data')
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render('edit.ejs', { data: result });
      });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;
    db.collection('data').updateOne(
      { _id: ObjectId(id) },
      {
        $set: { name, surname },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect('/show');
        console.log('Atualizando no Banco de Dados');
      }
    );
  });

app.route('/delete/:id').get((req, res) => {
  const { id } = req.params;
  db.collection('data').deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log('Deletado do Banco de Dados!');
    res.redirect('/show');
  });
});
