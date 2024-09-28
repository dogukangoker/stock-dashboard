import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  GridActionsCellItem,
  GridColDef,
  GridEditInputCell,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";

interface IProductsColumnsProps {
  rowModesModel: GridRowModesModel;
  handleSaveClick: (id: GridRowId) => void;
  handleCancelClick: (id: GridRowId) => void;
  handleEditClick: (id: GridRowId) => void;
  handleDeleteClick: (id: GridRowId) => void;
}

const ProductsColumns = ({
  rowModesModel,
  handleSaveClick,
  handleCancelClick,
  handleEditClick,
  handleDeleteClick,
}: IProductsColumnsProps) => {
  return [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "code",
      headerName: "Code",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "stockCount",
      headerName: "Stock Count",
      editable: true,
      align: "left",
      headerAlign: "left",
      type: "number",
      flex: 1,
      renderEditCell: (params) => (
        <GridEditInputCell
          {...params}
          inputProps={{
            min: 0,
          }}
        />
      ),
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      valueGetter: (value) => new Date(value).toLocaleDateString("en-GB"),
    },
    {
      field: "updatedDate",
      headerName: "Updated Date",
      valueGetter: (value) => new Date(value).toLocaleDateString("en-GB"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={() => handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={() => handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ] as GridColDef[];
};

export default ProductsColumns;
