import { Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@mui/material';
import { ControlButton } from '../Controls';

const ModalContainer = ({ title, open, onClose, children, mWidth = 'md' }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={mWidth}>
      <DialogTitle
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '1.8rem',
        }}
      >
        <b>{title}</b>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <ControlButton
          onClick={onClose}
          width="120px"
          height="35px"
          margin="0 12px 12px 0"
          variant="text"
          fontSize="1.4rem"
        >
          Đóng
        </ControlButton>
      </DialogActions>
    </Dialog>
  );
};

export default ModalContainer;
