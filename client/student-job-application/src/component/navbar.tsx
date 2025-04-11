import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import logo from './logo.png';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#a2d2ff', boxShadow: 'none' }}>
      <Toolbar>
        <Box component="img" src={logo} alt="logo" sx={{ height: 50 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
