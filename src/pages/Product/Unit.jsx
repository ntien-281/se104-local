import React, { useState, useMemo, useEffect } from "react";
import { SearchContainer, TableContainer } from "../../components/Container";
import ProductUpdateModal from "../../components/Modal/ProductUpdateModal";
import { ControlButton } from "../../components/Controls";
import { useUserStore } from "../../../store";
import { getAllUnits } from "../../api/unit";
import CreateProductModal from "../../components/Modal/CreateProductModal";
import CreateUnitModal from "../../components/Modal/CreateUnitModal";
import UnitUpdateModal from "../../components/Modal/UnitUpdateModal";

const Unit = () => {
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [rowID, setRowID] = useState(0);
  const token = useUserStore((state) => state.token);
  const [refetch, setRefetch] = useState(false);
  const username = useUserStore((state) => state.username);

  // TODO: call api

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllUnits(token);
        setProducts(res.data);
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
        field: "no",
        headerName: "#",
        headerAlign: "center",
        align: "center",
        width: 50,
        disableColumnMenu: true,
      },
      {
        field: "id",
        headerName: "Mã đơn vị",
        width: 200,
        disableColumnMenu: true,
      },
      {
        field: "name",
        headerName: "Tên đơn vị",
        width: 300,
        disableColumnMenu: true,
      },
      {
        field: "actions",
        type: "actions",
        align: "center",
        width: 100,
        getActions: (param) => [
          <ControlButton
            onClick={() => handleDetailButton(param.row.key)}
            color="secondary"
            variant="text"
            disabled={(username != "admin")}
          >
            <b>Chỉnh sửa</b>
          </ControlButton>,
        ],
      },
    ],
    [handleDetailButton, products]
  );

  const rows = useMemo(() => {
    return products.map((product, index) => {
      return {
        key: index,
        no: index + 1,
        id: product.id,
        name: product.name
      };
    });
  }, [products]);

  console.log(products);

  return (
    <SearchContainer
      show={true}
      title="Danh sách đơn vị tính"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onClick={(e) => setSearchInput("")}
    >
      {username === "admin" ? <CreateUnitModal
        title="Tạo đơn vị mới"
        products={products}
        setRefetch={setRefetch}
      /> : <></>}
      
      {products[rowID] && username === "admin" ? (
        <UnitUpdateModal
          open={open}
          onButtonClose={handleClose}
          title="Chi tiết đơn vị"
          data={products[rowID]}
          setRefetch={setRefetch}
        />
      ) : (
        <></>
      )}
      {!isLoading && !error ? (
        <TableContainer
          columns={columns}
          rows={rows}
          SearchInput={searchInput}
        />
      ) : (
        "Loading..."
      )}
    </SearchContainer>
  );
};

export default Unit;
