import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import {
  selectProductsQuery,
  setProductsQuery,
} from "../../redux/slices/product-slice";
import { SearchParamsSchema } from "../../schemas/search-params-schema";

const ProductSearch: React.FC = () => {
  const dispatch = useDispatch();
  const productsQuery = useSelector(selectProductsQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const result = SearchParamsSchema.safeParse({
      search: debouncedSearchTerm,
    });
    if (result.success) {
      setSearchParams({ search: debouncedSearchTerm });
    }
  }, [debouncedSearchTerm, setSearchParams]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams({ search: debouncedSearchTerm });
      dispatch(
        setProductsQuery({
          ...productsQuery,
          name: debouncedSearchTerm,
        })
      );
    } else {
      searchParams.delete("search");
      setSearchParams(searchParams);
      dispatch(
        setProductsQuery({
          page: productsQuery.page,
          pageSize: productsQuery.pageSize,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, dispatch, setSearchParams, searchParams]);

  return (
    <div className="products__body__tableHeader">
      <TextField
        placeholder="Type to search"
        label="Search Products"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default ProductSearch;
