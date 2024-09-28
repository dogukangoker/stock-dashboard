import { Button, Snackbar } from "@mui/material";
import {
  GridAddIcon,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProducts,
  setProducts,
  setShowMaterialUseModal,
} from "../../redux/slices/product-slice";

interface EditToolbarProps {
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

const EditToolbar = (props: EditToolbarProps) => {
  const dispatch = useDispatch();
  const rows = useSelector(selectAllProducts);
  const selectedProducts = useSelector(selectProducts);
  const { setRowModesModel } = props;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    const id = rows.length > 0 ? rows[rows.length - 1].id + 1 : 1;
    const newProduct = {
      id: id,
      code: "",
      name: "",
      description: "",
      stockCount: 0,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };

    const updatedProducts = [...rows, newProduct];
    dispatch(setProducts(updatedProducts));

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "code" },
    }));

    if (
      !newProduct.code ||
      !newProduct.name ||
      !newProduct.description ||
      newProduct.stockCount < 0
    ) {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenMaterialUseModal = () =>
    dispatch(setShowMaterialUseModal(true));

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<GridAddIcon />} onClick={handleClick}>
        Add new product
      </Button>
      {selectedProducts && selectedProducts.length > 0 && (
        <Button
          color="warning"
          startIcon={<GridAddIcon />}
          onClick={handleOpenMaterialUseModal}
        >
          Use material
        </Button>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Please fill in all required fields."
      />
    </GridToolbarContainer>
  );
};

export default EditToolbar;
