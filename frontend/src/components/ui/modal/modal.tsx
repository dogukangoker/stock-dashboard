import { Box, Modal, Paper } from "@mui/material";

interface ICustomModalProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const CustomModal = ({ open, handleClose, children }: ICustomModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "1px solid #cecece",
        boxShadow: 24,
        borderRadius: 3,
      }}
    >
      <Paper>{children}</Paper>
    </Modal>
  );
};

export default CustomModal;
