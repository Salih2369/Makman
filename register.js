const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: "المستخدم موجود مسبقاً" });

        user = new User({ email, password });
        await user.save();
        res.status(201).json({ message: "تم إنشاء الحساب بنجاح" });
    } catch (err) {
        res.status(500).json({ error: "خطأ في السيرفر" });
    }
});
module.exports = router;