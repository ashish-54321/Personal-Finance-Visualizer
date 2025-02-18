const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('category');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new transaction
router.post('/', async (req, res) => {
    const { amount, date, description, category } = req.body;
    try {
        const transaction = new Transaction({
            amount,
            date,
            description,
            category,
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        await transaction.remove();
        res.json({ message: 'Transaction deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
