const AuthService = require('../service/authService');

async function registerUser(req, res) {
    const userData = req.body;

    try {
        await AuthService.registerUser(userData);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        const user = await AuthService.loginUser(username, password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = AuthService.generateToken({ userId: user.id, username: user.username });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function googleLogin(req, res) {
    // Implement logic for Google authentication
    // This could involve redirecting the user to Google OAuth, handling the callback, etc.
    // For simplicity, let's just return a placeholder response.
    res.json({ message: 'Google login placeholder' });
}

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
};
