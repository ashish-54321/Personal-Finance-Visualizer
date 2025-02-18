import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await axios.get('https://personal-finance-visualizer-7k97.onrender.com/api/transactions');
            setTransactions(res.data);
        };
        fetchTransactions();
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Transaction History</Typography>
                <List>
                    {transactions.map((transaction, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={`${transaction.category.name}: ₹${transaction.amount}`} secondary={transaction.date} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default TransactionList;