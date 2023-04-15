import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, deleteProducts } from '../redux/apiRequests/product';

const Item = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch)
  };

  const handleMultiDelete = () => {
    deleteProducts(rowSelectionModel, dispatch)
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'product', headerName: 'Product', width: 250, renderCell: (params) => {
      return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img style={{width: '32px', 
            height: '32px', 
            objectFit: 'cover', 
            borderRadius: '50%',
            marginRight: '10px'}}  src={params.row.img} alt='' />
          {params.row.title}
        </div>
      )
    } },
    {
      field: 'price',
      headerName: 'Price',
      width: 60
    },
    { field: 'quantity', headerName: 'Quantity', width: 70 },
    { field: 'size', headerName: 'Size', width: 70 },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/product/'+ params.row._id }>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon className='productListDel' onClick={()=> handleDelete(params.row._id)} />
          </>
        )
      } 
    },
  ];

  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Item><Button disabled={rowSelectionModel.length === 0} 
          onClick={handleMultiDelete} 
          variant="contained" sx={{bgcolor: 'button.main', borderRadius: '0'}}>Delete</Button></Item>
        <Link to='/newProduct' className='link'> 
          <Item><Button variant="contained" sx={{bgcolor: 'button.main'}}>New Product</Button></Item>
        </Link>
      </Stack>
      <Box>
        <Box sx={{ height: '75vh', 
          width: '100%',
          maxWidth: '1000px',
          margin: '1rem auto',
          bgcolor: 'prim.bg' }}>
          <DataGrid
            disableRowSelectionOnClick
            rows={products}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
          />
        </Box>
      </Box>
    </>
  )
}

export default ProductList
