import React from 'react'
import { Box, useTheme } from '@mui/material'
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightModeIcon from '@mui/icons-material/LightMode';
import PersonIcon from '@mui/icons-material/Person';
import InsightsIcon from '@mui/icons-material/Insights';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import Switch from '@mui/material/Switch';
import { Link } from 'react-router-dom';
const Sidebar = ({mode, setMode}) => {
  const theme = useTheme();
  console.log(theme);
  return (
    <Box bgcolor="primary.main" 
      color= "custom.main"
      sx={
        { paddingLeft: '0px',
          flex: '1 1 56px',
          maxWidth: {xxxs: '76px', md: '20%', lg: '178px'},
          minWidth: {xxxs: '56px', md: '160px'},
          // '@media (max-width: 780px)': {
          //   maxWidth: '56px'
          // }
        }
      }
    >
      <Box position='fixed'
        sx= {{ maxWidth: '100%', padding: '.5rem'}}>
        <List 
          sx={{
            // selected and (selected + hover) states
            '&& .Mui-selected, && .Mui-selected:hover': {
              bgcolor: 'red',
              '&, & .MuiListItemIcon-root': {
                color: 'pink',
              },
            },
            // hover states
            '& .MuiListItemButton-root:hover': {
              bgcolor: 'primary.dark',
              '&, & .MuiListItemIcon-root, & .MuiSvgIcon-root': {
                color: 'primary.light',
              },
            },
            '& ul': { 
              padding: {xxxs: 0, sm: 0,
              }
            },
            '& .MuiButtonBase-root': {
              pr: {xxxs: 0, sm: '0px'},
              maxWidth: {xxxs: '50px', sm: '100%'}
            },
            '& .MuiListItemIcon-root': {
              minWidth: {xxxs: '24px', md: '56px'},
            },
            '& .MuiListItemText-root, & .MuiListSubheader-root' : {
              display: {xxxs: 'none', sm: 'none', 
                        md: 'block'},
              // '@media (max-width: 780px)': {
              //   display: 'none'
              // }
            },
            '& .MuiListSubheader-root' : {
              bgcolor: 'transparent'
            },
            "& .MuiSvgIcon-root": {
              color: "custom.main"
            },
            '& a': {
                color: 'inherit',
                textDecoration: 'none'
              }
            
          }}
        >
          <li>
            <ul>
              <ListSubheader>{`Dashboard`}</ListSubheader>
              <ListItem disablePadding color="primary">
                <Link to='/' >
                  <ListItemButton sx={{
                        color: 'primary',
                        fontWeight: 'medium',
                        variant: 'body2',
                      }}>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InsightsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sales" />
                </ListItemButton>
              </ListItem>
            </ul>
            <ul>
              <ListSubheader>{`Menu`}</ListSubheader>
              <ListItem disablePadding>
                <Link to='/user' >
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem disablePadding>
                <Link to='/product' >
                  <ListItemButton>
                    <ListItemIcon>
                      <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem sx={{ 
                pl: {xxxs: 0, sm: 0 },
                pr: 0 }}>
                <ListItemButton sx={{ pl: {xxxs: 0, sm: 0, md: 2
                    } }}>
                  <ListItemIcon 
                    sx={{'@media (max-width: 780px)': {
                        display: 'none'
                      }}}>
                    <LightModeIcon />
                  </ListItemIcon>
                  <Switch onChange={((e) => setMode(mode === 'light' ? 'dark' : 'light'))} 
                    defaultChecked 
                    color="custom"
                    />
                </ListItemButton>
              </ListItem>
            </ul>
          </li>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar
