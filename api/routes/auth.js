const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const validator = require('validator');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, emailOrPhone, password } = req.body;

    if (!name || !emailOrPhone || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const isEmail = validator.isEmail(emailOrPhone);
    const isPhone = validator.isMobilePhone(emailOrPhone);

    if (!isEmail && !isPhone) {
        return res.status(400).json({ message: 'Please provide a valid email or phone number' });
    }

    try {
        const existingUser = isEmail
            ? await User.findOne({ email: emailOrPhone })
            : await User.findOne({ phone: emailOrPhone });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const user = new User({
            name,
            password: hashedPassword,
            ...(isEmail ? { email: emailOrPhone } : { phone: emailOrPhone })
        });

        await user.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
        console.log('The error is: ', e)
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/signin', async (req, res) => {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        return res.status(400).json({ message: 'Please provide email/phone and password' });
    }

    try {
        const user = await User.findOne({
            $or: [
                { email: emailOrPhone },
                { phone: emailOrPhone }
            ]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;