const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => {
  db.testimonials.push({ 
    id: uuidv4(), 
    author: req.body.author, 
    text: req.body.text 
  });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  const item = db.testimonials.find(({id}) => id == req.params.id);
  if (item){
    item.author = req.body.author;
    item.text = req.body.text;
  }
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  const itemIndex = db.testimonials.findIndex(({id}) => id == req.params.id);
  db.testimonials.splice(itemIndex, 1);
  res.json({ message: 'OK' });
});

module.exports = router;