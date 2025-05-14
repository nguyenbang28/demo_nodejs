const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {
        type: String,
        required: true,
    },
    email: String,
    age: Number,
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
