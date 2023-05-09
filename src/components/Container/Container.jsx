import { Paper } from '@mui/material';

const Container = ({ children }) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: '20px',
        width: 'auto',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </Paper>
  );
};

export default Container;
