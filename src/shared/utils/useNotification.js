import {useCallback, useEffect, useRef, useState} from "react";

const useNotification = (time = 4000) => {
  const [notificationType, setNotificationType] = useState(null) // null / 'show-add'
  const notificationTimer = useRef(null)

  const hideNotification = useCallback(() => {
    setNotificationType(null)
  }, [])

  const showNotification = useCallback(() => {
    clearTimeout(notificationTimer.current)
    setNotificationType('show-add')
    notificationTimer.current = setTimeout(() => {
      setNotificationType(null)
    }, time)
  }, [time])

  useEffect(() => {
    return () => clearTimeout(notificationTimer.current)
  }, []);

  return {
    hideNotification,
    showNotification,
    notificationType,
  }
}

export default useNotification