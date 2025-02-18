import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetingForm = () => {

    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [insights, setInsights] = useState({ totalBudget: 0, totalActual: 0 });

    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://personal-finance-visualizer-7k97.onrender.com/api/categories');
                setCategories(res.data);
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        };

        const fetchBudgets = async () => {
            try {
                const res = await axios.get('https://personal-finance-visualizer-7k97.onrender.com/api/budgets');
                setBudgets(res.data);
                calculateInsights(res.data);
            } catch (error) {
                console.error('Failed to fetch budgets:', error);
            }
        };

        fetchCategories();
        fetchBudgets();
    }, []);

    const calculateInsights = (budgets) => {
        const totalBudget = budgets.reduce((sum, item) => sum + item.amount, 0);
        const totalActual = budgets.reduce((sum, item) => sum + (item.actual || 0), 0);
        setInsights({ totalBudget, totalActual });
    };




    const budgetData = budgets.map((item) => ({
        category: categories.find((cat) => cat._id === item.category)?.name || 'Unknown',
        budget: item.amount,
        actual: item.actual || Math.floor(Math.random() * (item.amount + 100)), // Dummy data for actual
    }));

    return (
        <Grid container spacing={2} justifyContent="center">

            <Grid item xs={12} md={6}>
                <Card sx={{ padding: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Budget vs Actual Comparison
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={budgetData}>
                                <XAxis dataKey="category" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="budget" fill="#8884d8" />
                                <Bar dataKey="actual" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card sx={{ padding: 2 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Spending Insights
                        </Typography>
                        <Typography>Total Budget: ₹{insights.totalBudget}</Typography>
                        <Typography>Total Actual Spending: ₹{insights.totalActual}</Typography>
                        <Typography>
                            {insights.totalActual > insights.totalBudget
                                ? 'You are overspending!'
                                : 'You are within budget!'}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default BudgetingForm;
