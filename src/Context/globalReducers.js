const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      let mutateExpense = [...state.expenses, action.payload];
      return { expenses: mutateExpense };
    case 'DELETE_EXPENSE':
      return {
        expenses: [...state.expenses].filter(
          (elem) => elem.transactionId !== action.payload
        ),
      };
    default:
      return { expenses: state.expenses };
  }
};

export default reducer;
