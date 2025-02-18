import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ExpenseBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get('http://localhost:5000/api/transactions');
            const groupedData = response.data.reduce((acc, curr) => {
                const category = curr.category.name;
                if (!acc[category]) acc[category] = 0;
                acc[category] += curr.amount;
                return acc;
            }, {});
            setData(Object.entries(groupedData).map(([name, value]) => ({ name, value })));
        };
        fetchTransactions();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ExpenseBarChart;
