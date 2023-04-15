import React from 'react'
import Featured from '../components/Featured';
import Chart from '../components/Chart';
import {userData} from '../data';
import { Box } from '@mui/material';
import UserWidget from '../components/UserWidget';
import TransactionWidget from '../components/TransactionWidget';
const Home = () => {
  return (
    <>
      <Featured />
      <Chart data={userData} title='User Analytics' grid dataKey='Active User'/>
      <Box display='flex' my= '32px' py='2rem' flexWrap= 'wrap' gap='2rem'
        justify-content= 'space-around'>
        <UserWidget />
        <TransactionWidget />
      </Box>
    </>
  )
}

export default Home
