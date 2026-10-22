import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  store: null,
  chosenProduct: null,
  products: [],
  total: 0,
};

const productsPageSlice = createSlice({
  name: "productsPage",
  initialState,
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setStore, setChosenProduct, setProducts, setTotal } =
  productsPageSlice.actions;

const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
