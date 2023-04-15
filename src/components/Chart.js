import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = ({ title, data, dataKey, grid, width }) => {
  return (
      <Grid container mt={4} p='20px' sx = {(theme) => ({
        boxShadow: `0px 10px 15px -5px ${theme.palette.gradient.darkrgba}`,
        width: {width}
      })}>
        <Grid item xxs={12}>
          <Box container='h2' >

            <Typography variant='h6' fontSize= '24px' mb= '20px' > {title}</Typography>
          
            <ResponsiveContainer width= '99%' aspect= {3}>
              <LineChart data={data}>
                <XAxis dataKey='name' stroke='#11705f' />
                <Line type="monotone" dataKey={dataKey} stroke="#e30d0dde" />
                <Tooltip />
                { grid && <CartesianGrid stroke='#bbae9f' strokeDasharray='5 5' /> }
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </Grid>
  )
}

export default Chart
