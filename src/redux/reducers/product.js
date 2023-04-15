import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    errorMessage: null
  },
  reducers : {
    processReq: (state) => {
      state.isFetching= true;
      state.error = false;
    },
    handleError: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload.response.data;
    },
    getAllProducts: (state, action) => {
      state.isFetching= false;
      state.error = false;
      state.errorMessage = null;
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      console.log('---state.products --', state.products);
      state.isFetching= false;
      state.error = false;
      state.errorMessage = null;
      state.products.push(action.payload);
    },
    delProduct: (state, action) => {
      state.isFetching= false;
      state.products.splice(
        state.products.findIndex((product) => product._id === action.payload),
        1
      )
      state.error = false;
      state.errorMessage = null;
    },
    delProducts: (state, action) => {
      state.isFetching= false;
      action.payload.forEach(id => {
        state.products.splice(
          state.products.findIndex((product) => product._id === id),
          1
        )
      });
      state.error = false;
      state.errorMessage = null;
    },
    updateProduct: (state, action) => {
      state.isFetching= false;
      state.products[
        state.products.findIndex((product) => product._id === action.payload.id)
      ] = action.payload.product;
      state.error = false;
      state.errorMessage = null;
    }
  }
});

export const {
  processReq,
  handleError,
  getAllProducts,
  addProduct,
  delProduct,
  delProducts,
  updateProduct
} = productSlice.actions;
export default productSlice.reducer;
