import { useState, useMemo, useEffect } from 'react';
import { Typography, Stack, TextField } from '@mui/material';
import { Container, TableContainer } from '../../components/Container';
import { useUserStore } from '../../../store';
import { getAllProducts } from '../../api/product';
import { getAllBuyForms } from '../../api/buy';
import { getAllSellForms } from '../../api/sell';
import { countQuantity } from '../../utils/countQuantity';

import { isNumberOnly } from '../../reducer/form';


const StockReport = () => {
  const token = useUserStore((state) => state.token);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [monthError, setMonthError] = useState(false)
  const [yearError, setYearError] = useState(false);

  // TODO: call api
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [sellFormData, setSellFormData] = useState([]);
  const [buyFormData, setBuyFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getAllProducts(token).then((res) => {
          setProducts(res.data);
        });
        await getAllSellForms(token).then((res) => {
          setSellFormData(res.data);
        });
        await getAllBuyForms(token).then((res) => {
          setBuyFormData(res.data);
        });
        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);



  const handleChangeMonth = (e) => {
    if (Number(e.target.value) <= 0 || Number(e.target.value) > 12) {
      setMonthError(true);
    } else {
      setMonthError(false);
    }
    setMonth(e.target.value);
  }
  const handleChangeYear = (e) => {
    if (Number(e.target.value) <= 2000 || Number(e.target.value) > 2400) {
      setYearError(true);
    } else {
      setYearError(false);
    }
    setYear(e.target.value);
  }

  // Data
  const columns = useMemo(
    () => [
      {
        field: 'no',
        headerName: '#',
        headerAlign: 'center',
        align: 'center',
        width: 100,
        disableColumnMenu: true,
      },
      {
        field: 'name',
        headerName: 'Sản phẩm',
        width: 350,
        disableColumnMenu: true,
      },
      {
        field: 'prevStock',
        headerName: 'Tồn đầu',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: 'in',
        headerName: 'Mua vào',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: 'out',
        headerName: 'Bán ra',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: 'stock',
        headerName: 'Tồn cuối',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
      },
      {
        field: 'unit',
        headerName: 'Đơn vị',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        disableColumnMenu: true,
      },
    ],
    [],
  );

  const rows = useMemo(() => {
    return products.map((product, index) => {
      const prev_stock = product.stock + countQuantity(sellFormData, product.id, Number(month), Number(year)) - countQuantity(buyFormData, product.id, Number(month), Number(year));
      return {
        key: index,
        no: index + 1,
        id: product.id,
        name: product.name,
        prevStock: prev_stock,
        in: countQuantity(buyFormData, product.id, Number(month), Number(year)),
        out: countQuantity(sellFormData, product.id, Number(month), Number(year)),

        stock: product.stock,
        unit: product.ProductType.unit,
      };
    });
  }, [sellFormData, buyFormData, month, year]);

  return (
    <Stack spacing={2} sx={{ p: '20px' }}>
      <Container>
        <Stack width="100%" mt="20px" mb="12px">
          <Typography variant="h4" textAlign="center" mb="24px">
            <b>BÁO CÁO TỒN KHO</b>
          </Typography>
          <Typography variant="h6" textAlign="center">
            <TextField
              value={month}
              name={month}
              onChange={handleChangeMonth}
              error={monthError}
              helperText={monthError ? "Kiểm tra lại" : ""}
              inputProps={{
                style: {
                  fontSize: "1.8rem",
                  height: 15,
                  textAlign: "center",
                },
                type: "number",
                step: 1,
                min: 1,
                max: 12,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
            <TextField
              value={year}
              name={year}
              onChange={handleChangeYear}
              error={yearError}
              helperText={yearError ? "Kiểm tra lại" : ""}
              inputProps={{
                style: {
                  fontSize: "1.8rem",
                  height: 15,
                  textAlign: "center",
                },
                type: "number",
                step: 1,
                min: 2020,
                max: 2023,
                inputMode: "numeric",
                pattern: "[0-9]*",
              }}
            />
          </Typography>
        </Stack>
        {(Number(month) <= 0 || Number(month) > 12 || Number(year) <= 2019 || Number(year) > 2023) ?
        <Typography
          sx={{
            fontSize: '2.4rem',
            textAlign: 'center',
            color: 'green'
          }}
        >Chọn tháng và năm</Typography> : <TableContainer columns={columns} rows={rows} />}
        
      </Container>
    </Stack>
  );
};

export default StockReport;