import express from 'express';
import mongoDb from 'mongodb';

const router = express.Router();
const { ObjectId } = mongoDb;

router.get('/', (req, res) => {
  const { database } = req;
  database
    .collection('campgrounds')
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('campgrounds/index.ejs', { campgrounds: results });
    });
});

router.post('/', (req, res) => {
  const { database } = req;
  database.collection('campgrounds').insertOne(req.body, (err, result) => {
    if (err) return console.log(err);
    res.redirect('/campground');
  });
});

router.get('/new', (req, res) => {
  res.render('campgrounds/new.ejs');
});

router
  .route('/edit/:id')
  .get((req, res) => {
    const { id } = req.params;
    const { database } = req;
    database
      .collection('campgrounds')
      .findOne(ObjectId(id))
      .then((result) =>
        res.render('campgrounds/edit.ejs', { campground: result })
      )
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    const { id } = req.params;
    const { name, image, description } = req.body;
    req.database.collection('campgrounds').updateOne(
      { _id: ObjectId(id) },
      {
        $set: { name, image, description },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect('/campground');
      }
    );
  });

router.route('/delete/:id').get((req, res) => {
  const { id } = req.params;
  req.database
    .collection('campgrounds')
    .deleteOne({ _id: ObjectId(id) }, (err, result) => {
      if (err) return res.send(500, err);
      res.redirect('/campground');
    });
});

export default router;
