import React, {useState, useMemo, useEffect} from 'react'
import { SearchContainer, TableContainer } from '../../components/Container'
import { ControlButton } from '../../components/Controls'
import ProductTypeUpdateModal from '../../components/Modal/ProductTypeUpdateModel'
import { getAllTypes } from '../../api/producttype'
import { useUserStore } from '../../../store'
import CreateProductTypeModal from '../../components/Modal/CreateProductTypeModal'


const ProductType = () => {

  const [searchInput, setSearchInput] = useState("")
  const [open, setOpen] = useState(false)
  const [rowID, setRowID] = useState(0)
  const token = useUserStore(state => state.token)
  const [types, setTypes] = useState([])
  const [refetch, setRefetch] = useState(false);
  const username = useUserStore(state => state.username);


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllTypes(token);
        setTypes(res.result.data);
        setError(false);
      } catch (err) {
        setError(true);
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [refetch]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDetailButton = (rowID) => {
    setRowID(rowID);
    handleOpen();
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
      { field: 'id', headerName: 'Mã loại sản phẩm', width: 100, disableColumnMenu: true },
      { field: 'name', headerName: 'Tên loại sản phẩm', width: 350, disableColumnMenu: true },
      {
        field: 'interest',
        headerName: 'Phần trăm',
        headerAlign: 'center',
        align: 'center',
        width: 100,
        sortComparator: (v1, v2) => {
          const num1 = Number(v1.replace(/\D/g, ''));
          const num2 = Number(v2.replace(/\D/g, ''));
          return num1 - num2;
        },
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
      {
        field: 'actions',
        type: 'actions',
        align: 'center',
        width: 100,
        getActions: (param) => [
          <ControlButton onClick={() => handleDetailButton(param.row.key)} color="secondary" variant="text"
          disabled={(username != "admin")}>
            <b>Chỉnh sửa</b>
          </ControlButton>,
        ],
      },
    ],
    [handleDetailButton, types],
  );

  const rows = useMemo(() => {
    return types.map((type, index) => {
      return {
        key: index,
        no: index + 1,
        id: type.id,
        name: type.name,
        interest: `${type.interest} %`,
        unit: type.unit
      };
    });
  }, [types]);

  // console.log(types);

  return (
    <SearchContainer
      show={true}
      title="Danh mục loại sản phẩm"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onClick={(e) => setSearchInput("")}
    >

      {(username === "admin") ? (
        <CreateProductTypeModal title="Tạo loại sản phẩm mới" producttypes={types} setRefetch={setRefetch} />
      ) : <></>}
      
      {types[rowID] ? <ProductTypeUpdateModal open={open} onButtonClose={handleClose} title="Chi tiết loại sản phẩm" data={types[rowID]} setRefetch={setRefetch} /> : <></>}
      
      {!isLoading && !error ? <TableContainer columns={columns} rows={rows} SearchInput={searchInput} /> : 'Loading...'}
    </SearchContainer>
  )
}

export default ProductType