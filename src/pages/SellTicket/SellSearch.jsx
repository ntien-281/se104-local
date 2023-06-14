import { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { SearchContainer, TableContainer } from "../../components/Container/";
import { ControlButton } from "../../components/Controls";
import FormDetailModal from "../../components/Modal/FormDetailModal";
import { getAllSellForms } from "../../api/sell";
import { useUserStore } from "../../../store";
import { getFormatDateString } from "../../utils/date";

const initialSearchInput = "";

const SellSearch = () => {
  const [open, setOpen] = useState(false);
  const [rowID, setRowID] = useState(0);
  const token = useUserStore((state) => state.token);
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // getting sell forms
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getAllSellForms(token).then((res) => {
          console.log(res.data);
          setFormData(res.data);
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

  const handleDetailButton = (rowID) => {
    setRowID(rowID);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
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
        field: "no",
        headerName: "#",
        headerAlign: "center",
        align: "center",
        width: 50,
        disableColumnMenu: true,
      },
      {
        field: "id",
        headerName: "Mã phiếu",
        width: 100,
        disableColumnMenu: true,
      },
      {
        field: "customerName",
        headerName: "Khách hàng",
        width: 350,
        disableColumnMenu: true,
      },
      {
        field: "totalPaid",
        headerName: "Tổng thanh toán",
        headerAlign: "center",
        align: "center",
        width: 170,
        sortComparator: (v1, v2) => {
          const num1 = Number(v1.replace(/\D/g, ""));
          const num2 = Number(v2.replace(/\D/g, ""));
          return num1 - num2;
        },
        disableColumnMenu: true,
      },
      {
        field: "date",
        headerName: "Ngày thanh toán",
        headerAlign: "center",
        align: "center",
        width: 170,
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
          >
            <b>Chi tiết</b>
          </ControlButton>,
        ],
      },
    ],
    [handleDetailButton]
  );

  const rows = useMemo(() => {
    return formData.map((form, index) => {
      return {
        key: index,
        no: index + 1,
        id: form.id,
        customerName: form.customer,
        totalPaid: `₫${form.total.toLocaleString()}`,
        date: getFormatDateString(form.date),
      };
    });
  }, [formData]);

  return (
    <SearchContainer
      show={true}
      title="Tra cứu phiếu bán"
      value={SearchInput}
      onChange={handleSearchInput}
      onClick={deleteSearchInput}
    >
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">Có lỗi xảy ra</Alert>
      ) : formData.length > 0 ? (
        <>
          <FormDetailModal
            open={open}
            onButtonClose={handleClose}
            title="Phiếu bán hàng"
            formData={formData[rowID]}
            type="SellForm"
          />
          <TableContainer
            columns={columns}
            rows={rows}
            SearchInput={SearchInput}
          />
        </>
      ) : (
        <></>
      )}
    </SearchContainer>
  );
};

export default SellSearch;
