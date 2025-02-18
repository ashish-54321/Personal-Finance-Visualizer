import React from 'react';
import { Container, Typography } from '@mui/material';
import Dashboard from '../components/Dashboard';

const Home = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Dashboard />
        </Container>
    );
};

export default Home;