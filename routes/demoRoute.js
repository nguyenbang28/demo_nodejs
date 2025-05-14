const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');
const {body} = require('express-validator');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token required'});

    jwt.verify(token, 'token', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });

        req.user = user;
        next();
    });
}

router.post('/login', demoController.login)

router.post('/users', verifyToken, [body('input').notEmpty().withMessage('Input is required')], demoController.getValues);

router.post('/add', verifyToken, demoController.createUser);

router.post('/update', verifyToken, demoController.updateUser);

module.exports = router;