import {createSlice} from '@reduxjs/toolkit';
// import { userList } from '../data';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    isFetching: false,
    error: false,
    errorMessage: null
  },
  reducers : {
    processUserReq: (state) => {
      state.isFetching= true;
      state.error = false;
    },
    userError: (state, action) => {
      console.log('---reducers userError--', action.payload)
      state.isFetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    userLogin: (state, action) => {
      state.isFetching= false;
      state.error = false;
      state.errorMessage = null;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.errorMessage = null;
      state.error = false;
    },
    getAllUsers: (state, action) => {
      console.log('--reducer-- getAllUsers--', action.payload)
      state.isFetching= false;
      state.error = false;
      state.errorMessage = null;
      state.users = action.payload;
    },
    addUser: (state, action) => {
      console.log('--reducer-- addUser--', action.payload)
      console.log('state----', state)
      state.isFetching= false;
      state.error = false;
      state.errorMessage = null;
      state.users ? state.users.push(action.payload) : state.users = [action.payload];
    },
    delUser: (state, action) => {
      state.isFetching= false;
      state.users.splice(
        state.users.findIndex((user) => user._id === action.payload),
        1
      )
      state.error = false;
      state.errorMessage = null;
    },
    delUsers: (state, action) => {
      state.isFetching= false;
      action.payload.forEach(id => {
        state.users.splice(
          state.users.findIndex((user) => user._id === id),
          1
        )
      });
      state.error = false;
      state.errorMessage = null;
    },
    updateUser: (state, action) => {
      state.isFetching= false;
      state.users[
        state.users.findIndex((user) => user._id === action.payload.id)
      ] = action.payload.user;
      state.error = false;
      state.errorMessage = null;
    }
  }
});

export const {processUserReq,
  userError, 
  userLogin, 
  logout,
  getAllUsers,
  addUser,
  delUser,
  delUsers,
  updateUser
} = userSlice.actions;
export default userSlice.reducer;
