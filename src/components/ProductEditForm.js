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
import { editProduct } from '../redux/apiRequests/product';
import { useSelector, useDispatch } from 'react-redux';
import { active, sizes, colors, categories } from '../data';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProductEditForm = ({product}) => {
  const [productData, setProductData] = useState(product);
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { error, errorMessage } = useSelector(state => state.product);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateFormFields = {
    title: title => !Boolean(title) ? 'Title is required' : null,
    desc: desc => !Boolean(desc) ? 'Description is required' : null,
    price: price => !Boolean(price) ? 'Price is required' : null,
    quantity: quantity => !Boolean(quantity) ? 'Quantity is required' : null,
    status: status => !Boolean(status) ? 'Status is required' : null,
    categories: category=> category.length ? null : 'Choose atleast 1 category',
    size: size => size.length ? null : 'Choose atleast 1 Size',
    color: color => color.length ? null : 'Choose atleast 1 Color'
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
    let updateObj = {[name]: value};
    const isSelectFields = () => (['categories', 'size', 'color'].indexOf(name) !== -1);
    if (isSelectFields()) {
      updateObj.value = typeof value === 'string' ? value.split(',') : value;
    }
    setProductData((prev) => {
      return {...prev, ...updateObj}
    })
    if (isSelectFields()) {
      const { [name] : removedError, ...rest } = errors;
      const error = validateFormFields[name](value);
      setErrors({
        ...rest,
        ...(error && {[name]: error}),
      });
    }
    if (name !== 'active' && name !== 'inStock') {
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

  const handleImage = (event) => {
    console.log('--files--', event.target.files);
    // setImage(event.target.files[0]);
    const {name, value } = event.target;
    console.log({name, value});
    setProductData((prev) => {
      return {...prev, [name]: value}
    });
  }

  const handleClick = (e) => {
    e.preventDefault();
    const product = {...productData,
      //img: 'assets/products/product14.jpg'
    }
    console.log('---handleCick----',{product});
    editProduct(product._id, product, dispatch)
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
    setProductData({...productData});
    setImage('');
    console.log('----clearForm---', productData, image);
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
          error = { !!errors['title'] }
          id="outlined-error"
          label="Title"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={productData.title}
          required
          helperText = {errors['title']}
        />
        <TextField
          error = { !!errors['desc'] }
          id="outlined-error"
          label="Description"
          multiline
          name="desc"
          value={productData.desc}
          onChange={handleChange}
          required
          onBlur = {handleBlur}
          helperText = {errors['desc']}
        />
        <TextField
          error = { !!errors['price'] }
          id="outlined-error"
          label="Price"
          value={productData.price}
          name="price"
          type="number"
          onChange={handleChange}
          onBlur = {handleBlur}
          required
          helperText = {errors['price']}
        />
        <TextField
          error = { !!errors['quantity'] }
          id="outlined-error"
          label="Quantity"
          value={productData.quantity}
          name="quantity"
          type="number"
          onChange={handleChange}
          onBlur = {handleBlur}
          required
          helperText = {errors['quantity']}
        />
        <TextField
          id="outlined-error"
          label="Image"
          value={productData.img}
          name="img"
          onChange={handleChange}
          required
        />
        <TextField
          error = { !!errors['status'] }
          id="outlined-error"
          label="Status"
          name="status"
          value={productData.status}
          onChange={handleChange}
          onBlur = {handleBlur}
          required
          helperText = {errors['status']}
        />
        <TextField
          id="outlined-select-active"
          select
          label="Active"
          value={productData.active}
          name="active"
          onChange={handleChange}
        >
          {active.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl error = { !!errors['categories'] } required sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-checkbox-category">Category</InputLabel>
          <Select
            labelId="multiple-checkbox-category"
            id="multiple-category"
            multiple
            name="categories"
            value={productData.categories}
            onChange={handleChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={productData.categories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
          {errors['categories'] && <FormHelperText>{errors['categories']}</FormHelperText>}
        </FormControl>
        <FormControl error = { !!errors['size'] }  required sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label">Size</InputLabel>
          <Select
            labelId="multiple-checkbox-size"
            id="multiple-size"
            multiple
            name="size"
            value={productData.size}
            onChange={handleChange}
            input={<OutlinedInput label="Size" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                <Checkbox checked={productData.size.indexOf(size) > -1} />
                <ListItemText primary={size} />
              </MenuItem>
            ))}
          </Select>
          {errors['size'] && <FormHelperText>{errors['size']}</FormHelperText>}
        </FormControl>
        <FormControl error = { !!errors['color'] }  required sx={{ m: 1, width: 300 }}>
          <InputLabel id="multiple-checkbox-color">Color</InputLabel>
          <Select
            labelId="multiple-checkbox-color"
            id="multiple-color"
            multiple
            name="color"
            value={productData.color}
            onChange={handleChange}
            input={<OutlinedInput label="Color" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                <Checkbox checked={productData.color.indexOf(color) > -1} />
                <ListItemText primary={color} />
              </MenuItem>
            ))}
          </Select>
          {errors['color'] && <FormHelperText>{errors['color']}</FormHelperText>}
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormLabel id="row-radio-buttons-group-label">In Stock</FormLabel>
          <RadioGroup
            row
            aria-labelledby="row-radio-buttons-group-label"
            name="inStock"
            value={productData.inStock}
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
            <FormControlLabel value="true" control={<Radio size='small' sx={{bgcolor: 'secondary.main'}}/>} label="Yes" />
            <FormControlLabel value="false" control={<Radio size='small'/>} label="No" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 1, display: 'flex',
          alignItems: 'flex-start', 
          flexDirection:'row',
          width: '400px',
          gap: 1 }}>
          <Button sx={{ width: '100px' }} variant="contained" component="label">
            Upload
            <input name="imag"  hidden accept="image/*" type="file" onChange={handleImage}/>
          </Button>
          { image && <img alt='product pic' 
            width='100px' height='100px' 
            src={URL.createObjectURL(image)} />
          }
        </FormControl>
        <Button type="submit" 
          disabled= {!isValid} 
          onClick= {handleClick}
          sx={{bgcolor: 'button.main',
          m: '0 auto', 
          width: '100px'
        }}> Update </Button>
        {showMessage && <FormLabel  sx={{color: 'red !important'}}> { error && `Product not saved ! ${errorMessage.message}` } </FormLabel> }
        {showMessage && <FormLabel  sx={{color: 'green !important'}}> { !error && 'Product saved !' } </FormLabel> }    
      </FormGroup>
    </Box>
  )
}

export default ProductEditForm
