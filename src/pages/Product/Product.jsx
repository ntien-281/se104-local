import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Box, Tab, Tabs } from '@mui/material';
import Products from './Products';
import ProductType from './ProductType';
import AppHeader from '../../components/AppHeader';
import { useUserStore } from '../../../store';

const Product = () => {
  const [value, setValue] = useState('products');

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
      navigate('/product');
    } else {
      navigate('/login');
    }
  }, []);


  return (
    <>
      <AppHeader>SẢN PHẨM</AppHeader>
      <Box sx={{ color: 'black', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs aria-label="basic tabs example" value={value} onChange={handleTabButton}>
          <Tab label="Sản phẩm" value={'products'}></Tab>
          <Tab label="Loại sản phẩm" value={'product-type'}></Tab>
        </Tabs>
      </Box>
      <main>
          { value === "products" ? <Products />: <ProductType /> }
      </main>
    </>
  );
};

export default Product;
