import { CountertopsRounded } from "@mui/icons-material";
import { useEffect } from "react";
import InfoCard from "../../components/info-card/info-card";
import PageHeader from "../../components/page-header/page-header";
import { useGetAllProductsCountQuery } from "../../services/product";
import "./dashboard.scss";

const Dashboard = () => {
  const { data, refetch } = useGetAllProductsCountQuery();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard">
      <PageHeader title="Dashboard" />

      <InfoCard
        title="Total Products Count"
        count={data?.total ?? 0}
        icon={CountertopsRounded}
      />
    </div>
  );
};

export default Dashboard;
