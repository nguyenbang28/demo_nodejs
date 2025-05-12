const UserModel = require('../models/demoModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash('admin', 10);
        const userFake = { username: 'admin', password: hashedPassword };
        console.log("passwordHashed: " + hashedPassword);
        if (username !== userFake.username) return res.status(401).json({ message: 'Account is not register!' })

        const checkPw = await bcrypt.compare(password, userFake.password);
        if (!checkPw) return res.status(401).json({ message: 'Wrong password!' });

        const token = jwt.sign({ username }, 'token', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error!' })
    }
}

async function getValues(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const value = await UserModel.getValue();
        return res.json(value);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error!' });
    }
}

module.exports = { getValues, login };
