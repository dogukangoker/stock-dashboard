import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PageHeader from "../../components/page-header/page-header";
import ProductsMaterialUseModal from "../../components/products/products-material-use-modal";
import ProductSearch from "../../components/products/products-search-bar";
import ProductSnackbar from "../../components/products/products-snackbar";
import ProductTable from "../../components/products/products-table";
import { selectProductsQuery } from "../../redux/slices/product-slice";
import { useGetAllProductsQuery } from "../../services/product";
import "./products.scss";

const Products: React.FC = () => {
  const productsQuery = useSelector(selectProductsQuery);
  const { isLoading, refetch } = useGetAllProductsQuery(productsQuery);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsQuery]);

  return (
    <div className="products">
      <PageHeader title="Products" />
      <div className="products__body">
        <ProductSearch />
        <ProductTable isLoading={isLoading} />
      </div>
      <ProductSnackbar />
      <ProductsMaterialUseModal />
    </div>
  );
};

export default Products;
