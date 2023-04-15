import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const createData = (name, date, amount, status) => (
  { name, date, amount, status })

const rows = [
  createData('James Smith', '20 Mar 2023', '$190', 'Await'),
  createData('Nancy Jane', '15 Mar 2023', '$50', 'Delivered'),
  createData('Justin Wright', '15 Mar 2023', '$29', 'Delayed'),
  createData('Catherine Willbert', '14 Feb 2023', '$20', 'Shipped'),
  createData('Jasmine James', '13 Feb 2023', '$90', 'Cancelled'),
];

const styles = {
  '&.MuiButton-Await': {
    bgcolor: 'status.await',
  },
  '&.MuiButton-Delivered': {
    bgcolor: 'status.delivered',
  },
  '&.MuiButton-Delayed': {
    bgcolor: 'status.delayed',
  },
  '&.MuiButton-Processing': {
    bgcolor: 'status.processing',
  },
  '&.MuiButton-Cancelled': {
    bgcolor: 'status.cancelled',
  },
  '&.MuiButton-Pending': {
    bgcolor: 'status.pending'
  },
  '&.MuiButton-Shipped': {
    bgcolor: 'status.shipped'
  },
}

// const StyledButton = styled(Button) ({
//   display: 'flex',
//   justifyContent: 'space-between',
// })

const TransactionWidget = () => {
  return (
    <Box flex="1 1 400px" p='20px' sx = {(theme) => ({
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
        Latest Transactions
      </Typography>
      <TableContainer component={Paper} sx = {{
          borderRadius: '0',
          bgcolor: 'primary.main'
        }}>
        <Table aria-label="simple table">
          <TableHead >
            <TableRow sx= {{ '& .MuiTableCell-head': {fontWeight: '600'}}}>
              <TableCell>Customer </TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right" sx={{
                    '.childClass': {
                      color: 'red'
                    }
                  }}>
                    <Button cursor='text' sx={styles} variant= {row.status}> {row.status}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TransactionWidget
