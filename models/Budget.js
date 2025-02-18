const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Budget', BudgetSchema);
