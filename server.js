const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const cors = require('cors');

const app = express();

const testimonalsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', testimonalsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});