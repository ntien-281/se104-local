import React from 'react';
import { Typography, Stack } from '@mui/material';

const SaleReport = ({ show }) => {
  return (
    <Stack spacing={2} sx={{ p: '20px', display: `${show ? 'block' : 'none'}` }}>
      <h1>Sale Report</h1>
    </Stack>
  );
};

export default SaleReport;
