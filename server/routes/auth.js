const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/challenge', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.post('/verify', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

module.exports = router;
