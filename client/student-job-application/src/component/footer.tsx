import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        borderTop: '1px solid #ddd',
        textAlign: 'center',
        backgroundColor: '#778da9',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Shashank HL &nbsp;|&nbsp;
        <Link
          href="mailto:shashankgowda7275@gmail.com"
          underline="none"
          color="inherit"
        >
          shashankgowda7275@gmail.com
        </Link>
        &nbsp;|&nbsp;
        <Link
          href="tel:9731948014"
          underline="none"
          color="inherit"
        >
          9731948014
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
