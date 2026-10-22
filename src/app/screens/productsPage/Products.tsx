import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts, setTotal } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts, retrieveTotal } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
  setTotal: (data: number) => dispatch(setTotal(data)),
});
const productsRetriever = createSelector(
  retrieveProducts,
  retrieveTotal,
  (products, total) => ({ products, total }),
);

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts, setTotal } = actionDispatch(useDispatch());
  const { products, total } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 3,
    order: "createdAt",
    productCollection: ProductCollection.SKINCARE,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        setProducts(data.list);
        setTotal(data.metaCounter[0]?.total || 0);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    productSearch.productCollection = undefined;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseProductHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className={"avatar-big-box"}>
            <Stack className={"top-text"}>
              <p>Cosmetics Store</p>
            </Stack>
            <Stack className={"single-search-big-box"}>
              <input
                type={"search"}
                className={"single-search-input"}
                name={"singleResearch"}
                placeholder={"Type here"}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <Button
                className={"single-button-search"}
                variant={"contained"}
                endIcon={<SearchIcon />}
                onClick={searchProductHandler}
              >
                Search
              </Button>
            </Stack>
          </Stack>

          <Stack className={"products-filter-section"}>
            <Stack className={"products-filter-box"}>
              <Button
                variant={"outlined"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"outlined"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"outlined"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack className={"product-category"}>
            <div className={"category-main"}>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection ===
                  ProductCollection.SKINCARE
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.SKINCARE);
                }}
              >
                Skincare
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.MAKEUP
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.MAKEUP);
                }}
              >
                Makeup
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection ===
                  ProductCollection.HAIRCARE
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.HAIRCARE);
                }}
              >
                Haircare
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection ===
                  ProductCollection.FRAGRANCE
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.FRAGRANCE);
                }}
              >
                Fragrance
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.productCollection === ProductCollection.OTHER
                    ? "primary"
                    : "secondary"
                }
                onClick={() => {
                  searchCollectionHandler(ProductCollection.OTHER);
                }}
              >
                Other
              </Button>
            </div>
          </Stack>

          <Stack className={"list-category-section"}>
            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume = `${product.productVolume} ml`;
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseProductHandler(product._id)}
                    >
                      <Stack className={"product-img"}>
                        <img
                          src={imagePath}
                          alt={product.productName}
                          loading="lazy"
                        />
                        <div className="product-sale">{sizeVolume}</div>
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                            alt=""
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className={"product-title"}>
                          {product.productName}
                        </span>
                        <div className={"product-desc"}>
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>

          <Stack className={"pagination-section"}>
            <Pagination
              count={Math.max(1, Math.ceil(total / productSearch.limit))}
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
