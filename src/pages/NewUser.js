import React from 'react'
import { Button, 
  Box, 
  FormGroup,
  MenuItem ,
  TextField, 
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';

import { useState, useEffect } from 'react';
import { newUser } from '../redux/apiRequests/user';
import { useSelector, useDispatch } from 'react-redux';
import { admin, userStatus} from '../data';

const initialInput = {
  username: '',
  tagline: '',
  name: '',
  email: '',
  password: '',
  gender: '',
  isAdmin: false,
  img: '',
  alt: '',
  phone: '',
  address: '',
  status: '',
  isLogged: false
};

const initialTouched = {
  username: false,
  name: false,
  email: false,
  password: false,
  gender: false,
  phone: false,
  address: false,
  status: false,
};

const NewUser = () => {
  const [inputs, setInputs] = useState(initialInput);
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { error, errorMessage, users } = useSelector(state => state.user);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(initialTouched);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
  console.log('********* users ****', users);
  const validateFormFields = {
    username: username => !Boolean(username) ? 'Username is required' : null,
    name: name => !Boolean(name) ? 'Name is required' : null,
    email: email => !Boolean(email) ? 'Email is required' : null,
    password: password => !Boolean(password) ? 'Password is required' : null,
    gender: gender => !Boolean(gender) ? 'Gender is required' : null,
    phone: phone => !Boolean(phone) ? 'Phone is required' : null,
    address: address => !Boolean(address) ? 'Address is required' : null,
    status: status=> !Boolean(status) ? 'Status is required' : null,
  };

  const validate = () => {
    console.log('--validate()---touched --', touched);
    const isNotTouched = Object.values(touched).some((field, idx) => {
      console.log({field,idx});
      return !field;
    });
    const anyErrors = Object.keys(errors).length;
    console.log({isNotTouched, anyErrors, errors});
    setIsValid(!isNotTouched && !anyErrors);
  }

  const handleChange = (e) => {
    const {name, value } = e.target;
    const isSelectFields = () => (['gender', 'status'].indexOf(name) !== -1);
    console.log('--handlechange--', {name, value, inputs})
    setInputs((prev) => {
      return { ...prev, [name]: value }
    });
    if (isSelectFields()) {
      !touched[name] && (
        setTouched({ 
          ...touched,
          [name]: true,
      }));
      const { [name] : removedError, ...rest } = errors;
      const error = validateFormFields[name](value);
      setErrors({
        ...rest,
        ...(error && {[name]: error}),
      });
    }
    validate();
  }

  useEffect(() => {
    validate();
  }, [errors, touched]);

  const handleImage = (event) => {
    console.log('--files--', event.target.files);
    setImage(event.target.files[0]);
  }

  const handleBlur = (e) => {
    const {name, value } = e.target;
    const { [name] : removedError, ...rest } = errors;
    !touched[name] && (
    setTouched({ 
      ...touched,
      [name]: true,
    }));
    const error = validateFormFields[name](value);
    setErrors({
      ...rest,
      ...(error && {[name]: error}),
    });
  }
  
  const handleClick = (e) => {
    e.preventDefault();
    const user = {...inputs,
      //img: 'assets/products/product14.jpg',
      tagline: inputs.tagline || undefined
    }
    console.log('--handleClick--',{user});
    newUser(user, dispatch)
      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
        error && console.log(errorMessage);
        clearForm();
      })
      .catch(err => {
        console.log('---err--', err);
        console.log(errorMessage);
      });
  }

  const clearForm = (e) => {
    console.log('----clearForm---1', inputs);
    console.log('----clearForm---2', initialInput);
    setInputs({...initialInput});
    setImage('');
    setTouched({...touched, ...initialTouched});
    // setShowError(false);
    console.log('----clearForm---3', inputs);
  }

  return (
    <Box flex="1 1 400px" p='20px' maxWidth= '1000px'
    m= '0 auto' sx = {(theme) => ({
      boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`
    })}>
      <Typography sx={{ mt: 4, mb: 2, pl: 2, fontSize: '24px', fontWeight: 'bold' }} variant="h4" component="div">
        New User
      </Typography>
      <FormGroup sx={{
        '& > :not(style)': { m: 1},
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        '& .MuiFormControl-root': {
          flex: '2 2 400px',
          maxWidth: '450px'
        }
      }}>
        <TextField
          error = { !!errors['username'] }
          id="username"
          label="Username"
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputs.username}
          required
          helperText = {errors['username']}
        />
        <TextField
          id= "tagline"
          label="Tagline"
          name="tagline"
          onChange={handleChange}
          value={inputs.tagline}
        />
        <TextField
          error = { !!errors['name'] }
          id="name"
          label="Name"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputs.name}
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
          value={inputs.email}
          required
          helperText = {errors['email']}
        />
        <TextField
          error = { !!errors['password'] }
          id="password"
          type='password'
          label="Password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputs.password}
          required
          helperText = {errors['password']}
        />
        {/* <TextField
          id="outlined-select-gender"
          select
          label="Gender"
          value={inputs.gender}
          name="gender"
          onChange={handleChange}
          required
        >
          {gender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField> */}
        <TextField
          id="admin"
          select
          label="Admin"
          value={inputs.isAdmin}
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
          value={inputs.img}
        />
        <TextField
          error = { !!errors['phone'] }
          id="phone"
          label="Phone"
          name="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputs.phone}
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
          value={inputs.address}
          required
          helperText = {errors['address']}
        />
        <FormControl  error = { !!errors['gender'] }  required>
          <FormLabel id="radio-gender">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-gender"
            name="gender"
            value={inputs.gender}
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
            value={inputs.status}
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
        {/* <FormControl error = { !!errors['status'] } required sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-checkbox-status">Status</InputLabel>
          <Select
            labelId="multiple-checkbox-status"
            id="multiple-status"
            multiple
            name="status"
            value={input.status}
            onChange={handleChange}
            input={<OutlinedInput label="Status" />}
            renderValue={(selected) => selected}
            MenuProps={MenuProps}
          >
            {userStatus.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={productData.categories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
          {errors['categories'] && <FormHelperText>{errors['categories']}</FormHelperText>}
        </FormControl> */}
        
        <Box flexBasis= '100%'>
          <Button type="submit"
            disabled= {!isValid} 
            onClick= {handleClick}
            sx={{bgcolor: 'button.main',
              m: '0 auto',
              minWidth: '100px'
            }}> Save </Button>
        </Box>
        {showMessage && <FormLabel  sx={{color: 'red !important'}}> { error && `User not saved ! ${errorMessage.message}` } </FormLabel> }
        {showMessage && <FormLabel  sx={{color: 'green !important'}}> { !error && 'User saved !' } </FormLabel> }
      </FormGroup>
    </Box>
  )
}

export default NewUser;
