import { useState, useReducer, useEffect } from 'react';
import formReducer from '../../reducer/form';
import { FormContainer, CartContainer } from '../../components/Container';
import { Grid, TextField, Typography } from '@mui/material';
import { ControlButton } from '../../components/Controls';
import {
  resetForm,
  handleChange,
  handleDecreaseService,
  handleIncreaseService,
  handleRemoveService,
} from '../../reducer/form_actions';
import { useUserStore } from '../../../store';
import { createServiceForm, getAllServices } from '../../api/service';

const defaultFormFields = {
  serviceFormID: '',
  currentDate: new Date(),
  customerName: '',
  customerPhone: '',
  total: 0,
  prePaid: '',
  remain: 0,
  serviceCart: [],
};

const initialSearchInput = '';

const ServiceForm = ({ show }) => {
  const [state, dispatch] = useReducer(formReducer, defaultFormFields);

  let productAmount = state.serviceCart.length;

  const token = useUserStore(state => state.token);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Modal Button
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  const handleSubmit = async () => {
    let reqBody;
    let res;
    if (state.customerName === "" || state.customerPhone === "") {
      alert("Nhập thông tin khách hàng")
      return;
    }
    else if (state.serviceCart.length === 0) {
      alert("Chưa chọn dịch vụ nào");
      return;
    }
    let modifiedCart = state.serviceCart.map(item => {
      return {
        ServiceTypeId: item.id,
        incurred: item.incurred,
        quantity: item.quantity,
        subtotal: item.subtotal,
        prePaid: item.prePaid,
        remain: item.subtotal - item.prePaid,
      }
    });
    reqBody = {
      customer: state.customerName,
      phone: state.customerPhone,
      total: state.total,
      paid: modifiedCart.reduce((totalPaid, item) => totalPaid + item.prePaid, 0),
      remain: state.remain,
      cart: modifiedCart
    };
    console.log(reqBody);

    try {
      res = await createServiceForm(token, reqBody).then(result => res = result);
      console.log(res);
      if (res.error) {
        alert("Nhận phiếu không thành");
      } else {
        alert("Nhận phiếu thành công.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra.");
      console.log(error);
    }
    console.log(res);
    resetForm(dispatch, defaultFormFields);

  };


  const handleAddService = (service) => {
    dispatch({
      type: 'add_service',
      payload: {
        toAddService: service
      }
    })
  }

  const setPrePaidService = (id, value) => {
    dispatch({
      type: 'set_pre_paid_service',
      payload: {
        id,
        value
      }
    })
  }
  const setIncurredService = (id, value) => {
    
    dispatch({
      type: 'set_incurred_service',
      payload: {
        id,
        value,
      }
    })
  }

  // SearchBox
  const [SearchInput, setSearchInput] = useState(initialSearchInput);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const deleteSearchInput = () => {
    setSearchInput(initialSearchInput);
  };

  // console.log(token);
  console.log(state.serviceCart);

  return (
    <FormContainer
      show={show}
      title="Lập phiếu dịch vụ"
      formID={state.sellFormID}
      currentDate={state.currentDate}
      totalPrice={state.total}
      productAmount={productAmount}
      resetForm={() => resetForm(dispatch, defaultFormFields)}
      submitForm={handleSubmit}
    >
      <Grid item xs={7.5} marginLeft="10px">
        <TextField
          label="Tên khách hàng"
          placeholder="Nhập tên"
          name="customerName"
          value={state.customerName}
          onChange={(e) => handleChange(dispatch, e)}
          sx={{ width: '250px' }}
        />
      </Grid>
      <Grid item xs={5} marginLeft="10px">
        <TextField
          label="Số điện thoại"
          placeholder="Nhập số điện thoại"
          name="customerPhone"
          value={state.customerPhone}
          onChange={(e) => handleChange(dispatch, e)}
          sx={{ width: '250px' }}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Gio Hang */}
        <CartContainer
          title="Dịch vụ"
          productAmount={productAmount}
          cart={state.serviceCart}
          handleDecrease={(e) => handleDecreaseService(dispatch, e, state)}
          handleIncrease={(e) => handleIncreaseService(dispatch, e, state)}
          handleRemove={(e) => handleRemoveService(dispatch, e, state)}
          open={open}
          AddItem={handleAddService}
          onButtonClick={handleClickOpen}
          onButtonClose={handleClose}
          varient="service"
          // Cho Search Box
          SearchInput={SearchInput}
          handleSearchInput={handleSearchInput}
          deleteSearchInput={deleteSearchInput}
          setPrePaidService={setPrePaidService}
          setIncurredService={setIncurredService}
        ></CartContainer>
      </Grid>
    </FormContainer>
  );
};

export default ServiceForm;
