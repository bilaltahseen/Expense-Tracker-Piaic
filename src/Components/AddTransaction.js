import React from 'react';
import {
  makeStyles,
  Typography,
  TextField,
  Grid,
  Button,
} from '@material-ui/core';
import { storeContext } from '../Context/storeContext';

const useStyles = makeStyles((theme) => ({
  noValue: { color: 'red', fontWeight: 500 },
}));

const AddTransaction = () => {
  const classes = useStyles();
  const [, dispatch] = React.useContext(storeContext);

  const [transactionName, settransactionName] = React.useState('');
  const [transactionAmount, settransactionAmount] = React.useState(0);

  const [checkTrans, setCheckTrans] = React.useState(false);

  const capital_letter = (str) => {
    str = str.toLowerCase().split(' ');

    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(' ');
  };

  const submitEntry = (type) => {
    if (transactionName !== '' && transactionAmount !== 0) {
      setCheckTrans(false);
      if (type === 'Income') {
        let transaction = {
          transactionName: capital_letter(transactionName),
          transactionAmount: +transactionAmount,
          transactionId: Array(1)
            .fill(null)
            .map(() => Math.random().toString(36).substr(2))
            .join(''),
        };
        dispatch({ type: 'ADD_EXPENSE', payload: transaction });
        settransactionName('');
        settransactionAmount(0);
      } else {
        let transaction = {
          transactionName: capital_letter(transactionName),
          transactionAmount: -transactionAmount,
          transactionId: Array(1)
            .fill(null)
            .map(() => Math.random().toString(36).substr(2))
            .join(''),
        };
        dispatch({ type: 'ADD_EXPENSE', payload: transaction });
        settransactionName('');
        settransactionAmount(0);
      }
    } else {
      setCheckTrans(true);
    }
  };
  return (
    <React.Fragment>
      <Typography variant='h6' component='h6'>
        Add Transaction
      </Typography>
      <hr></hr>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            variant='outlined'
            onChange={(event) => settransactionName(event.target.value)}
            color='secondary'
            type='text'
            fullWidth
            value={transactionName}
            inputProps={{ maxLength: 25 }}
            label='Enter Transaction Name'
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type='number'
            variant='outlined'
            color='secondary'
            onChange={(event) =>
              settransactionAmount(Math.abs(event.target.value))
            }
            value={transactionAmount}
            label='Amount'
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => submitEntry('Expense')}
            fullWidth
            variant='contained'
            color='primary'
          >
            Expense
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={() => submitEntry('Income')}
            fullWidth
            variant='contained'
            color='secondary'
          >
            Income
          </Button>
        </Grid>
      </Grid>
      {checkTrans ? (
        <p className={classes.noValue}>Enter Some Transactions</p>
      ) : (
        ''
      )}
    </React.Fragment>
  );
};

export default AddTransaction;
