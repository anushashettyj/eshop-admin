import { processUserReq, 
  userError, 
  userLogin,
  getAllUsers,
  addUser,
  delUser,
  delUsers,
  updateUser} from '../reducers/user.js';

import { publicRequest, userRequest } from '../../requestProcessor';

export const login = async (dispatch, user) => {
  dispatch(processUserReq());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(userLogin(res.data));
  } catch (err) {
    dispatch(userError(err));
  }
}

export const getUsers = async (dispatch) => {
  console.log('--apiRequest- getUsers ---');
  dispatch(processUserReq());
  try {
    const res = await userRequest.get('/user/find');
    dispatch(getAllUsers(res.data));
  } catch (err) {
    console.log('--apiRequest erro', err)
    dispatch(userError(err));
  }
}

export const deleteUser = async (id, dispatch) => {
  dispatch(processUserReq());
  try {
    await userRequest.delete(`/user/${id}`);
    dispatch(delUser(id));
  } catch (err) {
    dispatch(userError(err));
  }
}

export const deleteUsers = async (ids, dispatch) => {
  dispatch(processUserReq());
  try {
    await userRequest.post('/user/deleteUsers', {ids});
    dispatch(delUsers(ids));
  } catch (err) {
    dispatch(userError(err));
  }
}

export const newUser = async (user, dispatch) => {
  dispatch(processUserReq());
  try {
    const res = await userRequest.post('/user/new', user);
    console.log('---apiRequest newUser -res--', res);
    dispatch(addUser(res.data));
  } catch (err) {
    console.log('---apiRequest newUser -err--', err);
    dispatch(userError(err));
  }
}

export const editUser = async (id, user, dispatch) => {
  dispatch(processUserReq());
  try {
    await userRequest.put(`/user/${id}`, user);
    dispatch(updateUser({id, user}));
  } catch (err) {
    dispatch(userError(err));
  }
}
