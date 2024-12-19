import { configureStore, createSlice } from "@reduxjs/toolkit";

const productsInitialState = {
  list: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    initailizeProducts: (state, action) => {
      state.list = action.payload;
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

const soldoutInitialState = {
  soldOutItems: JSON.parse(localStorage.getItem("outOfStockItems")) ?? [],
};

const soldOutSlice = createSlice({
  name: "soldout",
  initialState: soldoutInitialState,
  reducers: {
    addItem: (state, action) => {
      state.soldOutItems = [...state.soldOutItems, action.payload];
    },
  },
});

export const { initailizeProducts, toggleLoading } = productsSlice.actions;

export const { addItem } = soldOutSlice.actions;

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    soldout: soldOutSlice.reducer,
  },
});
