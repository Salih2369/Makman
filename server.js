require('dotenv').config(); // تأكد أنه أول سطر
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// إعدادات CORS للسماح لـ React بالوصول
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ربط المسارات (Routes)
app.use('/api/auth/login', require('./routes/login'));
app.use('/api/auth/register', require('./routes/register'));

// الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Makman DB Connected Successfully..."))
    .catch(err => console.error("Database Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));