import React from 'react'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ProductListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  maxWidth: '300px',
  justifyContent: 'flex-start',
}));

const ListKey = styled(ListItemText)(({ theme }) => ({
  fontSize: '3rem',
  fontWeight: '600',
  color: 'green',
  flex: 1
}));

const ListVal = styled(ListItemText)(({ theme }) => ({
  fontSize: '24px',
  color: 'button.main',
  fontWeight: 600,
  flex: 2
}));
const ProductDetail = ({product}) => {
  return (
    <Box width={{xxxs:'100%', sm: '40%'}}>
      <Card>
        <CardHeader
          // title= {productList[`${id}`].name}
          title = {product.title}
          subheader= {product.desc}
        />
        <CardMedia
          component="img"
          width= '150px'
          height= '150px'
          image={'../../' + product.img}
          alt={product.alt}
        />
        <CardContent>
          <List>
            <ProductListItem disablePadding>
                <ListKey primary="Id " />
                <ListVal primary={product._id} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Quantity " />
                <ListVal primary={product.quantity} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Status" />
                <ListVal primary={product.status} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Price" />
                <ListVal primary={product.price} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="InStock" />
                <ListVal primary={product.inStock === 'true' ? 'Yes' : 'No'} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Active" />
                <ListVal primary={product.active === 'true' ? 'Yes' : 'No'} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Size" />
                <ListVal primary={product.size.join(', ')} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Color" />
                <ListVal primary={product.color.join(', ')} />
            </ProductListItem>
            <ProductListItem disablePadding>
                <ListKey primary="Categories" />
                <ListVal primary={product.categories.join(', ')} />
            </ProductListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProductDetail
