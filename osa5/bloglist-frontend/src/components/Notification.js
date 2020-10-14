import React from 'react'

const Notification = ({ notification, setNotification }) => {
  if (notification === null) {
    return null
  }
  if(notification.error){
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    return (
      <div className="error">
        {notification.message}
      </div>
    )
  }
  else {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    return (
      <div className="success">
        {notification.message}
      </div>
    )
  }
}
export default Notification