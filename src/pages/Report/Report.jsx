import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import AppHeader from '../../components/AppHeader';
import SaleReport from './SaleReport';
import StockReport from './StockReport';
import { useUserStore } from '../../../store';

const Report = () => {
  const [value, setValue] = useState('sale');

  const handleTabButton = (event, newValue) => {
    if (value !== newValue) {
      setValue(newValue);
    }
  };

  const setUsername = useUserStore((state) => state.setUsername);
  const setToken = useUserStore((state) => state.setToken);

  const navigate = useNavigate();

  useEffect(() => {
    const usernameStorage = localStorage.getItem('username');
    const tokenStorage = localStorage.getItem('token');
    if (usernameStorage && tokenStorage) {
      setUsername(usernameStorage);
      setToken(tokenStorage);
      navigate('/report');
    } else {
      navigate('/login');
    }
  }, []);
  return (
    <>
      <AppHeader>BÁO CÁO</AppHeader>
      <Box sx={{ color: 'black', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabButton}>
          <Tab label="Báo cáo hàng tháng" value={'sale'}></Tab>
          <Tab label="Báo cáo tồn kho" value={'stock'}></Tab>
        </Tabs>
      </Box>
      <main>{value === 'form' ? <SaleReport show={true} /> : <StockReport />}</main>
    </>
  );
};

export default Report;
