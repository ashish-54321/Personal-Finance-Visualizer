import React from 'react';
import { Container, Typography } from '@mui/material';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';

const Transactions = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Transactions</Typography>
            <TransactionForm />
            <TransactionList />
        </Container>
    );
};

export default Transactions;