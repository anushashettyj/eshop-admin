import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { Box, createTheme, Stack, ThemeProvider  } from '@mui/material';
import { useState, useMemo } from "react";
import { useSelector } from 'react-redux';
import {baseMode, lightMode, darkMode} from './theme';
import Login from './pages/Login';
import UserList from './pages/UserList';
import EditUser from './pages/EditUser';
import NewUser from './pages/NewUser';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import NewProduct from './pages/NewProduct';
import PrivateRoutes from './utils/PrivateRoutes';

import './App.css';

const getTheme = (mode) => ({
  palette: {
    mode,
    ...(
      mode === 'light'
      ? lightMode.palette
      : darkMode.palette
    )
  },
  ...baseMode
});
function App() {
  const userExist = useSelector(state => state.user.currentUser);
  const user = JSON.parse(localStorage.getItem('persist:root') || null)?.user
  const admin = JSON.parse(user || null)?.currentUser?.isAdmin || '';
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);
  console.log({admin})
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor={"secondary.main"} color={"text.primary"}
        position= 'relative' minHeight= '100vh' boxSizing= 'border-box'>
        { userExist && <Navbar /> }
        <Stack direction="row" spacing={0} 
          justifyContent="space-between" 
          sx = {{ minHeight: {xxxs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)'} }}>
          { userExist && <Sidebar minHeight= '100vh' mode={mode} setMode={setMode}></Sidebar> }
          <Box bgcolor="secondary.main" flex={4} p={2}>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/user' element={<UserList />} />
                <Route path='/newUser' element={<NewUser />} />
                <Route path='/user/:userId' element={<EditUser />} />
                <Route path='/product' element={<ProductList />} />
                <Route path='/newProduct' element={<NewProduct />} />
                <Route path='/product/:productId' element={<EditProduct />} />
              </Route>
              <Route path='/login' element={
                userExist ? <Navigate to='/' /> : <Login />
              } />
            </Routes>
          </Box>
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
