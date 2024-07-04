const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({
            $or: [
                { userEmail: req.body.userEmail },
                { userName: req.body.userName }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or username already exists.' });
        }

        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = createUser;