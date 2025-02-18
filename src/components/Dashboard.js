import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import CategoryPieChart from './Charts/CategoryPieChart';
import BudgetComparisonChart from './Charts/BudgetComparisonChart';
import ExpenseBarChart from './Charts/ExpenseBarChart';
import axios from 'axios';

const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoryRes = await axios.get('https://personal-finance-visualizer-7k97.onrender.com/api/categories');
            const budgetRes = await axios.get('https://personal-finance-visualizer-7k97.onrender.com/api/budgets');

            // Format the categories for PieChart
            const formattedCategories = categoryRes.data.map(cat => {
                const budget = budgetRes.data.find(b => b.category._id === cat._id);
                return {
                    name: cat.name,
                    amount: budget ? budget.amount : 0, // Set amount to 0 if no matching budget
                };
            });

            // Format the budgets for BudgetComparisonChart
            const formattedBudgets = categoryRes.data.map(cat => {
                const budget = budgetRes.data.find(b => b.category._id === cat._id);
                return {
                    category: cat.name,
                    budget: budget ? budget.amount : 0, // Set budget to 0 if no matching budget
                    actual: 0, // Add your logic here to get actual data if needed
                };
            });

            setCategories(formattedCategories);
            setBudgets(formattedBudgets);
        };

        fetchData();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h6">Monthly Expenses</Typography>
                    <ExpenseBarChart />
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Category Breakdown</Typography>
                        <CategoryPieChart data={categories} />
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Budget vs Actual</Typography>
                        <BudgetComparisonChart data={budgets} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
