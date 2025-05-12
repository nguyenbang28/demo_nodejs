const express = require('express');
const router = express.Router();
const UserController = require('../controllers/demoController');
const {body} = require('express-validator');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    console.log('authorization: ' + req.headers['authorization']);
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('token: ' + token);
    if (!token) return res.status(401).json({ message: 'Token required'});

    jwt.verify(token, 'token', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });

        req.user = user;
        next();
    });
}

router.post('/login', UserController.login)

router.post('/users', verifyToken, [body('input').notEmpty().withMessage('Input is required')], UserController.getValues);

module.exports = router;