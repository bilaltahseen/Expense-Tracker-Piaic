import React from 'react';
import { makeStyles, Typography, Box, Paper, Grid } from '@material-ui/core';
import { storeContext } from '../Context/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontWeight: 600,
    fontSize: theme.typography.fontSize + 20,
  },
  balance: {
    fontWeight: 500,
    marginTop: 20,
    fontSize: theme.typography.fontSize,
  },
  amount: {
    fontWeight: 600,
    fontSize: theme.typography.fontSize + 20,
  },
  card: {
    marginTop: 20,
    padding: '20px',
    textAlign: 'center',

    '& h6': {
      fontWeight: 600,
      fontSize: theme.typography.fontSize,
    },

    '& h5[title~=income]': {
      color: theme.palette.secondary.main,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.fontSize + 1,
    },
    '& h5[title~=expense]': {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.fontSize + 1,
    },
  },
}));

const Balance = () => {
  const classes = useStyles();
  const [state] = React.useContext(storeContext);
  let balance = [0];
  state.expenses.forEach((elem) => balance.push(elem.transactionAmount));
  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Typography variant='h5' className={classes.heading} component='h5'>
          Expense Tracker
        </Typography>

        <Typography variant='h6' className={classes.balance}>
          YOUR BALANCE
        </Typography>
        <Typography variant='h6' className={classes.amount}>
          $ {balance.reduce((total, num) => parseFloat(total + num)).toFixed(2)}
        </Typography>
        <Paper>
          <Grid
            container
            className={classes.card}
            justify='space-between'
            alignItems='center'
            spacing={2}
          >
            <Grid item xs={5}>
              <Typography variant='h6' component='h6'>
                INCOME
              </Typography>
              <Typography title='income' variant='h5' component='h5'>
                +${' '}
                {balance
                  .reduce((total, num) =>
                    Math.sign(parseFloat(num)) > 0
                      ? parseFloat(total + num)
                      : parseFloat(total)
                  )
                  .toFixed(2)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Box display='flex' flexDirection='row' justifyContent='center'>
                <div
                  style={{ height: 50, borderRight: '1px solid #ccc' }}
                ></div>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Typography variant='h6' component='h6'>
                EXPENSE
              </Typography>
              <Typography title='expense' variant='h5' component='h5'>
                -${' '}
                {balance
                  .reduce((total, num) =>
                    Math.sign(parseFloat(num)) < 0
                      ? parseFloat(total + num)
                      : parseFloat(total)
                  )
                  .toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Balance;
