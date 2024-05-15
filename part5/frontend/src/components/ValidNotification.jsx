/* eslint-disable linebreak-style */
const ValidNotification = ({ message }) => {
  if(message === null) {
    return null
  }

  return <div className="valid">{message}</div>
}

export default ValidNotification