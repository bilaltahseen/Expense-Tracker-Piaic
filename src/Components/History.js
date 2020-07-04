import React from 'react';
import {
  makeStyles,
  Typography,
  Box,
  Paper,
  Avatar,
  Zoom,
} from '@material-ui/core';
import { storeContext } from '../Context/storeContext';

const useStyles = makeStyles((theme) => ({
  root: { marginTop: 50 },
  paper: {
    height: 35,
    marginBottom: 10,
    width: '100%',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    transition: 'width 0.5s ease',
    '& span': {
      flex: 1,
      textAlign: 'right',
    },
  },
  btn: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    backgroundColor: 'red',
  },
}));

const History = () => {
  const classes = useStyles();
  const [isClicked, setIsClicked] = React.useState(true);
  const [keys, setKey] = React.useState('');
  const [state, dispatch] = React.useContext(storeContext);

  const checkState = (id) => {
    setIsClicked(!isClicked);
    if (isClicked) {
      setKey(id);
    } else {
      setKey('');
    }
  };

  const deleteTransaction = (id) => {
    console.log(id);
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
  };
  const histroyCardMap = state.expenses.map((elem, index) => {
    return (
      <li key={elem.transactionId}>
        <Box position='relative' display='flex'>
          <Paper
            onClick={() => {
              checkState(elem.transactionId);
            }}
            style={{
              borderRight:
                elem.transactionAmount < 0
                  ? '6px solid #CC6B61'
                  : '6px solid #63D592',
              width: keys === elem.transactionId ? '80%' : '100%',
            }}
            className={classes.paper}
          >
            <p
              style={{
                textDecoration:
                  elem.transactionId === keys ? ' line-through' : 'none',
              }}
            >
              {elem.transactionName}
            </p>
            <span>
              {elem.transactionAmount < 0
                ? `- $ ${elem.transactionAmount.toString().slice(1)}`
                : `+ $ ${elem.transactionAmount}`}
            </span>
          </Paper>
          {keys === elem.transactionId ? (
            <Box
              style={{
                position: 'absolute ',
                top: '50%',
                right: 0,
                transform: 'translate(10%, -55%)',
              }}
            >
              <Zoom timeout={600} in={keys === elem.transactionId}>
                <Avatar
                  onClick={() => deleteTransaction(elem.transactionId)}
                  className={classes.btn}
                >
                  X
                </Avatar>
              </Zoom>
            </Box>
          ) : null}
        </Box>
      </li>
    );
  });

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Typography variant='h6'>History</Typography>
        <hr></hr>
        <ul style={{ listStyleType: 'none', padding: 0 }}>{histroyCardMap}</ul>
      </Box>
    </React.Fragment>
  );
};

export default History;
