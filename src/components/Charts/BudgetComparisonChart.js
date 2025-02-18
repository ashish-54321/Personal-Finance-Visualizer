import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetComparisonChart = ({ data }) => {
    // Add dummy data for actual values if not present
    const updatedData = data.map((item) => ({
        ...item,
        actual: item.actual || Math.floor(Math.random() * (item.budget + 100)), // Random value if actual is missing
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={updatedData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="budget" fill="#8884d8" />
                <Bar dataKey="actual" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BudgetComparisonChart;
