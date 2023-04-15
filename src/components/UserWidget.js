import React from 'react'
import { Box, Typography } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import { userRequest } from '../requestProcessor';
import { format } from 'timeago.js';
import pic from '../assets/male.png';
const UserWidget = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async() => {
      try{
        const res = await userRequest.get('user/find?latest=true&limit=5');
        console.log('++++++++ res +++++++', res)
        setUsers(res.data);
      } catch (err) {
        console.log({err});
      }
    };
    getUsers();
  }, [])
  return (
    <Box flex="1 1 300px" p='20px' sx = {(theme) => ({
      boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`
    })}>
      <Typography
        id="ellipsis-list-demo"
        // textTransform="uppercase"
        variant='h6' fontSize= '24px'
        fontWeight="600"
        mb={2}
        sx={{ letterSpacing: '0.15rem' }}
      >
        New Customers
      </Typography>
      <List sx={{ width: '100%',
          bgcolor: 'primary.main',
          '& .MuiListItemText-primary': {
              fontWeight: '600'
            },
            '& .MuiListItemText-secondary': {
              fontWeight: '300'
            }
        }}>
        {users.map((user, idx) => (
          <React.Fragment key={user._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.alt || 'imageAlt'} src={user.img || pic} />
              </ListItemAvatar>
              <ListItemText
                primary={user.name}
                fontWeight= '600'
                color= 'red'
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      color="text.primary"
                    >
                      Last Seen  -  
                    </Typography>
                    {format(user.updatedAt)}
                  </React.Fragment>
                }
              />
            </ListItem>
            {users[idx+1] && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  )
}

export default UserWidget
