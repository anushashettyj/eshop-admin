import React from 'react'
import { styled } from '@mui/material/styles';
import { List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Box, 
  ListItemIcon,
  Typography,
} from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';

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

const UserProfile = ({user}) => {
  console.log('--UserProfile--',{user})
  return (
    <Box flex="1 1 200px" p='20px' sx = {(theme) => ({
      boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`
    })}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={user.alt} src={'../../' + user.avatar} sx={{ width: 56, height: 56, mr:'25px' }}/>
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={user.tagline}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <Typography sx={{ mt: 4, mb: 2, pl: 2, fontSize: '20px', fontWeight: 200 }} variant="h6" component="div">
            Account Details
        </Typography>
        <ListItem>
          <ListKey primary="Id " />
          <ListVal primary={user._id} />
        </ListItem>
        <ListItem>
          <ListKey primary="Username " />
          <ListVal primary={user.username} />
        </ListItem>
        <ListItem>
          <ListKey primary="Status " />
          <ListVal primary={user.status} />
        </ListItem>
        <ListItem>
          <ListKey primary="Last Seen " />
          <ListVal primary={user.updatedAt} />
        </ListItem>
        <ListItem>
          <ListKey primary="Gender " />
          <ListVal primary={user.gender} />
        </ListItem>
        <ListItem>
          <ListKey primary="Admin " />
          <ListVal primary={user.isAdmin ? 'Yes' : 'No'} />
        </ListItem>
        <Typography sx={{ mt: 4, mb: 2, pl: 2, fontSize: '20px', fontWeight: 200 }} variant="h6" component="div">
            Contact Details
        </Typography>
        <ListItem>
          <ListItemIcon>
            <PhoneAndroidIcon />
          </ListItemIcon>
          <ListItemText
            primary={user.phone}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <MailOutlineIcon />
          </ListItemIcon>
          <ListItemText
            primary={user.email}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PersonPinCircleIcon />
          </ListItemIcon>
          <ListItemText
            primary={user.address}
          />
        </ListItem>
      </List>
    </Box>
  )
}

export default UserProfile
