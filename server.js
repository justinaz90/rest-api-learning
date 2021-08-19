const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

const testimonalsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatRoutes = require('./routes/seats.routes');

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonalsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

// const dbURI = process.env.NODE_ENV === 'production' 
//   ? 'mongodb+srv://justyna-szewczyk:testapp@cluster0.30cel.mongodb.net/NewWaveDB?retryWrites=true&w=majority'
//   : 'mongodb://localhost:27017/NewWaveFestivalDB';

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect('mongodb+srv://justyna-szewczyk:testapp@cluster0.30cel.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

// module.exports = server;

const io = socket(server, { 
  cors: { 
    origin: '*' 
  } 
});

io.on('connection', (socket) => {
  console.log('New client! ' + socket.id);
});
