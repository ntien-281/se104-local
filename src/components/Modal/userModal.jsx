import { ModalContainer } from '../Container';
import { TextField, Typography, Stack } from '@mui/material';
import { ControlButton } from '../Controls';

const UserModal = ({ open, onClose }) => {
  return (
    <>
      <ModalContainer title="Menu người dùng" open={open} onClose={onClose} mWidth="sm">
        <Stack spacing={1} width="100%" sx={{ pl: '15%', pr: '15%' }}>
          <Typography variant="h4" textAlign="center">
            Tạo tài khoản mới
          </Typography>
          <TextField label="Tài khoản" />
          <TextField label="Mật khẩu" />
          <ControlButton>Tạo tài khoản</ControlButton>
        </Stack>
      </ModalContainer>
    </>
  );
};

export default UserModal;
