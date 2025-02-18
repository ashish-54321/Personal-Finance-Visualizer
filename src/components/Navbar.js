import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Personal Finance Visualizer
                </Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
                <Button color="inherit" component={Link} to="/budgeting">Budgeting</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;