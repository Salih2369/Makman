const mongoose = require('mongoose');
const SubscriptionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    plan: String,
    price: Number,
    startDate: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Subscription', SubscriptionSchema);