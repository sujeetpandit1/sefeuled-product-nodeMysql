const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { secret } = require('../config/jwt');

async function registerUser(userData) {
    const { username, password } = userData;

    try {
        const existingUser = await User.getByUsername(username);

        if (existingUser) {
            throw new Error('Username is already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword });
    } catch (error) {
        throw error;
    }
}

async function loginUser(username, password) {
    try {
        const user = await User.getByUsername(username);

        if (!user) {
            return null; // User not found
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return null; // Password does not match
        }

        return user;
    } catch (error) {
        throw error;
    }
}

async function googleLogin(googleProfile) {
    // Implement logic for Google authentication
    // This could involve checking if the Google user is already registered in your system,
    // or creating a new user account based on the Google profile.

    // For simplicity, let's assume a successful Google login creates a new user in our system.
    const { displayName, emails } = googleProfile;
    const username = emails[0].value; // Using the email as the username for simplicity

    try {
        const existingUser = await User.getByUsername(username);

        if (existingUser) {
            return existingUser;
        }

        // If the user does not exist, create a new user using the Google profile
        const newUser = await User.create({ username, password: '' });
        return newUser;
    } catch (error) {
        throw error;
    }
}

function generateToken(payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
}

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    generateToken,
};
