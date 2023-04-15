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
  Select  } from '@mui/material';
import { useState, useEffect } from 'react';
import { newProduct } from '../redux/apiRequests/product';
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

const initialInput = {
  title: '',
  desc: '',
  price: '',
  quantity: '',
  img: '',
  status: ''
};

const initialTouched = {
  title: false,
  desc: false,
  price: false,
  quantity: false,
  status: false,
  categories: false,
  size: false,
  color: false
};

const NewProduct = () => {
  const [inputs, setInputs] = useState(initialInput);
  const [isActive, setIsActive] = useState('true');
  const [inStock, setInStock] = useState('true');
  const [productSize, setProductSize] = useState([]);
  const [productColor, setProductColor] = useState([]);
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { error, errorMessage, products } = useSelector(state => state.product);
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(initialTouched);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  console.log('********* products ****', products);
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
    console.log('--validate()---touched --', touched);
    const isNotTouched = Object.values(touched).some((field, idx) => {
      console.log({field,idx});
      return !field;
    });
    const anyErrors = Object.keys(errors).length;
    console.log({isNotTouched, anyErrors, errors});
    setIsValid(!isNotTouched && !anyErrors);
  }

  useEffect(() => {
    console.log('--useEffect call validate--')
    validate();
  }, [errors, touched]);

  const handleChange = (e) => {
    const {name, value } = e.target;
    console.log('--handlechange--', inputs)
    setInputs((prev) => {
      return { ...prev, [name]: value }
    });
    // setTouched({
    //   ...touched,
    //   [name]: true,
    // });
    validate();
  }

  const handleBlur = (e) => {
    console.log('---handleBlur--', e.target);
    const {name, value } = e.target;
    const { [name] : removedError, ...rest } = errors;
    !touched[name] && (
    setTouched({ 
      ...touched,
      [name]: true,
    }));
    const error = validateFormFields[name](value);
    console.log('---handleBlur error--', error);
    setErrors({
      ...rest,
      ...(error && {[name]: error}),
    });
  }

  const handleColorChange = (event) => {
    const {
      target: { value },
    } = event;
    const { [event.target.name] : removedError, ...rest } = errors;
    setProductColor(
      typeof value === 'string' ? value.split(',') : value,
    );
    !touched[event.target.name] && (
      setTouched({ 
        ...touched,
        [event.target.name]: true,
      }));
      const error = validateFormFields[event.target.name](value);
      console.log('---handleBlur error--', error);
      setErrors({
        ...rest,
        ...(error && {[event.target.name]: error}),
      });
  };

  const handleSizeChange = (event) => {
    const {
      target: { value },
    } = event;
    const { [event.target.name] : removedError, ...rest } = errors;
    setProductSize(
      typeof value === 'string' ? value.split(',') : value,
    );
    !touched[event.target.name] && (
      setTouched({ 
        ...touched,
        [event.target.name]: true,
      }));
    const error = validateFormFields[event.target.name](value);
    console.log('---handleBlur error--', error);
    setErrors({
      ...rest,
      ...(error && {[event.target.name]: error}),
    });
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    const { [event.target.name] : removedError, ...rest } = errors;
    setCategory(
      typeof value === 'string' ? value.split(',') : value,
    );
    !touched[event.target.name] && (
      setTouched({ 
        ...touched,
        [event.target.name]: true,
      }));
    const error = validateFormFields[event.target.name](value);
    console.log('---handleBlur error--', error);
    setErrors({
      ...rest,
      ...(error && {[event.target.name]: error}),
    });
  };

  const handleImage = (event) => {
    console.log('--files--', event.target.files);
    setImage(event.target.files[0]);
  }

  const handleInStockChange = (event) => {
    console.log('--handleInStockChange--', event.target.value)
    setInStock(event.target.value);
  };

  const handleIsActive = (event) => {
    console.log('--handleIsActive--', event.target.value)
    setIsActive(event.target.value);
  }

  const handleClick = (e) => {
    e.preventDefault();
    const product = {...inputs,
      //img: 'assets/products/product14.jpg',
      size: productSize,
      color: productColor,
      categories: category,
      img: image,
      inStock,
      active: isActive
    }
    console.log({product});
    newProduct(product, dispatch)
      .then(() => {
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
        // error && setShowError(true);
        // !error && setShowSuccess(true);
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
    setProductSize([]);
    setProductColor([]);
    setCategory([]);
    setTouched({...touched, ...initialTouched});
    // setShowError(false);
    console.log('----clearForm---3', inputs, category, productSize, productColor);
  }

  return (
    <Box flex="1 1 400px" p='20px' maxWidth= '1000px'
    m= '0 auto' sx = {(theme) => ({
      boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`
    })}>
      <Typography sx={{ mt: 4, mb: 2, pl: 2, fontSize: '24px', fontWeight: 'bold' }} variant="h4" component="div">
        New Product
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
        '& .MuiFormLabel-root.MuiFormLabel-colorPrimary': {
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
          error = { !!errors['title'] }
          id="outlined-error"
          label="Title"
          // defaultValue="Enter Username"
          // placeholder="Enter Product Name"
          name="title"
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputs.title}
          required
          helperText = {errors['title']}
        />
        <TextField
          error = { !!errors['desc'] }
          id="outlined-error"
          label="Description"
          // defaultValue="Enter Username"
          // placeholder="Enter Product Description"
          multiline
          name="desc"
          value={inputs.desc}
          onChange={handleChange}
          required
          onBlur = {handleBlur}
          helperText = {errors['desc']}
          // value={profilePic[0].username}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   setName(event.target.value);
          // }}
        />
        <TextField
          error = { !!errors['price'] }
          id="outlined-error"
          label="Price"
          // placeholder="Enter Product Price"
          value={inputs.price}
          name="price"
          type="number"
          onChange={handleChange}
          onBlur = {handleBlur}
          required
          helperText = {errors['price']}
          // defaultValue={profilePic[0].name}
          // value={profilePic[0].name}
        />
        <TextField
          error = { !!errors['quantity'] }
          id="outlined-error"
          label="Quantity"
          // placeholder="Enter Product Quantity"
          value={inputs.quantity}
          name="quantity"
          type="number"
          onChange={handleChange}
          onBlur = {handleBlur}
          required
          // defaultValue="Enter Quantity"
          // value={profilePic[0].email}
          helperText = {errors['quantity']}
        />
        <TextField
          id="outlined-error"
          label="Img"
          // placeholder="Enter Product Img"
          value={inputs.img}
          name="img"
          onChange={handleChange}
          // defaultValue="Enter Quantity"
          // value={profilePic[0].email}
        />
        <TextField
          error = { !!errors['status'] }
          id="outlined-error"
          label="Status"
          name="status"
          // placeholder="Enter Product Status"
          value={inputs.status}
          onChange={handleChange}
          onBlur = {handleBlur}
          required
          helperText = {errors['status']}
          // defaultValue="Enter Status"
          // value={profilePic[0].email}
        />
        <TextField
          id="outlined-select-active"
          select
          label="Active"
          value={isActive}
          name="active"
          onChange={handleIsActive}
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
            value={category}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                <Checkbox checked={category.indexOf(item) > -1} />
                <ListItemText primary={item} /> 
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
            value={productSize}
            onChange={handleSizeChange}
            input={<OutlinedInput label="Size" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                <Checkbox checked={productSize.indexOf(size) > -1} />
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
            value={productColor}
            onChange={handleColorChange}
            input={<OutlinedInput label="Color" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                <Checkbox checked={productColor.indexOf(color) > -1} />
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
            value={inStock}
            onChange={handleInStockChange}

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
        <Box flexBasis= '100%'>
          <Button type="submit" disabled= {!isValid} onClick= {handleClick} sx={{bgcolor: 'button.main',
            m: '0 auto',
            minWidth: '100px'
          }}> Save </Button>
        </Box>
        {showMessage && <FormLabel  sx={{color: 'red !important'}}> { error && `Product not saved ! ${errorMessage.message}` } </FormLabel> }
        {showMessage && <FormLabel  sx={{color: 'green !important'}}> { !error && 'Product saved !' } </FormLabel> }    
      </FormGroup>
    </Box>
  )
}

export default NewProduct
