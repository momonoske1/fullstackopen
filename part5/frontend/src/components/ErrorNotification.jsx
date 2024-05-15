/* eslint-disable linebreak-style */
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}



export default  ErrorNotification