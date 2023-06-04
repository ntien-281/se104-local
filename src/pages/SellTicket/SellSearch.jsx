import { useState, useMemo } from 'react';
import { SearchContainer, TableContainer } from '../../components/Container/';
import { ControlButton } from '../../components/Controls';
import ProductDetailModal from '../../components/Modal/ProductDetailModal';
import formData from '../formData';

const initialSearchInput = '';

const SellSearch = ({ show }) => {
  const [open, setOpen] = useState(false);
  const [rowID, setRowID] = useState(0);

  const handleDetailButton = (rowID) => {
    setRowID(rowID);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  // SearchBox
  const [SearchInput, setSearchInput] = useState(initialSearchInput);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const deleteSearchInput = () => {
    setSearchInput(initialSearchInput);
  };

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
      { field: 'id', headerName: 'Mã phiếu', width: 100, disableColumnMenu: true },
      { field: 'customerName', headerName: 'Khách hàng', width: 350, disableColumnMenu: true },
      {
        field: 'totalPaid',
        headerName: 'Tổng thanh toán',
        headerAlign: 'center',
        align: 'center',
        width: 170,
        sortComparator: (v1, v2) => {
          const num1 = Number(v1.replace(/\D/g, ''));
          const num2 = Number(v2.replace(/\D/g, ''));
          return num1 - num2;
        },
        disableColumnMenu: true,
      },
      {
        field: 'date',
        headerName: 'Ngày thanh toán',
        headerAlign: 'center',
        align: 'center',
        width: 170,
        disableColumnMenu: true,
      },
      {
        field: 'actions',
        type: 'actions',
        align: 'center',
        width: 100,
        getActions: (param) => [
          <ControlButton onClick={() => handleDetailButton(param.row.key)} color="secondary" variant="text">
            <b>Chi tiết</b>
          </ControlButton>,
        ],
      },
    ],
    [handleDetailButton],
  );

  const rows = useMemo(() => {
    return formData.map((form, index) => {
      return {
        key: index,
        no: index + 1,
        id: form.id,
        customerName: form.user,
        totalPaid: `₫${form.totalPaid.toLocaleString()}`,
        date: form.date,
      };
    });
  }, [formData]);

  return (
    <SearchContainer
      show={show}
      title="Tra cứu phiếu bán"
      value={SearchInput}
      onChange={handleSearchInput}
      onClick={deleteSearchInput}
    >
      <ProductDetailModal open={open} onButtonClose={handleClose} title="Phiếu bán hàng" formData={formData[rowID]} />
      {show ? <TableContainer columns={columns} rows={rows} SearchInput={SearchInput} /> : 'Loading...'}
    </SearchContainer>
  );
};

export default SellSearch;
