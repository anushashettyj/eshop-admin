import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, deleteUsers } from '../redux/apiRequests/user';

const Item = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  console.log('---users---', users)
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
  };

  const handleMultiDelete = () => {
    deleteUsers(rowSelectionModel, dispatch)
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'user', headerName: 'User', width: 250, renderCell: (params) => {
      return (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <img style={{width: '32px',
            height: '32px',
            objectFit: 'cover',
            borderRadius: '50%',
            marginRight: '10px'}}  src={params.row.img} alt='' />
          {params.row.name}
        </div>
      )
    } },
    { field: 'email', headerName: 'Email', width: 200 },
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
            <Link to={'/user/'+ params.row._id }>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon className='userListDel' onClick={()=> handleDelete(params.row._id)} />
          </>
        )
      }
    },
  ];

  return (
    <>
      
      <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Item><Button disabled={rowSelectionModel.length === 0} 
          onClick={handleMultiDelete} 
          variant="contained" sx={{bgcolor: 'button.main', borderRadius: '0'}}>Delete</Button></Item>
        <Link to='/newUSER' className='link'> 
          <Item><Button variant="contained" sx={{bgcolor: 'button.main'}}>New User</Button></Item>
        </Link>
      </Stack>
        <Box sx={{ height: '75vh', 
          width: '100%',
          maxWidth: '1000px',
          margin: '1rem auto',
          bgcolor: 'prim.bg' }}>
          <DataGrid
            disableRowSelectionOnClick
            rows={users}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={10}
            rowsPerPageOptions={[10, 25]}
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

export default UserList
