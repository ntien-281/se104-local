import { useState, useMemo, useEffect } from 'react';
import { Typography, Stack } from '@mui/material';
import { Container, TableContainer } from '../../components/Container';
import { useUserStore } from '../../../store';
import { getAllProducts } from '../../api/product';
import { getAllBuyForms } from '../../api/buy';
import { getAllSellForms } from '../../api/sell';
import { countQuantity } from '../../utils/countQuantity';

const StockReport = () => {
  const token = useUserStore((state) => state.token);

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
        field: 'producttypeid',
        headerName: 'Tồn đầu',
        headerAlign: 'center',
        align: 'center',
        width: 120,
        disableColumnMenu: true,
      },
      {
        field: 'in',
        headerName: 'Mua vào',
        headerAlign: 'center',
        align: 'center',
        width: 120,
        disableColumnMenu: true,
      },
      {
        field: 'out',
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
        producttypeid: 'In process',
        in: countQuantity(buyFormData, product.id, '06', '2023'),
        out: countQuantity(sellFormData, product.id, '06', '2023'),
        stock: product.stock,
        unit: product.ProductType.unit,
      };
    });
  }, [sellFormData, buyFormData]);

  return (
    <Stack spacing={2} sx={{ p: '20px' }}>
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
