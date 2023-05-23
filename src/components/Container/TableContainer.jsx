import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const TableContainer = ({ columns, rows, SearchInput = '' }) => {
  return (
    <Box
      sx={{
        height: '400px',
        width: '100%',
        '& *': {
          fontSize: '1.2rem',
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows.filter((row) => {
          return Object.keys(row).some((key) => {
            if (key !== 'id') {
              const value = row[key];
              return value.toString().toLowerCase().includes(SearchInput.toLowerCase());
            }
            return false;
          });
        })}
      />
    </Box>
  );
};

export default TableContainer;
