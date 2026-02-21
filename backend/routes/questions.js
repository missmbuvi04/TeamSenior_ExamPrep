const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all topics
router.get('/topics', (req, res) => {
  db.query('SELECT DISTINCT topic FROM questions', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get questions by topic
router.get('/:topic', (req, res) => {
  const topic = req.params.topic;
  db.query(
    'SELECT * FROM questions WHERE topic = ?',
    [topic],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// Submit answer and get feedback
router.post('/check', (req, res) => {
  const { questionId, answer } = req.body;
  db.query(
    'SELECT correct_answer, explanation FROM questions WHERE id = ?',
    [questionId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      const question = results[0];
      const isCorrect = question.correct_answer === answer;
      res.json({
        correct: isCorrect,
        correct_answer: question.correct_answer,
        explanation: question.explanation
      });
    }
  );
});

module.exports = router;