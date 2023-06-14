import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { ControlButton } from '../Controls';
import { logout } from '../../api/user';
import { useUserStore } from '../../../store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const username = useUserStore((state) => state.username);
  const token = useUserStore((state) => state.token);
  const setUsername = useUserStore((state) => state.setUsername);
  const setPassword = useUserStore((state) => state.setPassword);
  const setToken = useUserStore((state) => state.setToken);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogout = async () => {
    if (token) {
      let res;
      setIsLoading(true);
      try {
        res = await logout(username, token);
        setUsername('');
        setPassword('');
        setToken('');
        navigate('/login');
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '1.8rem',
        }}
      >
        <b>Đăng xuất</b>
      </DialogTitle>
      <DialogContent sx={{ fontSize: '1.6rem', minHeight: '80px' }} dividers>
        Bạn có muốn thoát khỏi ứng dụng?
      </DialogContent>
      <DialogActions>
        <ControlButton onClick={handleLogout} width="100px" height="35px" margin="0 2px 8px 0">
          Đăng xuất
        </ControlButton>
        <ControlButton onClick={onClose} width="100px" height="35px" margin="0 12px 8px 0" variant="text">
          Hủy
        </ControlButton>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
