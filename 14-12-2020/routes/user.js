import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.post('/show', (req, res) => {
  const { name, surname } = req.body;

  User.create({ name, surname })
    .then(() => res.redirect('/user/show'))
    .catch((err) => console.log(err.message));
});

router.get('/show', (req, res) => {
  User.find({}, (err, results) => {
    if (err) return console.log(err);
    res.render('show.ejs', { data: results });
  });
});

router
  .route('/edit/:id')
  .get((req, res) => {
    const { id } = req.params;
    User.findById(id, (err, result) => {
      if (err) return console.log(er);
      res.render('edit.ejs', { data: result });
    });
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name, surname } = req.body;
    User.findByIdAndUpdate(
      id,
      {
        $set: { name, surname },
      },
      (err) => {
        if (err) return res.send(err);
        res.redirect('/user/show');
      }
    );
  });

router.route('/delete/:id').get((req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect('/user/show');
  });
});

export default router;
