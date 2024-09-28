import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMaterialUseModal,
  selectProducts,
  setError,
  setSelectedProducts,
  setShowMaterialUseModal,
  setStatus,
} from "../../redux/slices/product-slice";
import {
  updateProductCountSchema,
  UpdateProductCountSchema,
} from "../../schemas/product-use-schema";
import { useUpdateProductsCountsMutation } from "../../services/product";
import { IProduct } from "../../types/product.types";
import NumericInput from "../ui/numeric-input/numeric-input";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProductsMaterialUseModal = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectMaterialUseModal);
  const selectedProducts: IProduct[] = useSelector(selectProducts);
  const { handleSubmit, setValue, reset } = useForm<UpdateProductCountSchema>({
    resolver: zodResolver(updateProductCountSchema),
  });

  useEffect(() => {
    if (selectedProducts) {
      const defaultValues = {
        products: selectedProducts.map((product) => ({
          id: product.id,
          count: product.stockCount,
        })),
      };
      reset(defaultValues);
    }
  }, [selectedProducts, reset]);

  const [productsCounts, { isLoading, error }] =
    useUpdateProductsCountsMutation();
  const handleClose = () => dispatch(setShowMaterialUseModal(false));

  const handleSetStocks = (val: string | number, index: number) => {
    const updatedProducts = [...selectedProducts];

    updatedProducts[index] = {
      ...updatedProducts[index],
      stockCount: Number.parseInt(val.toString()),
    };
    dispatch(setSelectedProducts(updatedProducts));

    const formValues = updatedProducts.map((product) => {
      return {
        id: product.id,
        count: product.stockCount,
      };
    });

    setValue("products", formValues);
  };

  const onSubmit = async (data: UpdateProductCountSchema) => {
    try {
      await productsCounts(data).unwrap();
      dispatch(setStatus("success"));
    } catch (err: unknown) {
      console.error("Update products counts failed:", err);
      dispatch(setStatus("error"));
      dispatch(setError((error as any).data.message));
    } finally {
      dispatch(setShowMaterialUseModal(false));
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap="20px"
        sx={style}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h5" component="h2" textAlign="center">
          Use Products for Materials
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary">
          Update the stock count for the selected products.
        </Typography>
        {selectedProducts.map((product: IProduct, index: number) => (
          <Box
            display="grid"
            gridTemplateColumns="2fr 1fr"
            alignItems="center"
            key={product.id}
            gap="10px"
          >
            <Typography variant="body1">
              Product Code: {product.code}
            </Typography>
            <NumericInput
              label="New Stock Count"
              value={product.stockCount}
              onChange={(val) => handleSetStocks(val, index)}
              fullWidth
            />
          </Box>
        ))}
        <Button
          type="submit"
          variant="contained"
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
          color="primary"
          fullWidth
        >
          {isLoading ? (
            <>
              Loading
              <CircularProgress color="inherit" size={20} />
            </>
          ) : (
            "Use Products"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default ProductsMaterialUseModal;
