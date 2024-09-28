import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

interface CustomTableProps extends DataGridProps {}

const CustomTable: React.FC<CustomTableProps> = (props) => {
  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
        disableColumnSorting
        {...props}
      />
    </Box>
  );
};

export default CustomTable;
