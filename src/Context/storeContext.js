import React, { createContext, useReducer } from 'react';

import globalReducers from './globalReducers';

export const storeContext = createContext();

const initialState = {
  expenses: [
    {
      transactionName: 'Bill',
      transactionAmount: -100,
      transactionId: 'jsoj39q9zn',
    },
    {
      transactionName: 'Salary',
      transactionAmount: 10000,
      transactionId: 'asoj3dq9zn',
    },
  ],
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducers, initialState);
  return (
    <storeContext.Provider value={[state, dispatch]}>
      {props.children}
    </storeContext.Provider>
  );
};
export default StoreProvider;
