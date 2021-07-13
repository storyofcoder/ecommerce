const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const publicRoutes = require('./public.route');
const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/public', publicRoutes);

module.exports = router;
