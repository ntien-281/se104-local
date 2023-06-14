import { useState, useMemo, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';
import { Container, TableContainer } from '../../components/Container';
import { useUserStore } from '../../../store';
import { getAllProducts } from '../../api/product';
import { getAllTypes } from '../../api/producttype';
import { getAllBuyForms } from '../../api/buy';
import { getAllSellForms } from '../../api/sell';
import { countQuantity } from '../../utils/countQuantity';

const StockReport = ({ show }) => {
  const token = useUserStore((state) => state.token);

  // TODO: call api
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [sellFormData, setSellFormData] = useState([]);
  const [buyFormData, setBuyFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getAllProducts(token).then((res) => {
          setProducts(res.data);
        });
        await getAllTypes(token).then((res) => {
          setTypes(res.result.data);
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

  // Data
  const columns = useMemo(
    () => [
      {
        field: 'no',
        headerName: '#',
        headerAlign: 'center',
        align: 'center',
        width: 50,
        disableColumnMenu: true,
      },
      {
        field: 'name',
        headerName: 'Sản phẩm',
        width: 250,
        disableColumnMenu: true,
      },
      {
        field: 'firstStock',
        headerName: 'Tồn đầu',
        headerAlign: 'center',
        align: 'center',
        width: 120,
        disableColumnMenu: true,
      },
      {
        field: 'buy',
        headerName: 'Mua vào',
        headerAlign: 'center',
        align: 'center',
        width: 120,
        disableColumnMenu: true,
      },
      {
        field: 'sell',
        headerName: 'Bán ra',
        headerAlign: 'center',
        align: 'center',
        width: 120,
        disableColumnMenu: true,
      },
      {
        field: 'stock',
        headerName: 'Tồn cuối',
        headerAlign: 'center',
        align: 'center',
        width: 120,
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
      return {
        key: index,
        no: index + 1,
        id: product.id,
        name: product.name,
        firstStock: 'In process',
        buy: countQuantity(buyFormData, product.id, '06', '2023'),
        sell: countQuantity(sellFormData, product.id, '06', '2023'),
        stock: product.stock,
        unit: types.find((type) => type.id === product.ProductTypeId).unit,
      };
    });
  }, [sellFormData, buyFormData]);

  return (
    <Stack spacing={2} sx={{ p: '20px', display: `${show ? 'block' : 'none'}` }}>
      <Container>
        <Stack width="100%" mt="20px" mb="12px">
          <Typography variant="h4" textAlign="center">
            <b>BÁO CÁO TỒN KHO</b>
          </Typography>
          <Typography variant="h6" textAlign="center">
            Tháng 6/2023
          </Typography>
        </Stack>
        <TableContainer columns={columns} rows={rows} />
      </Container>
    </Stack>
  );
};

export default StockReport;
