import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import Chart from '../components/Chart';
import ProductDetail from '../components/ProductDetail';
import ProductEditForm from '../components/ProductEditForm';
import { productData } from '../data';
import { useSelector } from 'react-redux';

const Item = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const EditProduct = () => {
  const { productId } = useParams();
  const product = useSelector(state => state.product.products.find(product => product._id === productId));
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Item><Typography variant="h4" fontWeight= '500'>Edit Product</Typography></Item>
        <Link to='/newProduct' className='link'> 
          <Item><Button variant="contained" sx={{bgcolor: 'button.main'}}>New Product</Button></Item>
        </Link>
      </Stack>
      <Stack direction={{ xxxs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2}}
        bgcolor= 'primary'
        alignItems= 'end'
        >
        <Box width={{xxxs:'100%', sm: '60%'}}>
          <Chart width='100%' data={productData} dataKey="Sales" title='Sales Performance'/>
        </Box>
        <ProductDetail product={product}/>
      </Stack>
      <Stack direction='row' mt={4}>
        <ProductEditForm product={product}/>
      </Stack>
    </>
  )
}

export default EditProduct
