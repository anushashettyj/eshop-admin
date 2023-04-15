import React from 'react'
import { Button, 
  Box, 
  Checkbox,
  FormGroup,
  ListItemText,
  InputLabel,
  MenuItem ,
  TextField, 
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  OutlinedInput,
  Select } from '@mui/material';

import { useState, useEffect } from 'react';
import { editUser } from '../redux/apiRequests/user';
import { useSelector, useDispatch } from 'react-redux';
import { admin, userStatus } from '../data';

// import { useState } from 'react';
// import { userList } from '../data';
const UserEditForm = ({user}) => {
  const [userData, setUserData] = useState(user);
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { error, errorMessage } = useSelector(state => state.product);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateFormFields = {
    username: username => !Boolean(username) ? 'Username is required' : null,
    name: name => !Boolean(name) ? 'Name is required' : null,
    email: email => !Boolean(email) ? 'Email is required' : null,
    password: password => !Boolean(password) ? 'Password is required' : null,
    phone: phone => !Boolean(phone) ? 'Phone is required' : null,
    address: address => !Boolean(address) ? 'Address is required' : null,
  };

  const validate = () => {
    const anyErrors = Object.keys(errors).length;
    setIsValid(!anyErrors);
  }

  useEffect(() => {
    validate();
  }, [errors]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log('--handlechange--', {name, value})
    setUserData((prev) => {
      return {...prev, ...{[name]: value}}
    })
    if (name !== 'gender' && name !== 'status') {
      validate();
    }
  }

  const handleBlur = (e) => {
    const {name, value } = e.target;
    const { [name] : removedError, ...rest } = errors;
    const error = validateFormFields[name](value);
    setErrors({
      ...rest,
      ...(error && {[name]: error}),
    });
  }

  // const handleImage = (event) => {
  //   console.log('--files--', event.target.files);
  //   // setImage(event.target.files[0]);
  //   const {name, value } = event.target;
  //   console.log({name, value});
  //   setUserData((prev) => {
  //     return {...prev, [name]: value}
  //   });
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {...userData,
      //img: 'assets/products/product14.jpg'
    }
    console.log('---handleCick----',{user});
    editUser(user._id, user, dispatch)
      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
        error && console.log(errorMessage);
        clearForm();
      })
      .catch(err => {
        console.log(errorMessage);
      });
  }

  const clearForm = (e) => {
    setUserData({...userData});
    // setImage('');
    console.log('----clearForm---', userData, image);
  }

  return (
    <Box flex="1 1 400px" p='20px' sx = {(theme) => ({
      boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`
    })}>
      <Typography sx={{ mt: 4, mb: 2, pl: 2, fontSize: '24px', fontWeight: 'bold' }} variant="h4" component="div">
        Edit
      </Typography>
      <FormGroup sx={{
        '& > :not(style)': { m: 1,  },
        '& .MuiButtonBase-root': {
          bgcolor: 'button.main',
          color: 'secondary.light',
        },
        '& .MuiButtonBase-root:hover': {
          bgcolor: 'button.hover',
          color: 'primary.light',
        },
        '& .MuiFormLabel-root.MuiFormLabel-colorPrimary.Mui-focused': {
          color: 'primary.light'
        },
      }}>
        <TextField
          error = { !!errors['username'] }
          id="username"
          label="Username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={userData.username}
          required
          helperText = {errors['username']} 
        />
        <TextField
          id="tagline"
          label="Tagline"
          name="tagline"
          onChange={handleChange}
          value={userData.tagline}
        />
        <TextField
          error = { !!errors['name'] }
          id="name"
          label="Name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={userData.name}
          required
          helperText = {errors['name']} 
        />
        <TextField
          error = { !!errors['email'] }
          id="email"
          label="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={userData.email}
          required
          helperText = {errors['email']} 
        />
        <TextField
          id="admin"
          select
          label="Admin"
          value={userData.isAdmin}
          name="isAdmin"
          onChange={handleChange}
        >
          {admin.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="image"
          label="Image"
          name="img"
          onChange={handleChange}
          value={userData.img}
        />
        <TextField
          error = { !!errors['phone'] }
          id="phone"
          label="Phone"
          name="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={userData.phone}
          required
          helperText = {errors['phone']} 
        />

        <TextField
          error = { !!errors['address'] }
          id="address"
          label="Address"
          name="address"
          onChange={handleChange}
          onBlur={handleBlur}
          value={userData.address}
          required
          helperText = {errors['address']} 
        />

        <FormControl  error = { !!errors['gender'] }  required>
          <FormLabel id="radio-gender">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-gender"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            sx= {{
              // '& .MuiTouchRipple-root': {
              //   bgcolor:  "rgba(0,0,0,0.1)"
              // },
              '& .MuiButtonBase-root.MuiRadio-root': {
                bgcolor: 'secondary.main'
              },
              "& .MuiRadio-root": { color: 'secondary.contrastText' },
              "& .MuiRadio-root.Mui-checked": { color: 'button.main' }
            }}
          >
            <FormControlLabel value="female" control={<Radio size='small' sx={{bgcolor: 'secondary.main'}}/>} label="Female" />
            <FormControlLabel value="male" control={<Radio size='small'/>} label="Male" />
            <FormControlLabel value="other" control={<Radio size='small'/>} label="Other" />
          </RadioGroup>
        </FormControl>
        <FormControl error = { !!errors['status'] }  required>
          <FormLabel id="radio-status">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-status"
            name="status"
            value={userData.status}
            onChange={handleChange}
            sx= {{
              // '& .MuiTouchRipple-root': {
              //   bgcolor:  "rgba(0,0,0,0.1)"
              // },
              '& .MuiButtonBase-root.MuiRadio-root': {
                bgcolor: 'secondary.main'
              },
              "& .MuiRadio-root": { color: 'secondary.contrastText' },
              "& .MuiRadio-root.Mui-checked": { color: 'button.main' }
            }}
          >
            {userStatus.map((option) => (
              <FormControlLabel key={option.value} value={option.value} control={<Radio size='small'/>} label={option.label} />
            ))}
          </RadioGroup>
        </FormControl>

        <Button disabled= {!isValid} 
          onClick={handleSubmit} 
          sx={{bgcolor: 'button.main',
          m: '0 auto', 
          width: '100px'
        }}> Update </Button>
        {showMessage && <FormLabel  sx={{color: 'red !important'}}> { error && `User not saved ! ${errorMessage.message}` } </FormLabel> }
        {showMessage && <FormLabel  sx={{color: 'green !important'}}> { !error && 'User saved !' } </FormLabel> }
      </FormGroup>
    </Box>
  )
}

export default UserEditForm
