import React from 'react'
import { useState } from 'react';
import { login } from '../redux/apiRequests/user';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, FormGroup, FormLabel, TextField, Typography } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const { isFetching, error, errorMessage }= useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, {username, password})
      .then(() => {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 5000);
      })
      .catch(err => {
        console.log(errorMessage);
      });
  }

  return (
    <Box flex="1 1 400px" p='20px' maxWidth= '600px'
    m= '0 auto' sx = {(theme) => ({
      boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`,
    })}>
      <Typography sx={{ mt: 4, mb: 2, pl: 2, textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }} variant="h4" component="div">
        Login
      </Typography>
      <FormGroup sx={{
        '& .MuiButtonBase-root': {
          bgcolor: 'button.main',
          color: 'secondary.light',
        },
        '& .MuiButtonBase-root:hover': {
          bgcolor: 'button.hover',
          color: 'primary.light',
        },
        '& .MuiFormLabel-root.MuiFormLabel-colorPrimary': {
          color: 'primary.light'
        },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '500px',
        gap: '20px',
        '& .MuiFormControl-root': {
          flex: '2 2 400px',
          maxWidth: '450px'
        }
      }}>
        <TextField
          // error
          id="outlined-username"
          label="Username"
          onChange= {(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
        />
        <TextField
          // error
          id="outlined-pwd"
          label="Password"
          type="password"
          onChange= {(e) => setPassword(e.target.value)}
          // defaultValue="Enter Email"
          // value={profilePic[0].email}
        />
        
        <Box flexBasis= '100%'>
          <Button type="submit" disabled= {isFetching} sx={{bgcolor: 'button.main',
            m: '0 auto',
            minWidth: '100px',
            display: 'flex',
            alignItems: 'center'
          }} onClick={handleLogin}> Login </Button>
        </Box>
        {showError && <FormLabel  sx={{color: 'red !important'}}>{ error && `Login Failed ! ${errorMessage}` }</FormLabel> }    
      </FormGroup>
    </Box>
  )
}

export default Login
