const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Ensure this properly sets up the database connection
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error:', err));

app.use(express.json());

// Ensure the path is correct and the model is properly defined
const Person = require('./Model/person');  

// Root route
app.get('/', function (req, res) {
  res.send('Welcome to my hotel... How can I help you?');
});

// Route to create a new person
app.post('/person', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    res.status(200).json(response);
  } catch (err) {
    console.error('Error saving person:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all persons
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log('Data fetched:', data);
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
