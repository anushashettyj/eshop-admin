import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import UserProfile from '../components/UserProfile';
import UserEditForm from '../components/UserEditForm';
import { useSelector } from 'react-redux';
const Item = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const EditUser = () => {
  const { userId } = useParams();
  const user = useSelector(state => state.user.users.find(user => user._id === userId));
  console.log({user})
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Item><Typography variant="h4" fontWeight= '500'>Edit User</Typography></Item>
        <Link to='/newUser' className='link'> 
          <Item><Button variant="contained" sx={{bgcolor: 'button.main'}}>New User</Button></Item>
        </Link>
      </Stack>
      <Box display='flex' my= '32px' py='2rem' flexWrap= 'wrap' gap='2rem'
        justifyContent= 'space-between'>
        <UserProfile user={user} />
        <UserEditForm user={user} />
      </Box>
    </>
  )
}

export default EditUser;
