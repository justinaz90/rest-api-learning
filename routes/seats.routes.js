const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(item => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const booking = {
    id: uuidv4(), 
    day: req.body.day, 
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  }
  if(db.seats.some(chosenSeat => (chosenSeat.day == req.body.day && chosenSeat.seat == req.body.seat))) {
    return res.status(404).json({ message: 'This slot is already taken' });
  } else {
    db.seats.push(booking);
    return res.json(db.seats);
  }
});

router.route('/seats/:id').put((req, res) => {
  const item = db.seats.find(({id}) => id == req.params.id);
  if (item){
    item.day = req.body.day;
    item.seat = req.body.seat;
    item.client = req.body.client;
    item.email = req.body.email;
  }
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  const itemIndex = db.seats.findIndex(({id}) => id == req.params.id);
  if(itemIndex >= 0 ) {
    db.seats.splice(itemIndex, 1);
    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'ID not found' });
  }
});

module.exports = router;