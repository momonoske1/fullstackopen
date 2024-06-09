import { createContext, useReducer, useContext } from "react";

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "NULL_NOTIFICATION":
      return null;
    case "ERROR_NOTIFICATION":
      return action.payload;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    NotificationReducer,
    null
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}
