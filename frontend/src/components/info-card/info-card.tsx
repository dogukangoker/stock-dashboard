import { Paper, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import "./info-card.scss";

interface InfoCardProps {
  title: string;
  count: number;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

const InfoCard = ({ title, count, icon: Icon }: InfoCardProps) => {
  return (
    <Paper className="info-card" square={false}>
      <div className="info-card__text">
        <Icon className="info-card__icon" fontSize="large" />
        <Typography className="info-card__title">{title}</Typography>
      </div>
      <Typography className="info-card__count">{count}</Typography>
    </Paper>
  );
};

export default InfoCard;
