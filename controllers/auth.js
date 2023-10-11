const Realm = require('realm');
const User = require('../models/user');

const realmApp = new Realm.App({ id: process.env.APP_ID });

async function registerUser(email, password) {
    try {
        await realmApp.emailPasswordAuth.registerUser(email, password);
        return true; // Registration successful
    } catch (error) {
        console.error('Error registering user:', error);
        return false; // Registration failed
    }
}

exports.createRealmUser = async (req, res) => {
    let { email, password, role } = req.body;
    const registrationResult = await registerUser({ email, password });

    if (registrationResult) {
        const userRealm = await User.create({
            email,
            role
        })
        res.status(201).json({ message: 'User registered successfully', data: userRealm });
    } else {
        res.status(400).json({ message: 'User registration failed' });
    }
};