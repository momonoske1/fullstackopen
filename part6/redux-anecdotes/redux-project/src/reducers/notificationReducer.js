import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    }, 
    hideNotification() {
      return null
    }
  },
});


export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(showNotification(`new anecdote '${content}' voted`), seconds)
    setTimeout(() => {
      dispatch(hideNotification())
    }, 10000)
  }
}


export const { showNotification, hideNotification } = notificationSlice.actions

export default notificationSlice.reducer
