import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload.message;
    },
    clearNotification(state) {
      state.message = null;
    }
  }
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, durationInSeconds) => (dispatch) => {
  dispatch(setNotification({ message }));
  const durationInMilliseconds = durationInSeconds * 1000;

  setTimeout(() => {
    dispatch(clearNotification());
  }, durationInMilliseconds);
};

export default notificationSlice.reducer;
