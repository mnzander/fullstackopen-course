const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return { message: action.payload, type: 'success' };
    case 'SET_ERROR':
      return { message: action.payload, type: 'error' };
    case 'CLEAR':
      return { message: null, type: null };
    default:
      return state;
  }
};

export default notificationReducer;
