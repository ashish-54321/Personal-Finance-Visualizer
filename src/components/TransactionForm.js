import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, MenuItem } from '@mui/material';
import axios from 'axios';

const TransactionForm = () => {
    const [formData, setFormData] = useState({ category: '', amount: '', date: '', description: '' });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get('https://personal-finance-visualizer-7k97.onrender.com/api/categories');
            setCategories(res.data);
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://personal-finance-visualizer-7k97.onrender.com/api/transactions', formData);
        setFormData({ category: '', amount: '', date: '', description: '' });
        window.location.reload(); // Refresh to show new transaction
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Add Transaction</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        name="category"
                        label="Category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat._id} value={cat._id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="amount"
                        label="Amount"
                        type="number"
                        value={formData.amount}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        name="date"
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">Add Transaction</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default TransactionForm;
