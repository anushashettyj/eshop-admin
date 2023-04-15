import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/reducers/user';
import { AppBar, Badge, styled, Toolbar, Typography } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import pic from '../assets/male.png';

const StyledToolbar = styled(Toolbar) ({
  display: 'flex',
  justifyContent: 'space-between',
})

const LeftMenu = styled('div')(({theme}) => ({
  // backgroundColor: theme.palette.navbar.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '20px',
  padding: '0 10px',
  borderRadius: theme.shape.borderRadius,
  width:'40%',
  icon: {
    color: 'white'
  }
}));

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const userExist = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log('userExist- before-', userExist);
    dispatch(logout());
    console.log('userExist after--', userExist);
  };
  return (
    <AppBar position='sticky'>
      <StyledToolbar>
        <Typography variant="h5" 
          sx={{
            bgcolor: "logo.light",
            color: "logo.main",
            border: 2,
            borderColor: 'custom.main',
            padding: '5px',
            fontWeight: 'bold',
          }} > ESHOP 
          {/* sx={{display: { xs: 'none', sm:'block'}}} */}
        </Typography>
        <LeftMenu 
          sx={{
            "&& .MuiSvgIcon-root": {
              color: "custom.main"
            }
          }}
        > 
          <Badge badgeContent={4} color="error">
            <NotificationsNoneIcon />
          </Badge>
          <Badge badgeContent={4} color="error">
            <SettingsIcon />
          </Badge>
          <Avatar
            alt="avatar"
            src={pic}
            sx={{ width: 30, height: 30 }}
            onClick={(e) => setOpen(true)}
          />
        </LeftMenu>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 5.5,
          }
        }}
      >
        <MenuItem >Profile</MenuItem>
        <MenuItem >My account</MenuItem>
        <Link  className='link' to='/login' onClick={handleLogout}><MenuItem >Logout</MenuItem></Link>
      </Menu>
    </AppBar>
  )
}

export default Navbar
