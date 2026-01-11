const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(400).json({ error: "بيانات الدخول غير صحيحة" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, message: "تم تسجيل الدخول بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
});
module.exports = router;