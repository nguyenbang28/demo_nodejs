const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/demoModel')

async function login(req, res) {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username})
        if (!user) return res.status(401).json({message: 'Account is not register!'})

        const checkPw = await bcrypt.compare(password, user.password);
        if (!checkPw) return res.status(401).json({message: 'Wrong password!'});

        const token = jwt.sign({username}, 'token', {expiresIn: '1h'});
        res.json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error!'})
    }
}

async function getValues(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: 'Không thể lấy dữ liệu'});
    }
}

async function createUser(req, res) {
    const newUser = {
        username: req.body.name,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    };
    newUser.password = await bcrypt.hash(newUser.password, 10);

    try {
        const savedUser = await User.create(newUser);
        return res.json(savedUser);
    } catch (err) {
        res.stats(500).json({message: 'Error saving: ' + err});
    }
}

async function updateUser(req, res) {
    try {
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        };
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findOneAndUpdate(
            {username: req.query.username},
            updateData,
            {new: true}
        );

        if (!updatedUser) {
            return res.status(404).json({message: `Not found username: ${req.params.username}`});
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({message: 'Error Updating', error});
    }
}

module.exports = {getValues, login, createUser, updateUser};
