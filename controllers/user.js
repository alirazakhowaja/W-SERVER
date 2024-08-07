const axios = require('axios');
const User = require('../models/user');

const createUser = async (req, res) => {
    try {
        const { userEmail, userName } = req.body;

        // Validate email address using ZeroBounce API
        const response = await axios.get(`https://api.zerobounce.net/v2/validate`, {
            params: {
                api_key: 'e8a3b8bbe73c44de95499030b26e99ae',
                email: userEmail
            }
        });

        if (response.data.status !== 'valid') {
            return res.status(400).json({ error: 'Invalid email address.' });
        }

        // Check if a user with the same email or username already exists
        const existingUser = await User.findOne({
            $or: [
                { userEmail },
                { userName }
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