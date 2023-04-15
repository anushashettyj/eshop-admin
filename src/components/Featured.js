import React from 'react'
import { Box, Grid, Card, CardContent, Typography } from '@mui/material'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

const Featured = () => {
  return (
    <>
      <Grid container>
        <Grid item xxxs={12} sm={12} md={4} p={2}>
          <Box width='100%' height='100%' color="primary.dark">
            <Card>
              <CardContent sx = {(theme) => ({
                background: `linear-gradient(to bottom, ${theme.palette.gradient.light}, ${theme.palette.gradient.dark})`
              })}>
                <Typography variant="h6" component='span'>
                    Revenue
                </Typography>
                <Typography component='div'
                  margin= '10px 0px'
                  display='flex'
                  alignItems='center'>
                  <Typography component='span'
                    fontSize='30px'
                    fontWeight='600'
                  >$2,500
                  </Typography>
                  <Typography component='span'
                    display= 'flex'
                    alignItems= 'center'
                    ml= '20px'
                    >
                      -11.8 <KeyboardDoubleArrowDownIcon />
                  </Typography>
                </Typography>
                <Typography variant="h6" component='div' color='text.secondary'>
                  Compared to last month
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xxxs={12} sm={12} md={4} p={2}>
          <Box width='100%' height='100%' color="primary.dark">
            <Card>
              <CardContent sx = {(theme) => ({
                background: `linear-gradient(to bottom, ${theme.palette.gradient.light}, ${theme.palette.gradient.dark})`
              })}>
                <Typography variant="h6" component='span'>
                    Sales
                </Typography>
                <Typography component='div'
                  margin= '10px 0px'
                  display='flex'
                  alignItems='center'>
                  <Typography component='span'
                    fontSize='30px'
                    fontWeight='600'
                  >$4,600
                  </Typography>
                  <Typography component='span'
                    display= 'flex'
                    alignItems= 'center'
                    ml= '20px'>
                      -1.6 <KeyboardDoubleArrowDownIcon />
                  </Typography>
                </Typography>
                <Typography variant="h6" component='div' color='text.secondary'>
                  Compared to last month
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        <Grid item xxxs={12} sm={12} md={4} p={2}>
          <Box width='100%' height='100%' color="primary.dark">
            <Card>
              <CardContent sx = {(theme) => ({
                background: `linear-gradient(to bottom, ${theme.palette.gradient.light}, ${theme.palette.gradient.dark})`
              })}>
                <Typography variant="h6" component='span'>
                    Cost
                </Typography>
                <Typography component='div'
                  margin= '10px 0px'
                  display='flex'
                  alignItems='center'>
                  <Typography component='span'
                    fontSize='30px'
                    fontWeight='600'
                  >$2,506
                  </Typography>
                  <Typography component='span'
                    display= 'flex'
                    alignItems= 'center'
                    ml= '20px'>
                      +2.5 <KeyboardDoubleArrowUpIcon />
                  </Typography>
                </Typography>
                <Typography variant="h6" component='div' color='text.secondary'>
                  Compared to last month
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Featured
