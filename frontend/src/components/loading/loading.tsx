import { CircularProgress } from "@mui/material";
import "./loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress size={80} />
    </div>
  );
};

export default Loading;
