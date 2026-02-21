const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const questionsRoute = require('./routes/questions');
app.use('/api/questions', questionsRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ExamReady API!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});