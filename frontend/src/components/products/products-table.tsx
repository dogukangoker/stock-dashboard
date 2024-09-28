import { Box, Paper } from "@mui/material";
import {
  GridCallbackDetails,
  GridEventListener,
  GridPaginationModel,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductsColumns from "../../components/products/products-columns";
import EditToolbar from "../../components/products/products-table-edit-toolbar";
import CustomTable from "../../components/ui/table/table";
import products from "../../pages/products/products";
import {
  selectAllProducts,
  selectProductsQuery,
  selectTotal,
  setError,
  setProducts,
  setProductsQuery,
  setSelectedProducts,
  setStatus,
} from "../../redux/slices/product-slice";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} from "../../services/product";
import { IProduct } from "../../types/product.types";

interface ProductTableProps {
  isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ isLoading }) => {
  const dispatch = useDispatch();
  const productsQuery = useSelector(selectProductsQuery);
  const total = useSelector(selectTotal);
  const rows = useSelector(selectAllProducts);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [addProduct] = useAddProductMutation();
  const [editProduct] = useUpdateProductMutation();
  const [updateProductStatus] = useUpdateProductStatusMutation();

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    const editedRow = rows.find((row: IProduct) => row.id === id);
    if (editedRow) {
      processRowUpdate(editedRow, editedRow);
    }
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    try {
      await updateProductStatus({
        id: Number.parseInt(id.toString()),
        isActive: false,
      }).unwrap();
      dispatch(setProducts(rows.filter((row: IProduct) => row.id !== id)));
      dispatch(setStatus("success"));
    } catch (error: unknown) {
      console.error("Failed to delete the product:", error);
      dispatch(setStatus("error"));
      dispatch(setError((error as any).data.message));
    }
  };

  const processRowUpdate = async (newRow: IProduct, oldRow: IProduct) => {
    if (
      !newRow.code ||
      !newRow.name ||
      !newRow.description ||
      newRow.stockCount < 0
    ) {
      return oldRow;
    }

    try {
      let updatedProduct: IProduct;

      const isNewProduct =
        !oldRow.code &&
        !oldRow.name &&
        !oldRow.description &&
        oldRow.stockCount === 0;

      if (isNewProduct) {
        updatedProduct = await addProduct({
          code: newRow.code,
          name: newRow.name,
          description: newRow.description,
          stockCount: newRow.stockCount,
        }).unwrap();

        if (!updatedProduct.id) {
          updatedProduct.id = Date.now();
        }

        dispatch(setProducts([...rows, updatedProduct]));
        dispatch(setStatus("success"));
      } else {
        updatedProduct = await editProduct({
          id: newRow.id,
          code: newRow.code,
          name: newRow.name,
          description: newRow.description,
          stockCount: newRow.stockCount,
        }).unwrap();

        const updatedRows = rows.map((row: IProduct) =>
          row.id === updatedProduct.id ? { ...row, ...updatedProduct } : row
        );
        dispatch(setProducts(updatedRows));
        dispatch(setStatus("success"));
      }

      return updatedProduct;
    } catch (error: unknown) {
      console.error("Failed to save the product:", error);
      dispatch(setStatus("error"));
      dispatch(setError((error as any).data.message));
      return oldRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handlePaginationModelChange = (
    paginationModel: GridPaginationModel
  ) => {
    const adjustedPage = paginationModel.page + 1;

    dispatch(
      setProductsQuery({
        ...productsQuery,
        page: adjustedPage,
        pageSize: paginationModel.pageSize,
      })
    );
  };

  const handleRowSelection = (
    model: GridRowSelectionModel,
    _details: GridCallbackDetails
  ) => {
    const selectedRows = rows.filter(
      (row: IProduct) => model.includes(row.id) && row
    );
    dispatch(setSelectedProducts(selectedRows));
  };

  return (
    <Box sx={{ width: "100%", height: 550, overflowX: "auto" }}>
      <Paper sx={{ width: "100%", height: "100%" }}>
        <CustomTable
          getRowId={(row) => row.id}
          columns={ProductsColumns({
            rowModesModel,
            handleSaveClick,
            handleCancelClick,
            handleEditClick,
            handleDeleteClick,
          })}
          rows={rows}
          loading={isLoading}
          pagination
          paginationModel={{
            page: productsQuery.page - 1,
            pageSize: productsQuery.pageSize,
          }}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          rowCount={total}
          paginationMode="server"
          onPaginationModelChange={handlePaginationModelChange}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar as React.ComponentType<any>,
          }}
          slotProps={{
            toolbar: { setRowModesModel, products },
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "skeleton",
            },
          }}
          sx={{
            height: "100%",
            width: "100%",
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              borderBottom: "2px solid #e0e0e0",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#ffffff",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "2px solid #e0e0e0",
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default ProductTable;
