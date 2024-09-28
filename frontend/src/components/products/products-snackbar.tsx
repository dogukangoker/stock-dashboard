import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectStatus,
  setError,
  setStatus,
} from "../../redux/slices/product-slice";

const ProductSnackbar: React.FC = () => {
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const status = useSelector(selectStatus);
  const message = useSelector(selectError);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    dispatch(setStatus(null));
    dispatch(setError(""));
  };

  const renderMessage = () => {
    if (status === "error") {
      if (message instanceof Array) {
        return message.map((err: string) => <div key={err}>{err}</div>);
      }
      return message;
    }
    return "Products updated successfully";
  };

  useEffect(() => {
    if (status) {
      setOpenSnackbar(true);
    }
  }, [status]);

  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
    >
      <Alert
        variant="filled"
        severity={status === "error" ? "error" : "success"}
      >
        {renderMessage()}
      </Alert>
    </Snackbar>
  );
};

export default ProductSnackbar;
