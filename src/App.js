import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import Balance from './Components/Balance';
import History from './Components/History';
import AddTransaction from './Components/AddTransaction';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container className={classes.root} maxWidth='xs'>
        <Balance />
        <History />
        <AddTransaction />
        <center style={{ opacity: 0.3, marginTop: 50 }}>
          <p>Copyrights © bilaltahseen</p>
        </center>
      </Container>
    </React.Fragment>
  );
};

export default App;
