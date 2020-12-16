import express from 'express';
import mongoDb from 'mongodb';

const router = express.Router();
const { ObjectId } = mongoDb;

router.get('/', (req, res) => {
  res.render('users/index.ejs');
});

router.post('/show', (req, res) => {
  req.database.collection('data').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Salvando no Banco de Dados');
    res.redirect('/user/show');
  });
});

router.get('/show', (req, res) => {
  req.database
    .collection('data')
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('users/show.ejs', { data: results });
    });
});

router
  .route('/edit/:id')
  .get((req, res) => {
    const { id } = req.params;
    req.database
      .collection('data')
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render('users/edit.ejs', { data: result });
      });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;
    req.database.collection('data').updateOne(
      { _id: ObjectId(id) },
      {
        $set: { name, surname },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect('/user/show');
        console.log('Atualizando no Banco de Dados');
      }
    );
  });

router.route('/delete/:id').get((req, res) => {
  const { id } = req.params;
  req.database
    .collection('data')
    .deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) return res.send(500, err);
      console.log('Deletado do Banco de Dados!');
      res.redirect('/user/show');
    });
});

export default router;
