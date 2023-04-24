import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import productData from "../../pages/SellTicket/productData";

export default function ProductSelectModal({ onClick }) {
  return (
    <>
      <Box>
        <Box marginBottom="10px" textAlign="center">
          <h2>Thêm sản phẩm</h2>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Loại sản phẩm</TableCell>
              <TableCell>Đơn giá</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((row, index) => {
              {
                /* console.log(productData[index]); */
              }
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.productID}</TableCell>
                  <TableCell>{row.productName}</TableCell>
                  <TableCell>{row.productType}</TableCell>
                  <TableCell>{row.productPrice}</TableCell>
                  <TableCell>
                    <Button value={index} onClick={onClick}>
                      Thêm
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}