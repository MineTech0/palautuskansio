import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const [show, setShow] = useState(false)
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  useEffect(() => {
    if(notification !== null){
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 5000);
    }
  }, [notification])
  if(notification ===null || !show ){
    return null
  }
 
  return (
    <div style={style}>
      {notification}
    </div>
  )
}
export default Notification