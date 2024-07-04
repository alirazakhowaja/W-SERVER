const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Must provide name'],
        trim: true,
        maxlength: [20, 'Name cannot be more than 20 characters']
    },
    userEmail: {
        type: String,
        required: [true, 'Must provide email'],
        trim: true,
        lowercase: true,
        unique: true,
        // Validate email format using regex
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    }
});

module.exports = mongoose.model('User', userSchema);