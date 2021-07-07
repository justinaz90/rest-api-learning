const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(item => item.id == req.params.id));
});

router.route('/concerts').post((req, res) => {
  db.concerts.push({ 
    id: uuidv4(), 
    performer: req.body.performer, 
    genre: req.body.genre, 
    price: req.body.price, 
    day: req.body.day, 
    image: req.body.image, 
  });
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const item = db.concerts.find(({id}) => id == req.params.id);
  if (item){
    item.performer = req.body.performer;
    item.genre = req.body.genre;
    item.price = req.body.price; 
    item.day = req.body.day;
    item.image = req.body.image;
  }
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const itemIndex = db.concerts.findIndex(({id}) => id == req.params.id);
  if(itemIndex >= 0 ) {
    db.concerts.splice(itemIndex, 1);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'ID not found' });
  }
});

module.exports = router;