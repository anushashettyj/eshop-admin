import { processReq, 
  handleError, 
  getAllProducts, 
  addProduct,
  delProduct,
  delProducts,
  updateProduct } from '../reducers/product.js';
import { publicRequest, userRequest } from '../../requestProcessor';

export const getProducts = async (dispatch) => {
  dispatch(processReq());
  try {
    const res = await publicRequest.get('/product/find');
    dispatch(getAllProducts(res.data));
  } catch (err) {
    dispatch(handleError(err));
  }
}

export const deleteProduct = async (id, dispatch) => {
  dispatch(processReq());
  try {
    await userRequest.delete(`/product/${id}`);
    dispatch(delProduct(id));
  } catch (err) {
    dispatch(handleError(err));
  }
}

export const deleteProducts = async (ids, dispatch) => {
  dispatch(processReq());
  try {
    await userRequest.post('/product/deleteProducts', {ids});
    dispatch(delProducts(ids));
  } catch (err) {
    dispatch(handleError(err));
  }
}

export const newProduct = async (product, dispatch) => {
  dispatch(processReq());
  try {
    const res = await userRequest.post('/product/new', product);
    dispatch(addProduct(res.data));
  } catch (err) {
    dispatch(handleError(err));
  }
}

export const editProduct = async (id, product, dispatch) => {
  dispatch(processReq());
  try {
    await userRequest.put(`/product/${id}`, product);
    dispatch(updateProduct({id, product}));
  } catch (err) {
    dispatch(handleError(err));
  }
}
