import { TextField } from "@mui/material";
import React, { useState } from "react";
import { isNumberOnly } from "../../reducer/form";

const PrePaidInput = ({
  minumunPrePaid,
  setPrePaidService,
  serviceId,
  subtotal,
  maximum
}) => {
  const [prePaidValue, setPrePaidValue] = useState(0);
  const [lowPrePaidError, setLowPrePaidError] = useState(false);
  const [maxPrePaidError, setMaxPrePaidError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const handleChangeError = () => {
    if (isNumberOnly(prePaidValue)) {
      setPriceError(true);
      return;
    }
    setPrePaidValue(Number(e.target.value));
    if (prePaidValue <= minumunPrePaid * subtotal) {
      setLowPrePaidError(true);
      return;
    }
    if (prePaidValue > subtotal) {
      setMaxPrePaidError(true);
      return;
    }
  };
  const handleChange = (e) => {
    setPrePaidValue(Number(e.target.value));
  }

  // console.log(typeof(prePaidValue));

  return (
    <TextField
      value={prePaidValue}
      variant="standard"
      required
      error={lowPrePaidError || maxPrePaidError || priceError}
      helperText={
        lowPrePaidError
          ? `Trả trước nhiều hơn ${minumunPrePaid * 100}%`
          : maxPrePaidError
          ? `Trả trước quá nhiều`
          : priceError
          ? "Sai định dạng"
          : ""
      }
      onChange={handleChange}
      onBlur={(e) => {
        if (!lowPrePaidError && !maxPrePaidError && !priceError) {
          setPrePaidService(serviceId, prePaidValue);
        }
      }}
      inputProps={{
        style: {
          fontSize: "1.4rem",
          height: 20,
          textAlign: "center",
        },
        type: 'number',
        step: 50000,
        min: 0,
        max: maximum,
        inputMode: 'numeric', 
        pattern: '[0-9]*'
      }}
    />
  );
};

export default PrePaidInput;
